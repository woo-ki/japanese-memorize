import { radioButtonGroupStyle } from '@components/pages/dictionaryPage/RadioButtonGroup/style.ts';
import { Dispatch, SetStateAction } from 'react';
import { WordSearchParamsType } from '@hooks/useIndexedDB/types.ts';
import { JlptWordLevelType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

type RadioButtonGroupPropsType<T> = {
  name: '레벨 필터' | '품사 필터';
  list: T[];
  value: T;
  setWordSearchParams: Dispatch<SetStateAction<WordSearchParamsType>>;
};
const RadioButtonGroup = <T extends string | JlptWordLevelType | '전체'>({
  name,
  list,
  value,
  setWordSearchParams,
}: RadioButtonGroupPropsType<T>) => {
  const handleClick = (data: T) => {
    setWordSearchParams((prev) => {
      if (name === '레벨 필터') {
        return { ...prev, level: data as JlptWordLevelType | '전체', nowPage: 1 };
      } else if (name === '품사 필터') {
        return { ...prev, part: data as string, nowPage: 1 };
      }
      return prev;
    });
  };

  return (
    <div className="radio-button-container" css={radioButtonGroupStyle}>
      <h5>{name}</h5>
      <div className="radio-button-area">
        {list.map((data: T) => (
          <div className="radio-button-wrapper" key={data} onClick={() => handleClick(data)}>
            <div className={`${data === value ? 'active' : ''} radio-button-checkbox`} />
            <span className="radio-button-text">{data}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
