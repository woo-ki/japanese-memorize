import { JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { FC } from 'react';
import { wordCardStyle } from '@components/pages/dictionaryPage/WordCard/style.ts';

type WordCardPropsType = {
  wordData: JlptWordType;
};
const WordCard: FC<WordCardPropsType> = ({ wordData }) => {
  const { word, furigana, means, level } = wordData;

  return (
    <div css={wordCardStyle}>
      <div className="word-card-header">
        <h2 className="word-text-wrapper">
          {word} <span className="furigana-text">{furigana}</span>
        </h2>
        <span className="level-info">{level}</span>
      </div>
      <div className="word-card-means-wrapper">
        {means.map((meaning, index) => (
          <p key={index}>
            {index + 1}. {meaning}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WordCard;
