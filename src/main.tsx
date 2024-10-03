import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from '@src/router.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme.emotion.ts';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
