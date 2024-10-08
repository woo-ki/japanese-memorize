import { JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { WordSearchParamsType } from '@hooks/useIndexedDB/types.ts';

type dbRefType = { current: IDBDatabase | null };
// eslint-disable-next-line no-unused-vars
type setIsDataLoadingType = (isDataLoading: boolean) => void;
export const dbOperations = (dbRef: dbRefType, isDataLoading: boolean, setIsDataLoading: setIsDataLoadingType) => {
  const store_name = 'jlpt-word';

  const searchWordList = async ({
    level,
    keyword,
    part,
    nowPage,
    pageSize,
  }: WordSearchParamsType): Promise<JlptWordType[]> => {
    const { store, timeout } = await waitForStore(dbRef, setIsDataLoading, store_name, 'readonly');
    return new Promise((resolve, reject) => {
      const index = store.index('searchIndex'); // 인덱스에 접근
      const request: IDBRequest<IDBCursorWithValue | null> = index.openCursor(); // 인덱스 값으로 조회

      const results: JlptWordType[] = [];
      let skipCount = (nowPage - 1) * pageSize; // 스킵할 항목 수
      let collectedCount = 0; // 수집된 항목 수

      request.onsuccess = (event) => {
        const cursor: IDBCursorWithValue | null = (event.target as IDBRequest).result;

        if (cursor) {
          const word: JlptWordType = cursor.value;

          if (isSearchMatch(word, level, part, keyword)) {
            if (skipCount > 0) {
              skipCount--;
              cursor.continue();
            } else if (collectedCount < pageSize) {
              results.push(word);
              collectedCount++;
              cursor.continue();
            } else {
              clearTimeout(timeout);
              setIsDataLoading(false);
              resolve(results); // 필요한 항목을 다 수집했으면 반환
            }
          } else {
            cursor.continue(); // 조건이 일치하지 않으면 다음 항목으로 이동
          }
        } else {
          clearTimeout(timeout);
          setIsDataLoading(false);
          resolve(results); // 더 이상 항목이 없으면 결과 반환
        }
      };

      request.onerror = () => {
        clearTimeout(timeout);
        setIsDataLoading(false);
        reject(request.error);
      };
    });
  };

  const closeDB = () => {
    if (dbRef.current) {
      dbRef.current.close();
      dbRef.current = null;
    }
  };

  return {
    isDataLoading,
    searchWordList,
    closeDB,
  };
};

async function waitForStore(
  dbRef: dbRefType,
  setIsDataLoading: setIsDataLoadingType,
  store_name: string,
  mode?: IDBTransactionMode
): Promise<{ store: IDBObjectStore; timeout: NodeJS.Timeout }> {
  // 200ms 이상 데이터가 로딩 중이면 로딩 화면을 보여줌
  const timeout = setTimeout(() => {
    setIsDataLoading(true);
  }, 200);
  const maxTrySecond = 5;
  const retryTerm = 100;
  const maxTryCount = (maxTrySecond * 1000) / retryTerm;
  let tryCount = 0;
  return new Promise((resolve, reject) => {
    const retry = () => {
      if (tryCount < maxTryCount) {
        tryCount = tryCount + 1;
        setTimeout(() => getStoreLoop(), retryTerm);
      } else {
        setIsDataLoading(false);
        clearTimeout(timeout);
        reject('페이지를 새로고침 후 다시 시도해 주세요');
      }
    };
    const getStoreLoop = () => {
      if (dbRef.current) {
        try {
          const transaction = dbRef.current.transaction(store_name, mode);
          const store = transaction.objectStore(store_name);
          resolve({ store, timeout });
        } catch {
          retry();
        }
      } else {
        retry();
      }
    };
    getStoreLoop();
  });
}

function isSearchMatch(word: JlptWordType, level: string, part: string, keyword: string) {
  const isLevelMatch = level === '전체' || word.level === level;
  const isPartMatch = part === '전체' || word.parts.includes(part);
  const isKeywordMatch = keyword === '' || word.word.includes(keyword) || word.furigana.includes(keyword);
  return isLevelMatch && isPartMatch && isKeywordMatch;
}
