import { DBConfigType } from '@hooks/useIndexedDB/DBConfig.ts';
import { createObjectStore } from '@hooks/useIndexedDB/utils/createObjectStore.ts';
import { dbOperations } from '@hooks/useIndexedDB/utils/dbOperations.ts';

interface useIndexedDbConfig {
  name: string | null;
  version: number | null;
  db: IDBDatabase | null;
}
const config: useIndexedDbConfig = {
  name: null,
  version: null,
  db: null,
};
export const useIndexedDB = () => {
  if (config.version === null || config.name === null || config.db === null) {
    throw new Error('indexedDB를 먼저 initialize 해주세요');
  }

  return dbOperations(config.db!);
};

export const initDB = async ({ name, version, objectStoresMeta }: DBConfigType): Promise<boolean> => {
  config.version = version;
  config.name = name;
  config.db = await createObjectStore(name, version, objectStoresMeta);
  return config.db !== null;
};
