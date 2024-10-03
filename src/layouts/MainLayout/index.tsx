import LayoutBody from 'src/components/layouts/LayoutBody';
import { MainLayoutStyle } from '@src/layouts/MainLayout/style.ts';

const MainLayout = () => {
  return (
    <div id="main_layout_container" css={MainLayoutStyle}>
      <LayoutBody />
    </div>
  );
};

export default MainLayout;
