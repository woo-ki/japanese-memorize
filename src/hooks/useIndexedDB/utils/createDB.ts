import { DBConfigType, ObjectStoresMetaType } from '@hooks/useIndexedDB/DBConfig.ts';
import { needFetchJlptWord, updateJlptData } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { setIsDataLoadingType } from '@hooks/useAppStore/slices/common';

export const createDB = (config: DBConfigType, setIsDataLoading: setIsDataLoadingType): Promise<IDBDatabase | null> => {
  setIsDataLoading(true);
  return new Promise((resolve) => {
    const request = indexedDB.open(config.name, config.version);
    let upgradeFailed: boolean = false;

    request.onsuccess = async (event) => {
      if (upgradeFailed) {
        resolve(null);
      } else {
        const db = (event.target as IDBOpenDBRequest).result;
        try {
          const needFetchCheck = await needFetchJlptWord(db);
          if (needFetchCheck.needFetch) {
            await updateJlptData(db, needFetchCheck.jlptData);
          }
          resolve(db);
          setIsDataLoading(false);
        } catch {
          deleteDB(db, config.name, setIsDataLoading);
          resolve(null);
        }
      }
    };
    request.onerror = () => {
      setIsDataLoading(false);
      resolve(null);
    };
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      try {
        createObjectStore(db, config.objectStoresMeta);
      } catch {
        upgradeFailed = true;
        deleteDB(db, config.name, setIsDataLoading);
      }
    };
  });
};

const deleteDB = (db: IDBDatabase, name: string, setIsDataLoading: setIsDataLoadingType): void => {
  db.close();
  indexedDB.deleteDatabase(name);
  setIsDataLoading(false);
};

const createObjectStore = (db: IDBDatabase, objectStoresMeta: ObjectStoresMetaType[]) => {
  for (let i = 0; i < objectStoresMeta.length; i++) {
    const storeMeta = objectStoresMeta[i];
    const objectStore = db.createObjectStore(storeMeta.store, storeMeta.storeConfig);
    for (let j = 0; j < storeMeta.storeSchema.length; j++) {
      const schema = storeMeta.storeSchema[j];
      objectStore.createIndex(schema.name, schema.keyPath, schema.options);
    }
  }
};
