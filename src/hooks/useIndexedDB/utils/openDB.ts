import { DBConfigType } from '@hooks/useIndexedDB/DBConfig.ts';
import { AlertPropsType, OpenAlertType, setIsDataLoadingType } from '@hooks/useAppStore/slices/common';
import { createDB } from '@hooks/useIndexedDB/utils/createDB.ts';
import { updateDB } from '@hooks/useIndexedDB/utils/updateDB.ts';
import { needFetchJlptWord } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

const needOptimizeProps: AlertPropsType = {
  type: 'caution',
  title: '데이터 최적화가 필요해요',
  message: '데이터 최적화가 필요해요\n최적화는 5 ~ 10초정도 소요되요',
  confirmButton: '최적화하기',
  cancelButton: '취소',
};
const failOptimizeProps: AlertPropsType = {
  type: 'caution',
  title: '알림',
  message: '데이터 최적화에 실패했어요\n잠시 후 페이지를 새로고침 해주세요',
  confirmButton: '확인',
};
const successOptimizeProps: AlertPropsType = {
  type: 'info',
  title: '알림',
  message: '데이터 최적화가 끝났어요\n지금부터 서비스를 이용할 수 있어요',
  confirmButton: '확인',
};
const cancelOptimizeProps: AlertPropsType = {
  type: 'caution',
  title: '알림',
  message: '최적화를 진행하지 않아 서비스 이용이 제한됩니다\n최적화는 언제든지 진행할 수 있어요',
  confirmButton: '확인',
};
const noticeDBErrorProps: AlertPropsType = {
  type: 'caution',
  title: '알림',
  message: '데이터를 불러오는데 실패했어요\n잠시 후 페이지를 새로고침 해주세요',
  confirmButton: '확인',
};

export const openDB = async (
  { name, version, objectStoresMeta }: DBConfigType,
  openAlert: OpenAlertType,
  setIsDataLoading: setIsDataLoadingType
): Promise<IDBDatabase | null> => {
  const dbExist = await checkDBExist(name);
  if (dbExist) {
    try {
      const isLowVersion = await versionCheck(name, version);
      let isConfirm = false;
      if (isLowVersion) {
        isConfirm = await openAlert(needOptimizeProps);
        if (!isConfirm) {
          await openAlert(cancelOptimizeProps);
          return new Promise((resolve) => resolve(null));
        }
      } else {
        const isNeedFetch = await needFetchCheck(name, version);
        if (isNeedFetch) {
          isConfirm = await openAlert(needOptimizeProps);
          if (!isConfirm) {
            await openAlert(cancelOptimizeProps);
            return new Promise((resolve) => resolve(null));
          }
        }
      }
      const db = await updateDB({ name, version, objectStoresMeta }, setIsDataLoading, isConfirm);
      return new Promise((resolve) => {
        if (isConfirm) {
          if (db) {
            openAlert(successOptimizeProps).then(() => resolve(db));
          } else {
            openAlert(failOptimizeProps).then(() => resolve(null));
          }
        } else {
          resolve(db);
        }
      });
    } catch {
      // 버전 체크중 에러 발생.
      return new Promise((resolve) => {
        openAlert(noticeDBErrorProps).then(() => resolve(null));
      });
    }
  } else {
    const isConfirm = await openAlert(needOptimizeProps);
    if (isConfirm) {
      const db = await createDB({ name, version, objectStoresMeta }, setIsDataLoading);
      return new Promise((resolve) => {
        if (db) {
          openAlert(successOptimizeProps).then(() => resolve(db));
        } else {
          openAlert(failOptimizeProps).then(() => resolve(null));
        }
      });
    } else {
      await openAlert(cancelOptimizeProps);
      return new Promise((resolve) => resolve(null));
    }
  }
};

const checkDBExist = async (name: string): Promise<boolean> => {
  const databases = await indexedDB.databases();
  return databases.some((db) => db.name === name);
};

const versionCheck = async (name: string, version: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name);
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const currentVersion = db.version;
      db.close();
      resolve(currentVersion < version);
    };

    request.onerror = () => {
      reject(null);
    };
  });
};

const needFetchCheck = async (name: string, version: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.onsuccess = async (event) => {
      const db = (event.target as IDBRequest).result;
      const result = await needFetchJlptWord(db);
      resolve(result.needFetch);
      db.close();
    };

    request.onerror = () => {
      reject(null);
    };
  });
};
