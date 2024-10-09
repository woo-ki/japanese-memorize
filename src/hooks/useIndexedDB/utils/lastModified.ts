export const getLastModified = (db: IDBDatabase): Promise<Date> => {
  return new Promise((resolve, reject) => {
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
        if (await updateLastModified(store, last_modified, store_name)) {
          resolve(last_modified); // 추가한 데이터로 resolve
        } else {
          reject(null);
        }
      }
    };
    request.onerror = () => {
      reject(null);
    };
  });
};

export const updateLastModified = async (
  store: IDBObjectStore,
  last_modified: Date,
  store_name: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    const newData = { store_name, last_modified }; // store_name과 last_modified를 담은 새 데이터
    const putRequest = store.put(newData); // Object Store에 데이터 저장 (덮어쓰기)

    putRequest.onsuccess = () => {
      resolve(true); // 업데이트 성공
    };

    putRequest.onerror = () => {
      resolve(false); // 업데이트 실패
    };
  });
};
