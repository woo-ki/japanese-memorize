import EmptyDataIcon from '@assets/pages/dictionaryPage/empty_data.svg';
import { emptyDataStyle } from '@components/pages/dictionaryPage/EmptyData/style.ts';
import { Dispatch, FC, SetStateAction } from 'react';
import { WordSearchParamsType } from '@hooks/useIndexedDB/types.ts';

type EmptyDataPropsType = {
  setWordSearchParams: Dispatch<SetStateAction<WordSearchParamsType>>;
};
const EmptyData: FC<EmptyDataPropsType> = ({ setWordSearchParams }) => {
  return (
    <div css={emptyDataStyle}>
      <EmptyDataIcon />
      <p>일치하는 결과가 없어요</p>
      <button
        onClick={() =>
          setWordSearchParams((prev) => ({ ...prev, keyword: '', level: '전체', part: '전체', nowPage: 1 }))
        }
      >
        필터 초기화
      </button>
    </div>
  );
};

export default EmptyData;
