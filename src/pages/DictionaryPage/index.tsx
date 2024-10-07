import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useIndexedDB } from '@hooks/useIndexedDB';
import { JlptWordLevelType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { isValidLevel } from '@utils/type-guards.ts';
import { commonFunctions } from '@utils/functions.ts';
import RadioButtonGroup from '@components/pages/dictionaryPage/RadioButtonGroup';

type UpdateQueryParamType = {
  level: JlptWordLevelType | '전체';
  keyword: string;
  nowPage: number;
  part: string;
};

const DictionaryPage = () => {
  const levelListRef = useRef<(JlptWordLevelType | '전체')[]>(['전체', 'N1', 'N2', 'N3', 'N4', 'N5']);
  const [searchParams, setSearchParams] = useSearchParams();
  const [level, setLevel] = useState<JlptWordLevelType | '전체'>('전체');
  const [keyword, setKeyword] = useState<string>('');
  const [nowPage, setNowPage] = useState<number>(1);
  const [part, setPart] = useState<string>('전체');
  const { searchWordList } = useIndexedDB();

  const getParam = (): UpdateQueryParamType => {
    const level = searchParams.get('level');
    const keyword = searchParams.get('keyword');
    const nowPage = searchParams.get('nowPage');
    const part = searchParams.get('part');
    return {
      level: isValidLevel(level) ? level : '전체',
      keyword: keyword || '',
      nowPage: commonFunctions.isNumber(nowPage) ? Number(nowPage) : 1,
      part: part || '전체',
    };
  };
  const updateQuery = (param: UpdateQueryParamType) => {
    // 새로운 쿼리 파라미터 생성
    const newParams = new URLSearchParams();
    newParams.set('level', param.level);
    newParams.set('keyword', param.keyword);
    newParams.set('nowPage', param.nowPage + '');
    newParams.set('part', param.part);
    setLevel(param.level);
    setKeyword(param.keyword);
    setNowPage(param.nowPage);
    setPart(param.part);
    setSearchParams(newParams, { replace: true });
  };

  useEffect(() => {
    const param = getParam();
    updateQuery(param);
  }, []);
  useEffect(() => {
    searchWordList(level, '', part, nowPage, 10).then((res) => console.log(res));
  }, [level, nowPage, part]);

  return (
    <div>
      사전페이지
      <RadioButtonGroup name="레벨 필터" list={levelListRef.current} value={level} setter={setLevel} />
      <RadioButtonGroup name="품사 필터" list={levelListRef.current} value={level} setter={setLevel} />
      <div>keyword: {keyword}</div>
      <div>nowPage: {nowPage}</div>
      <div>part: {part}</div>
    </div>
  );
};

export default DictionaryPage;
