import { JlptWordLevelType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

export type WordSearchParamsType = {
  level: JlptWordLevelType | '전체';
  keyword: string;
  part: string;
  nowPage: number;
  pageSize: number;
};
