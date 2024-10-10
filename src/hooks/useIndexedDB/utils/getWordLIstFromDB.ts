import { JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

export const getWordLIstFromDB = (db: IDBDatabase, store_name: string): Promise<JlptWordType[]> => {
  return new Promise((resolve) => {
    const transaction = db.transaction(store_name, 'readonly');
    const store = transaction.objectStore(store_name);
    const index = store.index('searchIndex');

    const getAllRequest: IDBRequest<JlptWordType[]> = index.getAll();

    getAllRequest.onsuccess = () => {
      resolve(getAllRequest.result);
    };
    getAllRequest.onerror = () => {
      resolve([]);
    };
  });
};
