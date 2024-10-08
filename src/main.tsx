import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from '@src/router.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme.emotion.ts';
import { RouterProvider } from 'react-router-dom';

// 앱의 엔트리 포인트(main.tsx 등)에서 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
