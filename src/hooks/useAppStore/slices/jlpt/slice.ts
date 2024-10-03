import type { SliceCreator } from '@hooks/useAppStore/utils/getCreate.ts';
import type { JlptStoreType, JlptWordType } from './types.ts';

export const slice: SliceCreator<JlptStoreType> = (set, get) => ({
  jlpt: {
    N1: { parts: [], words: [] },
    N2: { parts: [], words: [] },
    N3: { parts: [], words: [] },
    N4: { parts: [], words: [] },
    N5: { parts: [], words: [] },
  },
  show_words: [],
  setJlpt: (jlpt) => {
    set({ jlpt });
  },
  setShowWords: (key, part) => {
    const origin = structuredClone(get().jlpt);
    let show_words: JlptWordType[];
    if (part === '전체') {
      show_words = origin[key].words;
    } else {
      show_words = origin[key].words.filter((word) => word.parts.includes(part));
    }
    set({ show_words });
  },
});
