import LayoutBody from 'src/components/layouts/LayoutBody';
import { mainLayoutStyle } from '@src/layouts/MainLayout/style.ts';
import LayoutFooter from '@components/layouts/LayoutFooter';

const MainLayout = () => {
  return (
    <div id="main_layout_container" css={mainLayoutStyle}>
      <LayoutBody />
      <LayoutFooter />
    </div>
  );
};

export default MainLayout;
