import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useIndexedDB } from '@hooks/useIndexedDB';
import { JlptWordLevelType, JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { isValidLevel } from '@utils/type-guards.ts';
import { commonFunctions } from '@utils/functions.ts';
import RadioButtonGroup from '@components/pages/dictionaryPage/RadioButtonGroup';
import WordCard from '@components/pages/dictionaryPage/WordCard';

const DictionaryPage = () => {
  const levelListRef = useRef<(JlptWordLevelType | '전체')[]>(['전체', 'N1', 'N2', 'N3', 'N4', 'N5']);
  const [partList, setPartList] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [level, setLevel] = useState<JlptWordLevelType | '전체'>('전체');
  const [keyword, setKeyword] = useState<string>('');
  const [nowPage, setNowPage] = useState<number>(1);
  const [part, setPart] = useState<string>('전체');
  const [wordList, setWordList] = useState<JlptWordType[]>([]);
  const { getPartList, searchWordList } = useIndexedDB();

  const initParam = () => {
    const level = searchParams.get('level');
    const keyword = searchParams.get('keyword');
    const nowPage = searchParams.get('nowPage');
    const part = searchParams.get('part');
    setLevel(isValidLevel(level) ? level : '전체');
    setKeyword(keyword || '');
    setNowPage(commonFunctions.isNumber(nowPage) ? Number(nowPage) : 1);
    setPart(part || '전체');
  };
  const updateQuery = () => {
    // 새로운 쿼리 파라미터 생성
    const newParams = new URLSearchParams();
    newParams.set('level', level);
    newParams.set('keyword', keyword);
    newParams.set('nowPage', nowPage + '');
    newParams.set('part', part);
    setSearchParams(newParams, { replace: true });
  };

  useEffect(() => {
    initParam();
    updateQuery();
  }, []);
  useEffect(() => {
    getPartList(level).then((parts) => {
      setPartList(() => {
        setPart((prev) => {
          return parts.includes(prev) ? prev : '전체';
        });
        return parts;
      });
    });
  }, [level]);
  useEffect(() => {
    searchWordList(level, '', part, nowPage, 10).then((res) => {
      updateQuery();
      setWordList(res);
    });
  }, [nowPage, partList, part]);

  return (
    <div>
      사전페이지
      <RadioButtonGroup name="레벨 필터" list={levelListRef.current} value={level} setter={setLevel} />
      {partList.length > 0 && <RadioButtonGroup name="품사 필터" list={partList} value={part} setter={setPart} />}
      <div>
        {wordList.map((word) => (
          <WordCard key={word.uuid} word={word} />
        ))}
      </div>
    </div>
  );
};

export default DictionaryPage;
