import { css, Theme } from '@emotion/react';

export const moveIconStyle = (theme: Theme) => css`
  width: 50%;
  ${theme.utils.getFlexCenter()}

  > .move-icon-height-wrapper {
    width: 100%;
    padding-bottom: 100%;
    border: 2px solid ${theme.colors.black};
    background: ${theme.colors.t4};
    border-radius: 16px;
    position: relative;

    > .move-icon-wrapper {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      ${theme.utils.getFlexCenter('column')}
      gap: 8px;

      > img {
        width: 50%;
        height: auto;
      }
      > h3 {
        font-size: 20px;
      }
    }
  }
`;
