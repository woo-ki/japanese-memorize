import { DBConfigType } from '@hooks/useIndexedDB/DBConfig.ts';
import { createObjectStore } from '@hooks/useIndexedDB/utils/createObjectStore.ts';
import { dbOperations } from '@hooks/useIndexedDB/utils/dbOperations.ts';
import { useEffect, useState } from 'react';
import { openDB } from '@hooks/useIndexedDB/utils/openDB.ts';

interface useIndexedDbConfig {
  name: string | null;
  version: number | null;
}
const config: useIndexedDbConfig = {
  name: null,
  version: null,
};

const dbRef: { current: IDBDatabase | null } = {
  current: null,
};

export const useIndexedDB = () => {
  if (config.version === null || config.name === null) {
    throw new Error('indexedDB를 먼저 initialize 해주세요');
  }

  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const init = async () => {
    if (!dbRef.current) {
      dbRef.current = await openDB(config.name!, config.version!);
    }
  };

  useEffect(() => {
    init().then();
  }, []);

  return dbOperations(dbRef, isDataLoading, setIsDataLoading);
};

export const initDB = async ({ name, version, objectStoresMeta }: DBConfigType): Promise<boolean> => {
  if (Object.isFrozen(config)) return true;
  config.version = version;
  config.name = name;
  Object.freeze(config);
  dbRef.current = await createObjectStore(name, version, objectStoresMeta);
  return dbRef.current !== null;
};
