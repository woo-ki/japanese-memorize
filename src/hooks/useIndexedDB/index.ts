import { DBConfigType } from '@hooks/useIndexedDB/DBConfig.ts';
import { dbOperations } from '@hooks/useIndexedDB/utils/dbOperations.ts';
import { useEffect } from 'react';
import { openDB } from '@hooks/useIndexedDB/utils/openDB.ts';
import { useAppStore } from '@hooks/useAppStore';

const config: DBConfigType = {
  name: '',
  version: 0,
  objectStoresMeta: [],
};

const dbRef: { current: IDBDatabase | null } = {
  current: null,
};

export const useIndexedDB = () => {
  if (config.version === 0 || config.name === '' || config.objectStoresMeta.length === 0) {
    throw new Error('indexedDB를 먼저 initialize 해주세요');
  }

  const { isDataLoading, setIsDataLoading, openAlert } = useAppStore('common');

  const init = async () => {
    if (!dbRef.current) {
      dbRef.current = await openDB(config, openAlert, setIsDataLoading);
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
  config.objectStoresMeta = objectStoresMeta;
  Object.freeze(config);
  return true;
};
