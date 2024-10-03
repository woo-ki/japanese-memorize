import { useEffect } from 'react';
import { useAppStore } from '@hooks/useAppStore';
import jlptData from '@data/jlpt_word.json';
import type { JlptType } from '@hooks/useAppStore/slices/jlpt';
import { helperClass } from '@styles/helper.emotion.ts';
import { globalEmotion } from '@styles/global.emotion.ts';
import { Global } from '@emotion/react';
import MainLayout from '@layouts/MainLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';

function App() {
  const jlptStore = useAppStore('jlpt');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const jlpt: JlptType = jlptData as JlptType;
    jlptStore.setJlpt(jlpt);

    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const params = Object.fromEntries(searchParams.entries());
    if (params.path) {
      const pathname = decodeURIComponent(params.path);
      delete params.path;
      const newParams = new URLSearchParams(params);
      navigate(
        {
          pathname,
          search: `?${newParams.toString()}`,
        },
        { replace: true }
      );
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Global styles={helperClass} />
      <Global styles={globalEmotion} />
      <MainLayout />
    </>
  );
}

export default App;
