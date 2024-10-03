import { FC } from 'react';
import { moveIconStyle } from '@components/pages/homePage/MoveIcon/style.ts';
import { useNavigate } from 'react-router-dom';

interface MoveIconProps {
  src: string;
  alt: string;
  title: string;
  to: string;
}

const MoveIcon: FC<MoveIconProps> = ({ title, src, alt, to }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className="move-icon-container" css={moveIconStyle} onClick={handleClick}>
      <div className="move-icon-height-wrapper">
        <div className="move-icon-wrapper">
          <img src={src} alt={alt} />
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default MoveIcon;
