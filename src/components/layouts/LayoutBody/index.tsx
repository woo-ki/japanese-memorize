import { Outlet } from 'react-router-dom';
import { layoutBodyStyle } from '@components/layouts/LayoutBody/style.ts';

const LayoutBody = () => {
  return (
    <main css={layoutBodyStyle}>
      <Outlet />
    </main>
  );
};

export default LayoutBody;
