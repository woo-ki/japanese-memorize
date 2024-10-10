import { JlptWordLevelType, JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

type StatesType = {
  jlptList: JlptWordType[];
};

type ActionsType = {
  // eslint-disable-next-line no-unused-vars
  setJlptList: (jlptList: JlptWordType[]) => void;
  // eslint-disable-next-line no-unused-vars
  getFilteredList: (level: JlptWordLevelType | '전체', keyword: string, part: string) => JlptWordType[];
  // eslint-disable-next-line no-unused-vars
  getTotalPage: (totalCount: number, pageSize: number) => number;
  // eslint-disable-next-line no-unused-vars
  getShowList: (jlptList: JlptWordType[], nowPage: number, pageSize: number) => JlptWordType[];
};

export type StoreType = StatesType & ActionsType;
