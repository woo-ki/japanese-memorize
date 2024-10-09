import { getLastModified, updateLastModified } from '@hooks/useIndexedDB/utils/lastModified.ts';

export type JlptWordLevelType = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
export type JlptWordTypeForFetch = {
  uuid: string;
  level: JlptWordLevelType;
  word: string;
  furigana: string;
  parts: string[];
  means: string[];
  study_date?: Date | null;
  memorize_count?: number;
  failed_memorize_count?: number;
};

export type JlptWordType = Required<JlptWordTypeForFetch>;

export type FetchJlptWordResponseType = {
  last_modified: Date;
  word_list: JlptWordTypeForFetch[];
};

export const fetchJlptWord = async (): Promise<FetchJlptWordResponseType> => {
  const url = `${import.meta.env.PROD ? 'https://woo-ki.s3.ap-northeast-2.amazonaws.com' : '/s3'}/japanese-memorize/data/jlpt_word.json`;
  const response = await fetch(url);

  return {
    last_modified: new Date(response.headers.get('Last-Modified') || '2024-10-06'),
    word_list: await response.json(),
  };
};

// eslint-disable-next-line no-unused-vars
type NeedFetchJlptWordType = (db: IDBDatabase) => Promise<{
  needFetch: boolean;
  jlptData: FetchJlptWordResponseType;
}>;
export const needFetchJlptWord: NeedFetchJlptWordType = async (db) => {
  const last_modified = await getLastModified(db);
  const jlptData = await fetchJlptWord();
  return {
    needFetch: last_modified.getTime() < jlptData.last_modified.getTime(),
    jlptData,
  };
};

export const updateJlptData = async (db: IDBDatabase, jlptData: FetchJlptWordResponseType): Promise<null> => {
  return new Promise((resolve, reject) => {
    const { last_modified, word_list } = jlptData;
    const transaction = db.transaction(['last-modified', 'jlpt-word'], 'readwrite');
    const lastModifiedStore = transaction.objectStore('last-modified');
    const jlptWordStore = transaction.objectStore('jlpt-word');
    const store_name = 'jlpt-word';

    // 트랜잭션 오류 발생 시
    transaction.onerror = () => {
      reject(null); // 트랜잭션이 실패하면 false 반환
    };

    // 트랜잭션이 성공적으로 완료되면 호출
    transaction.oncomplete = () => {
      resolve(null); // 트랜잭션 완료 시 true 반환
    };
    updateLastModified(lastModifiedStore, last_modified, store_name).then(async (isModified) => {
      if (isModified) {
        for (let i = 0; i < word_list.length; i++) {
          const word_data = word_list[i];
          try {
            await updateJlptWordData(jlptWordStore, word_data);
          } catch {
            reject(null);
            return;
          }
        }
      } else {
        reject(null);
      }
    });
  });
};

const updateJlptWordData = async (store: IDBObjectStore, jlptWord: JlptWordTypeForFetch): Promise<null> => {
  return new Promise((resolve, reject) => {
    const request: IDBRequest<JlptWordTypeForFetch | undefined> = store.get(jlptWord.uuid);

    request.onsuccess = () => {
      const existingData = request.result;

      let updatedData: JlptWordTypeForFetch;

      if (existingData) {
        updatedData = { ...existingData, ...jlptWord };
      } else {
        updatedData = { ...jlptWord, study_date: null, memorize_count: 0, failed_memorize_count: 0 };
      }

      const putRequest = store.put(updatedData);

      putRequest.onsuccess = () => {
        resolve(null);
      };

      putRequest.onerror = () => {
        reject(null);
      };
    };

    request.onerror = () => {
      reject(null);
    };
  });
};
