import { css, Theme } from '@emotion/react';

export const globalLoadingScreenStyle = (theme: Theme) => css`
  background: ${theme.colors.overlay};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${theme.utils.getVH(100)};
  ${theme.utils.getFlexCenter()}

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    > div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: ${theme.colors.point};
      animation-timing-function: cubic-bezier(0, 1, 1, 0);

      &:nth-of-type(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
      }
      &:nth-of-type(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      &:nth-of-type(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      &:nth-of-type(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
      }
    }
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;
