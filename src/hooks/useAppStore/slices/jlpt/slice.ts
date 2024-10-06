import type { SliceCreator } from '@hooks/useAppStore/utils/getCreate.ts';
import type { JlptStoreType } from './types.ts';

export const slice: SliceCreator<JlptStoreType> = (set) => ({
  jlpt_list: [],
  show_words: [],
  setJlptList: (jlpt_list) => {
    set({ jlpt_list });
  },
  setShowWords: (show_words) => {
    set({ show_words });
  },
});
