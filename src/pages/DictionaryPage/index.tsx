import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type UpdateQueryParamType = {
  level: string;
  keyword: string;
  page: string;
  part: string;
};

const DictionaryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [level, setLevel] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<string>('');
  const [part, setPart] = useState<string>('');

  const getParam = (
    level: string | null,
    keyword: string | null,
    page: string | null,
    part: string | null
  ): UpdateQueryParamType => {
    return {
      level: level || '전체',
      keyword: keyword || '',
      page: page || '1',
      part: part || '전체',
    };
  };
  const updateQuery = (param: UpdateQueryParamType) => {
    // 새로운 쿼리 파라미터 생성
    const newParams = new URLSearchParams();
    newParams.set('level', param.level);
    newParams.set('keyword', param.keyword);
    newParams.set('page', param.page);
    newParams.set('part', param.part);
    setLevel(param.level);
    setKeyword(param.keyword);
    setPage(param.page);
    setPart(param.part);
    setSearchParams(newParams, { replace: true });
  };
  useEffect(() => {
    const param = getParam(
      searchParams.get('level'),
      searchParams.get('keyword'),
      searchParams.get('page'),
      searchParams.get('part')
    );
    updateQuery(param);
  }, []);

  const random = () => {
    const param = getParam(null, Math.random() + '', null, null);
    updateQuery(param);
  };
  return (
    <div>
      사전페이지
      <button onClick={random}>ㅎㅇ</button>
      <div>level: {level}</div>
      <div>keyword: {keyword}</div>
      <div>page: {page}</div>
      <div>part: {part}</div>
    </div>
  );
};

export default DictionaryPage;
