import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useIndexedDB } from '@hooks/useIndexedDB';
import { JlptWordLevelType, JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { isValidLevel } from '@utils/type-guards.ts';
import { commonFunctions } from '@utils/functions.ts';
import RadioButtonGroup from '@components/pages/dictionaryPage/RadioButtonGroup';
import WordCard from '@components/pages/dictionaryPage/WordCard';
import { WordSearchParamsType } from '@hooks/useIndexedDB/types.ts';
import SearchBar from '@components/pages/common/SearchBar';
import { dictionaryPageStyle } from '@pages/DictionaryPage/style.ts';
import Pagination from '@components/pages/dictionaryPage/Pagination';
import EmptyData from '@components/pages/dictionaryPage/EmptyData';

const DictionaryPage = () => {
  const [dataFetchComplete, setDataFetchComplete] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const levelListRef = useRef<(JlptWordLevelType | '전체')[]>(['전체', 'N1', 'N2', 'N3', 'N4', 'N5']);
  const partListRef = useRef<string[]>([
    '전체',
    '형용사',
    '형용동사',
    '조사',
    '접사',
    '부사',
    '명사',
    '동사',
    '대명사',
    '기타',
    '관용어',
    '감동사',
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [wordSearchParams, setWordSearchParams] = useState<WordSearchParamsType>({
    level: '전체',
    keyword: '',
    part: '',
    nowPage: 1,
    pageSize: 10,
  });
  const [wordList, setWordList] = useState<JlptWordType[]>([]);
  const moveDirectionRef = useRef<'top' | 'bottom' | null>(null);
  const [totalPage, setTotalPage] = useState(0);
  const { searchWordList, getTotalPage } = useIndexedDB();

  const initParam = () => {
    const level = searchParams.get('level');
    const keyword = searchParams.get('keyword');
    const nowPage = searchParams.get('nowPage');
    const part = searchParams.get('part');
    const tempLevel = isValidLevel(level) ? level : '전체';
    const tempKeyword = keyword || '';
    const tempNowPage = commonFunctions.isNumber(nowPage) ? Number(nowPage) : 1;
    const tempPart = part || '전체';
    setWordSearchParams((prev) => ({
      ...prev,
      level: tempLevel,
      keyword: tempKeyword,
      nowPage: tempNowPage,
      part: tempPart,
    }));
  };

  const updateQuery = () => {
    // 새로운 쿼리 파라미터 생성
    const newParams = new URLSearchParams();
    newParams.set('level', wordSearchParams.level);
    newParams.set('keyword', wordSearchParams.keyword);
    newParams.set('nowPage', wordSearchParams.nowPage + '');
    newParams.set('part', wordSearchParams.part);
    setSearchParams(newParams, { replace: true });
  };

  const procSetWord = async () => {
    if (wordSearchParams.part === '') return;
    const wordList = await searchWordList(wordSearchParams);
    updateQuery();
    setWordList(wordList);
  };

  useEffect(() => {
    initParam();
  }, []);

  useEffect(() => {
    setDataFetchComplete(true);
    if (!moveDirectionRef.current) return;
    if (moveDirectionRef.current === 'top') {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [wordList]);

  useEffect(() => {
    getTotalPage(wordSearchParams).then((res) =>
      setTotalPage((prev) => {
        if (prev === res) {
          procSetWord().then();
        }
        return res;
      })
    );
  }, [wordSearchParams.part, wordSearchParams.level, wordSearchParams.keyword]);

  useEffect(() => {
    procSetWord().then();
  }, [totalPage, wordSearchParams.nowPage]);

  const setLevel = (level: JlptWordLevelType | '전체') => {
    moveDirectionRef.current = 'top';
    setWordSearchParams((prev) => ({ ...prev, level, nowPage: 1 }));
  };
  const setPart = (part: string) => {
    moveDirectionRef.current = 'top';
    setWordSearchParams((prev) => ({ ...prev, part, nowPage: 1 }));
  };
  const setPage = (nowPage: number) => {
    moveDirectionRef.current = 'bottom';
    setWordSearchParams((prev) => ({ ...prev, nowPage }));
  };

  return (
    <div ref={containerRef} css={dictionaryPageStyle}>
      <div id="search_container">
        <SearchBar smallSize={true} keyword={wordSearchParams.keyword} setWordSearchParams={setWordSearchParams} />
        <RadioButtonGroup
          name="레벨 필터"
          list={levelListRef.current}
          value={wordSearchParams.level}
          setter={setLevel}
        />
        <RadioButtonGroup name="품사 필터" list={partListRef.current} value={wordSearchParams.part} setter={setPart} />
      </div>
      <div id="word_list_container">
        {dataFetchComplete && wordList.length > 0 ? (
          wordList.map((word) => <WordCard key={word.uuid} wordData={word} />)
        ) : (
          <EmptyData setWordSearchParams={setWordSearchParams} />
        )}
      </div>
      {totalPage > 0 && wordList.length > 0 && (
        <Pagination nowPage={wordSearchParams.nowPage} totalPage={totalPage} setPage={setPage} />
      )}
    </div>
  );
};

export default DictionaryPage;
