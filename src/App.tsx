import { useEffect } from 'react';
import { useAppStore } from '@hooks/useAppStore';
import jlptData from '@data/jlpt_word.json';
import type { JlptType } from '@hooks/useAppStore/slices/jlpt';
import { helperClass } from '@styles/helper.emotion.ts';
import { globalEmotion } from '@styles/global.emotion.ts';
import { Global } from '@emotion/react';
import MainLayout from '@layouts/MainLayout';
import { useSearchParams } from 'react-router-dom';

function App() {
  const jlptStore = useAppStore('jlpt');
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path');

  useEffect(() => {
    const jlpt: JlptType = jlptData as JlptType;
    jlptStore.setJlpt(jlpt);

    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    if (path) {
      console.log(path);
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
