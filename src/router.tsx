import { createBrowserRouter } from 'react-router-dom';
import App from '@src/App.tsx';
import NotFoundPage from '@pages/NotFoundPage';
import HomePage from '@pages/HomePage';
import DictionaryPage from '@pages/DictionaryPage';
import MemorizePage from '@pages/MemorizePage';
import { initDB } from '@hooks/useIndexedDB';
import { DBConfig } from '@hooks/useIndexedDB/DBConfig.ts';

const initDBLoader = async () => {
  return await initDB(DBConfig);
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: initDBLoader,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'dictionary',
        element: <DictionaryPage />,
      },
      {
        path: 'memorize',
        element: <MemorizePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
