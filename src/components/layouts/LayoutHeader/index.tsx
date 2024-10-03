import { layoutHeaderStyle } from '@components/layouts/LayoutHeader/style.ts';
import logoImage from '@assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const LayoutHeader = () => {
  const navigate = useNavigate();
  const moveHome = () => {
    navigate('/');
  };
  return (
    <header css={layoutHeaderStyle}>
      <div id="logo_wrapper" onClick={moveHome}>
        <img src={logoImage} alt="로고 이미지" />
        <h2 id="logo_text">일본어 암기장</h2>
      </div>
    </header>
  );
};

export default LayoutHeader;
