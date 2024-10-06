import { JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

export const dbOperations = (db: IDBDatabase) => {
  const store_name = 'jlpt-word';

  const searchWordList = (level: string, keyword: string, page: number, part: string): Promise<JlptWordType[]> => {
    return new Promise((resolve) => {
      const transaction = db.transaction(store_name, 'readonly');
      const store = transaction.objectStore(store_name);
      const request: IDBRequest<JlptWordType[]> = store.getAll();

      request.onsuccess = () => {
        console.log(level, keyword, page, part);
        resolve(request.result);
      };
    });
  };

  return {
    searchWordList,
  };
};
