import { createBrowserRouter } from 'react-router-dom';
import App from '@src/App.tsx';
import NotFoundPage from '@pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [],
  },
]);

export default router;
