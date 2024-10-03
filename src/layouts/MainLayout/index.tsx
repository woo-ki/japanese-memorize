import LayoutBody from 'src/components/layouts/LayoutBody';
import { mainLayoutStyle } from '@src/layouts/MainLayout/style.ts';
import LayoutFooter from '@components/layouts/LayoutFooter';
import LayoutHeader from '@components/layouts/LayoutHeader';
import { useLocation } from 'react-router-dom';

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <div id="main_layout_container" css={mainLayoutStyle}>
      {pathname !== '/' && <LayoutHeader />}
      <LayoutBody />
      <LayoutFooter />
    </div>
  );
};

export default MainLayout;
