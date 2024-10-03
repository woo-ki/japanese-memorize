import { Outlet, useLocation } from 'react-router-dom';
import { layoutBodyStyle } from '@components/layouts/LayoutBody/style.ts';

const LayoutBody = () => {
  const { pathname } = useLocation();

  return (
    <main className={pathname === '/' ? 'main-page' : ''} css={layoutBodyStyle}>
      <Outlet />
    </main>
  );
};

export default LayoutBody;
