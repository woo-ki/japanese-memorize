import type { SliceCreator } from '@hooks/useAppStore/utils/getCreate.ts';
import { StoreType } from './types.ts';
import { JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

export const slice: SliceCreator<StoreType> = (set, get) => ({
  jlptList: [],
  setJlptList: (jlptList) => set({ jlptList }),
  getFilteredList: (level, keyword, part) => {
    return get().jlptList.filter((jlptWord) => checkSearchMatch(jlptWord, level, part, keyword));
  },
  getTotalPage: (totalCount, pageSize) => {
    return Math.ceil(totalCount / pageSize);
  },
  getShowList: (jlptList: JlptWordType[], nowPage: number, pageSize: number) => {
    const startIndex = (nowPage - 1) * pageSize; // 시작 인덱스 계산
    const endIndex = startIndex + pageSize; // 끝 인덱스 계산

    // 해당 페이지의 데이터를 추려서 반환
    return jlptList.slice(startIndex, endIndex);
  },
});

function checkKeywordMatch(jlptWord: JlptWordType, keyword: string) {
  return (
    keyword === '' ||
    jlptWord.word.includes(keyword) ||
    jlptWord.furigana.includes(keyword) ||
    jlptWord.means.some((mean) => mean.includes(keyword))
  );
}

function checkSearchMatch(jlptWord: JlptWordType, level: string, part: string, keyword: string) {
  const isLevelMatch = level === '전체' || jlptWord.level === level;
  const isPartMatch = part === '전체' || jlptWord.parts.includes(part);
  const isKeywordMatch = checkKeywordMatch(jlptWord, keyword);
  return isLevelMatch && isPartMatch && isKeywordMatch;
}
