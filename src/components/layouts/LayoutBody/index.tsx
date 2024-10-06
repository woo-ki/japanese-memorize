import { Outlet, useLocation } from 'react-router-dom';
import { layoutBodyStyle } from '@components/layouts/LayoutBody/style.ts';
import { useEffect, useState } from 'react';
import { JlptWordType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';
import { useIndexedDB } from '@hooks/useIndexedDB';

const LayoutBody = () => {
  const { pathname } = useLocation();
  const [jlpt, setJlpt] = useState<JlptWordType[]>([]);

  const { searchWordList } = useIndexedDB();

  useEffect(() => {
    searchWordList('전체', '', 1, '전체').then((res) => {
      setJlpt(res);
    });
  }, []);

  return (
    <main className={pathname === '/' ? 'main-page' : ''} css={layoutBodyStyle}>
      <Outlet />

      {jlpt.map((data) => (
        <div key={data.uuid}>{JSON.stringify(data)}</div>
      ))}
    </main>
  );
};

export default LayoutBody;
