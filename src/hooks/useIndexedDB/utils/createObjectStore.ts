import { ObjectStoresMetaType } from '@hooks/useIndexedDB/DBConfig.ts';
import {
  fetchJlptWord,
  FetchJlptWordResponseType,
  JlptWordTypeForFetch,
} from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

export const createObjectStore = (
  dbName: string,
  version: number,
  objectStoresMeta: ObjectStoresMetaType[]
): Promise<IDBDatabase | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName, version);
    request.onsuccess = async (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const last_modified = await getLastModified(db);
      if (last_modified === null) {
        resolve(null);
        return;
      }
      const jlptData = await fetchJlptWord();
      if (last_modified.getTime() < jlptData.last_modified.getTime()) {
        if (await updateJlptData(db, jlptData)) {
          resolve(db);
        } else {
          resolve(null);
          db.close();
        }
      } else {
        resolve(db);
      }
    };
    request.onerror = () => {
      resolve(null);
    };
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      objectStoresMeta.forEach((storeSchema) => {
        if (!db.objectStoreNames.contains(storeSchema.store)) {
          const objectStore = db.createObjectStore(storeSchema.store, storeSchema.storeConfig);
          storeSchema.storeSchema.forEach((schema) => {
            objectStore.createIndex(schema.name, schema.keyPath, schema.options);
          });
        } else {
          const store = (event.target as IDBOpenDBRequest).transaction!.objectStore(storeSchema.store);
          const tempData: unknown[] = [];

          store.openCursor().onsuccess = async (event) => {
            const cursor: IDBCursorWithValue | null = (event.target as IDBRequest).result;
            if (cursor) {
              tempData.push(cursor.value); // 기존 데이터를 배열에 저장
              cursor.continue();
            } else {
              // Object Store 삭제
              db.deleteObjectStore(storeSchema.store);

              const newStore = db.createObjectStore(storeSchema.store, storeSchema.storeConfig);

              storeSchema.storeSchema.forEach((schema) => {
                newStore.createIndex(schema.name, schema.keyPath, schema.options);
              });

              // 기존 데이터를 새 Object Store에 복구
              try {
                await Promise.all(
                  tempData.map((item) => {
                    return new Promise((resolve, reject) => {
                      const addRequest = newStore.add(item);
                      addRequest.onsuccess = () => resolve(true);
                      addRequest.onerror = () => reject(addRequest.error);
                    });
                  })
                );
              } catch (error) {
                console.error('데이터 복구 중 오류 발생:', error);
              }
            }
          };
        }
      });
    };
  });
};

async function updateJlptData(db: IDBDatabase, jlptData: FetchJlptWordResponseType): Promise<boolean> {
  return new Promise((resolve) => {
    const { last_modified, word_list } = jlptData;
    const transaction = db.transaction(['last-modified', 'jlpt-word'], 'readwrite');
    const lastModifiedStore = transaction.objectStore('last-modified');
    const jlptWordStore = transaction.objectStore('jlpt-word');

    // 트랜잭션 오류 발생 시
    transaction.onerror = () => {
      resolve(false); // 트랜잭션이 실패하면 false 반환
    };

    // 트랜잭션이 성공적으로 완료되면 호출
    transaction.oncomplete = () => {
      resolve(true); // 트랜잭션 완료 시 true 반환
    };

    updateLastModified(lastModifiedStore, last_modified).then(async (isModified) => {
      if (!isModified) {
        resolve(false);
        return;
      }

      for (let i = 0; i < word_list.length; i++) {
        const isUpdated = await updateJlptWordData(jlptWordStore, word_list[i]);
        if (!isUpdated) {
          resolve(false); // jlpt-word 데이터 업데이트 실패 시
          return;
        }
      }
    });
  });
}

async function getLastModified(db: IDBDatabase): Promise<Date | null> {
  return new Promise((resolve) => {
    const transaction = db.transaction('last-modified', 'readwrite');
    const store = transaction.objectStore('last-modified');
    const store_name = 'jlpt-word';

    const request: IDBRequest<{ store_name: string; last_modified: Date } | undefined> = store.get(store_name);
    request.onsuccess = async () => {
      const result = request.result;

      if (result) {
        resolve(new Date(result.last_modified));
      } else {
        const last_modified = new Date('2024-10-06');
        if (await updateLastModified(store, last_modified)) {
          resolve(last_modified); // 추가한 데이터로 resolve
        } else {
          resolve(null);
        }
      }
    };

    request.onerror = () => {
      resolve(null);
    };
  });
}

async function updateLastModified(store: IDBObjectStore, last_modified: Date): Promise<boolean> {
  return new Promise((resolve) => {
    const store_name = 'jlpt-word';
    const newData = { store_name, last_modified }; // store_name과 last_modified를 담은 새 데이터

    const putRequest = store.put(newData); // Object Store에 데이터 저장 (덮어쓰기)

    putRequest.onsuccess = () => {
      resolve(true); // 업데이트 성공
    };

    putRequest.onerror = () => {
      resolve(false); // 업데이트 실패
    };
  });
}

async function updateJlptWordData(store: IDBObjectStore, jlptWord: JlptWordTypeForFetch): Promise<boolean> {
  return new Promise((resolve) => {
    const request: IDBRequest<JlptWordTypeForFetch | undefined> = store.get(jlptWord.uuid);

    request.onsuccess = () => {
      const existingData = request.result;

      let updatedData: JlptWordTypeForFetch;

      if (existingData) {
        updatedData = { ...existingData, ...jlptWord };
      } else {
        updatedData = { ...jlptWord, study_date: null, memorize_count: 0, failed_memorize_count: 0 };
      }

      const putRequest = store.put(updatedData);

      putRequest.onsuccess = () => {
        resolve(true);
      };

      putRequest.onerror = () => {
        resolve(false);
      };
    };

    request.onerror = () => {
      resolve(false);
    };
  });
}
