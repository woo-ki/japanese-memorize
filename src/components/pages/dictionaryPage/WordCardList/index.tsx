import EmptyData from '@components/pages/dictionaryPage/EmptyData';
import WordCard from '@components/pages/dictionaryPage/WordCard';
import { Dispatch, FC, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { WordSearchParamsType } from '@hooks/useIndexedDB/types.ts';
import { JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { useAppStore } from '@hooks/useAppStore';
import Pagination from '@components/pages/dictionaryPage/Pagination';
import { wordCardListStyle } from '@components/pages/dictionaryPage/WordCardList/style.ts';

type WordCardListPropsType = {
  containerRef: RefObject<HTMLDivElement>;
  wordSearchParams: WordSearchParamsType;
  setWordSearchParams: Dispatch<SetStateAction<WordSearchParamsType>>;
};
const WordCardList: FC<WordCardListPropsType> = ({ containerRef, wordSearchParams, setWordSearchParams }) => {
  const moveDirectionRef = useRef<'top' | 'bottom'>('top');
  const { jlptList, getFilteredList, getShowList, getTotalPage } = useAppStore('jlpt');
  const [filteredWordList, setFilteredWordList] = useState<JlptWordType[]>([]);
  const [showWordList, setShowWordList] = useState<JlptWordType[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFilteredWordList(getFilteredList(wordSearchParams.level, wordSearchParams.keyword, wordSearchParams.part));
  }, [jlptList, wordSearchParams.level, wordSearchParams.keyword, wordSearchParams.part]);

  useEffect(() => {
    moveDirectionRef.current = 'top';
    setTotalPage(getTotalPage(filteredWordList.length, wordSearchParams.pageSize));
    setShowWordList(getShowList(filteredWordList, wordSearchParams.nowPage, wordSearchParams.pageSize));
  }, [filteredWordList]);

  useEffect(() => {
    moveDirectionRef.current = 'bottom';
    setShowWordList(getShowList(filteredWordList, wordSearchParams.nowPage, wordSearchParams.pageSize));
  }, [wordSearchParams.nowPage]);

  useEffect(() => {
    const div = containerRef.current;
    if (!div) return;
    requestAnimationFrame(() => {
      let scrollHeight = 0;
      if (moveDirectionRef.current === 'bottom') {
        scrollHeight = div.scrollHeight;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = setTimeout(() => {
        div.scrollTo({ top: scrollHeight, behavior: 'smooth' });
      }, 10);
    });
  }, [showWordList]);

  return (
    <div id="word_list_container" css={wordCardListStyle}>
      {jlptList.length > 0 && showWordList.length === 0 ? (
        <EmptyData setWordSearchParams={setWordSearchParams} />
      ) : (
        showWordList.map((word) => <WordCard key={word.uuid} wordData={word} />)
      )}
      {totalPage > 0 && (
        <Pagination
          nowPage={wordSearchParams.nowPage}
          totalPage={totalPage}
          setWordSearchParams={setWordSearchParams}
        />
      )}
    </div>
  );
};

export default WordCardList;
