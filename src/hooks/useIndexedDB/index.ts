import { DBConfigType } from '@hooks/useIndexedDB/DBConfig.ts';
import { useEffect } from 'react';
import { openDB } from '@hooks/useIndexedDB/utils/openDB.ts';
import { useAppStore } from '@hooks/useAppStore';
import { getWordLIstFromDB } from '@hooks/useIndexedDB/utils/getWordLIstFromDB.ts';

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

  const { isDataLoading, setIsDataLoading, openAlert, needOptimize, setNeedOptimize } = useAppStore('common');
  const { setJlptList } = useAppStore('jlpt');

  const init = async () => {
    if (!dbRef.current) {
      dbRef.current = await openDB(config, openAlert, setIsDataLoading);

      if (dbRef.current) {
        setNeedOptimize(false);
        const jlptList = await getWordLIstFromDB(dbRef.current, 'jlpt-word');
        if (jlptList.length > 0) {
          setJlptList(jlptList);
        } else {
          openAlert({
            type: 'caution',
            title: '알림',
            message: '데이터를 불러오는데 실패했어요\n잠시 후 다시시도 해 주세요',
            confirmButton: '확인',
          }).then();
        }
      } else {
        setNeedOptimize(true);
      }
    }
  };

  useEffect(() => {
    init().then();
  }, []);

  const closeDB = () => {
    if (dbRef.current) {
      dbRef.current.close();
      dbRef.current = null;
    }
  };

  return {
    isDataLoading,
    init,
    closeDB,
    db: dbRef.current,
    needOptimize,
  };
};

export const initDB = async ({ name, version, objectStoresMeta }: DBConfigType): Promise<boolean> => {
  if (Object.isFrozen(config)) return true;
  config.version = version;
  config.name = name;
  config.objectStoresMeta = objectStoresMeta;
  Object.freeze(config);
  return true;
};
