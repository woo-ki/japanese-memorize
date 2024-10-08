import { globalLoadingScreenStyle } from '@components/globals/GlobalLoadingScreen/style.ts';

const GlobalLoadingScreen = () => {
  return (
    <div css={globalLoadingScreenStyle}>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default GlobalLoadingScreen;
