export const openDB = (name: string, version: number): Promise<IDBDatabase | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(name, version);

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      resolve(null);
    };
  });
};
