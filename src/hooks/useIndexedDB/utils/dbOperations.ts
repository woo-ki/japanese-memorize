import { JlptWordLevelType, JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { Dispatch, SetStateAction } from 'react';

type dbRefType = { current: IDBDatabase | null };
type setIsStoreLoadingType = Dispatch<SetStateAction<boolean>>;
export const dbOperations = (dbRef: dbRefType, isStoreLoading: boolean, setIsStoreLoading: setIsStoreLoadingType) => {
  const store_name = 'jlpt-word';

  const getPartList = async (level: '전체' | JlptWordLevelType): Promise<string[]> => {
    const store = await waitForStore(dbRef, setIsStoreLoading, store_name, 'readonly');
    return new Promise((resolve) => {
      const partsSet: Set<string> = new Set();
      // 모든 데이터를 가져올지 특정 level만 가져올지 결정
      if (level === '전체') {
        // 모든 데이터를 가져오기 위한 커서 사용
        const cursorRequest: IDBRequest<IDBCursorWithValue | null> = store.openCursor();
        handleGetPartListCursor(cursorRequest, resolve, partsSet);
      } else {
        // 특정 level에 해당하는 데이터만 가져오기
        const index = store.index('levelIndex');
        const cursorRequest = index.openCursor(level);
        handleGetPartListCursor(cursorRequest, resolve, partsSet);
      }
    });
  };

  const searchWordList = async (
    level: '전체' | JlptWordLevelType,
    keyword: string,
    part: string,
    nowPage: number,
    pageSize: number
  ): Promise<JlptWordType[]> => {
    const store = await waitForStore(dbRef, setIsStoreLoading, store_name, 'readonly');
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
              resolve(results); // 필요한 항목을 다 수집했으면 반환
              return;
            }
          } else {
            cursor.continue(); // 조건이 일치하지 않으면 다음 항목으로 이동
          }
        } else {
          resolve(results); // 더 이상 항목이 없으면 결과 반환
        }
      };

      request.onerror = () => {
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
    isStoreLoading,
    searchWordList,
    closeDB,
    getPartList,
  };
};

async function waitForStore(
  dbRef: dbRefType,
  setIsStoreLoading: setIsStoreLoadingType,
  store_name: string,
  mode?: IDBTransactionMode
): Promise<IDBObjectStore> {
  setIsStoreLoading(true);
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
        reject('페이지를 새로고침 후 다시 시도해 주세요');
        setIsStoreLoading(false);
      }
    };
    const getStoreLoop = () => {
      if (dbRef.current) {
        try {
          const transaction = dbRef.current.transaction(store_name, mode);
          const store = transaction.objectStore(store_name);
          setIsStoreLoading(false);
          resolve(store);
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

// 결과 처리 함수
const handleGetPartListCursor = (
  cursorRequest: IDBRequest<IDBCursorWithValue | null>,
  // eslint-disable-next-line no-unused-vars
  resolve: (value: string[]) => void,
  partsSet: Set<string>
) => {
  cursorRequest.onsuccess = (event) => {
    const cursor: IDBCursorWithValue | null = (event.target as IDBRequest).result;
    if (cursor) {
      const parts: string[] = cursor.value.parts || [];
      for (let i = 0; i < parts.length; i++) {
        partsSet.add(parts[i]);
      }
      cursor.continue();
    } else {
      const partsArray: string[] = Array.from(partsSet);

      // 내림차순 정렬
      partsArray.sort((a, b) => b.localeCompare(a));

      // 맨 앞에 '전체' 추가
      partsArray.unshift('전체');
      resolve(partsArray);
    }
  };
};
