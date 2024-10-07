import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useIndexedDB } from '@hooks/useIndexedDB';
import { JlptWordLevelType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { isValidLevel } from '@utils/type-guards.ts';
import { commonFunctions } from '@utils/functions.ts';

type UpdateQueryParamType = {
  level: JlptWordLevelType | '전체';
  keyword: string;
  nowPage: number;
  part: string;
};

const DictionaryPage = () => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isValidLevel(e.target.value)) {
      setLevel(e.target.value);
    } else {
      setLevel('전체');
    }
  };

  return (
    <div>
      사전페이지
      <div>
        <input type="radio" name="level" value="전체" onChange={handleChange} />
        전체
        <input type="radio" name="level" value="N1" onChange={handleChange} />
        N1
        <input type="radio" name="level" value="N2" onChange={handleChange} />
        N2
        <input type="radio" name="level" value="N3" onChange={handleChange} />
        N3
        <input type="radio" name="level" value="N4" onChange={handleChange} />
        N4
        <input type="radio" name="level" value="N5" onChange={handleChange} />
        N5
      </div>
      <div>keyword: {keyword}</div>
      <div>nowPage: {nowPage}</div>
      <div>part: {part}</div>
    </div>
  );
};

export default DictionaryPage;
