import { css, Theme } from '@emotion/react';

export const layoutHeaderStyle = (theme: Theme) => css`
  width: 100%;
  height: ${theme.layouts.headerSize};
  padding: 8px 16px;

  > #logo_wrapper {
    display: flex;
    gap: 6px;
    align-items: flex-end;
    height: 100%;
    width: fit-content;

    > img {
      height: calc(${theme.layouts.headerSize} - 16px);
    }
    > #logo_text {
      font-size: ${theme.sizes.subTitle};
    }
  }
`;
