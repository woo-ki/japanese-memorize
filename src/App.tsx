import { useEffect } from 'react';
import { helperClass } from '@styles/helper.emotion.ts';
import { globalEmotion } from '@styles/global.emotion.ts';
import { Global } from '@emotion/react';
import MainLayout from '@layouts/MainLayout';
import { useLoaderData } from 'react-router-dom';
import { useIndexedDB } from '@hooks/useIndexedDB';

function App() {
  const initSuccess = useLoaderData() as boolean;
  const { closeDB } = useIndexedDB();
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      closeDB();
    };
  }, []);

  if (!initSuccess) return <div>데이터 최적화 불가 페이지를 다시 로드 해 주세요</div>;
  return (
    <>
      <Global styles={helperClass} />
      <Global styles={globalEmotion} />
      <MainLayout />
    </>
  );
}

export default App;
