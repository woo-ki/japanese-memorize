import { useEffect } from 'react';
import { useAppStore } from '@hooks/useAppStore';
import jlptData from '@data/jlpt_word.json';
import type { JlptType } from '@hooks/useAppStore/slices/jlpt';
import { helperClass } from '@styles/helper.emotion.ts';
import { globalEmotion } from '@styles/global.emotion.ts';
import { Global } from '@emotion/react';
import MainLayout from '@layouts/MainLayout';

function App() {
  const jlptStore = useAppStore('jlpt');

  useEffect(() => {
    const jlpt: JlptType = jlptData as JlptType;
    jlptStore.setJlpt(jlpt);

    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

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
