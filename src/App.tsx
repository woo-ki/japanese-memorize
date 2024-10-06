import { useEffect } from 'react';
import { useAppStore } from '@hooks/useAppStore';
import type { JlptWordType } from '@hooks/useAppStore/slices/jlpt';
import { helperClass } from '@styles/helper.emotion.ts';
import { globalEmotion } from '@styles/global.emotion.ts';
import { Global } from '@emotion/react';
import MainLayout from '@layouts/MainLayout';

function App() {
  const jlptStore = useAppStore('jlpt');
  const fetchJltpWord = async (): Promise<JlptWordType[]> => {
    const url = `${import.meta.env.PROD ? 'https://woo-ki.s3.ap-northeast-2.amazonaws.com' : '/s3'}/japanese-memorize/data/jlpt_word.json`;
    const response = await fetch(url);

    return await response.json();
  };

  useEffect(() => {
    fetchJltpWord().then((res) => {
      jlptStore.setJlptList(res);
    });

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
