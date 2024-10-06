export type JlptWordType = {
  uuid: string;
  level: string;
  word: string;
  furigana: string;
  parts: string[];
  means: string[];
};

type JlptStatesType = {
  jlpt_list: JlptWordType[];
  show_words: JlptWordType[];
};
type JlptActionsType = {
  // eslint-disable-next-line no-unused-vars
  setJlptList: (jlpt_list: JlptWordType[]) => void;
  // eslint-disable-next-line no-unused-vars
  setShowWords: (show_words: JlptWordType[]) => void;
};

export type JlptStoreType = JlptStatesType & JlptActionsType;
