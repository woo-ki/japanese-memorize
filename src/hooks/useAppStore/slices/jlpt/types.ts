export type JlptWordType = {
  level: string;
  entry_id: string;
  word: string;
  furigana: string;
  parts: string[];
  means: string[];
};

type JlptItemType = {
  parts: string[];
  words: JlptWordType[];
};

export type JlptType = {
  N1: JlptItemType;
  N2: JlptItemType;
  N3: JlptItemType;
  N4: JlptItemType;
  N5: JlptItemType;
};

type JlptStatesType = {
  jlpt: JlptType;
  show_words: JlptWordType[];
};
type JlptActionsType = {
  // eslint-disable-next-line no-unused-vars
  setJlpt: (jlpt: JlptType) => void;
  // eslint-disable-next-line no-unused-vars
  setShowWords: (key: keyof JlptType, part: string) => void;
};

export type JlptStoreType = JlptStatesType & JlptActionsType;
