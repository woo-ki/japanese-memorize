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

const DictionaryPage = () => {
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
  const { searchWordList } = useIndexedDB();

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

  useEffect(() => {
    initParam();
  }, []);

  useEffect(() => {
    if (wordSearchParams.part === '') return;
    searchWordList(wordSearchParams).then((res) => {
      updateQuery();
      setWordList(res);
    });
  }, [wordSearchParams]);

  const setLevel = (level: JlptWordLevelType | '전체') => {
    setWordSearchParams((prev) => ({ ...prev, level }));
  };
  const setPart = (part: string) => {
    setWordSearchParams((prev) => ({ ...prev, part }));
  };

  return (
    <div>
      <SearchBar
        smallSize={true}
        initValue={searchParams.get('keyword') || ''}
        setWordSearchParams={setWordSearchParams}
      />
      <RadioButtonGroup name="레벨 필터" list={levelListRef.current} value={wordSearchParams.level} setter={setLevel} />
      <RadioButtonGroup name="품사 필터" list={partListRef.current} value={wordSearchParams.part} setter={setPart} />
      <div>
        {wordList.map((word) => (
          <WordCard key={word.uuid} word={word} />
        ))}
      </div>
    </div>
  );
};

export default DictionaryPage;
