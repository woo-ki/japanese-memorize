import { DBConfigType, ObjectStoresMetaType } from '@hooks/useIndexedDB/DBConfig.ts';
import { setIsDataLoadingType } from '@hooks/useAppStore/slices/common';
import { needFetchJlptWord, updateJlptData } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

export const updateDB = (
  config: DBConfigType,
  setIsDataLoading: setIsDataLoadingType,
  isConfirm: boolean
): Promise<IDBDatabase | null> => {
  if (isConfirm) {
    setIsDataLoading(true);
  }
  return new Promise((resolve) => {
    const request = indexedDB.open(config.name, config.version);

    request.onsuccess = async (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      try {
        const needFetchCheck = await needFetchJlptWord(db);
        if (needFetchCheck.needFetch) {
          await updateJlptData(db, needFetchCheck.jlptData);
        }
        resolve(db);
        setIsDataLoading(false);
      } catch {
        resolve(db);
        setIsDataLoading(false);
      }
    };
    request.onerror = () => {
      setIsDataLoading(false);
      resolve(null);
    };
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = (event.target as IDBOpenDBRequest).transaction as IDBTransaction;
      updateSchema(db, transaction, config.objectStoresMeta);
    };
  });
};

const updateSchema = (db: IDBDatabase, transaction: IDBTransaction, objectStoresMeta: ObjectStoresMetaType[]) => {
  // Step 1: 기존에 없는 객체 저장소 제거
  for (const storeName of db.objectStoreNames) {
    const isStoreDeleted = !objectStoresMeta.some((meta) => meta.store === storeName);
    if (isStoreDeleted) {
      db.deleteObjectStore(storeName);
    }
  }

  // Step 2: 기존에 있는 객체 저장소의 인덱스 갱신
  for (const storeMeta of objectStoresMeta) {
    if (db.objectStoreNames.contains(storeMeta.store)) {
      const objectStore = transaction.objectStore(storeMeta.store);

      // 기존 인덱스 삭제
      for (const indexName of objectStore.indexNames) {
        if (!storeMeta.storeSchema.some((schema) => schema.name === indexName)) {
          objectStore.deleteIndex(indexName);
        }
      }
      // 새로운 인덱스 추가
      for (const schema of storeMeta.storeSchema) {
        if (!objectStore.indexNames.contains(schema.name)) {
          objectStore.createIndex(schema.name, schema.keyPath, schema.options);
        }
      }
    }
  }

  // Step 3: 새롭게 추가된 객체 저장소 생성
  for (const storeMeta of objectStoresMeta) {
    if (!db.objectStoreNames.contains(storeMeta.store)) {
      const objectStore = db.createObjectStore(storeMeta.store, storeMeta.storeConfig);

      // 새로 추가된 객체 저장소에 인덱스 생성
      for (const schema of storeMeta.storeSchema) {
        objectStore.createIndex(schema.name, schema.keyPath, schema.options);
      }
    }
  }
};
