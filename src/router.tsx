import { createBrowserRouter } from 'react-router-dom';
import App from '@src/App.tsx';
import NotFoundPage from '@pages/NotFoundPage';
import HomePage from '@pages/HomePage';
import DictionaryPage from '@pages/DictionaryPage';
import MemorizePage from '@pages/MemorizePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
