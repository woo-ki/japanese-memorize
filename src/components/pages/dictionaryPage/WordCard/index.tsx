import { JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { FC } from 'react';

type WordCardPropsType = {
  word: JlptWordType;
};
const WordCard: FC<WordCardPropsType> = ({ word }) => {
  return (
    <div>
      <div>{word.uuid}</div>
      <div>{word.word}</div>
      <div>{word.furigana}</div>
      <div>{word.means[0]}</div>
    </div>
  );
};

export default WordCard;
