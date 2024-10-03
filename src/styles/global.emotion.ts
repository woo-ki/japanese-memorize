import { css, Theme } from '@emotion/react';

export const globalEmotion = (theme: Theme) => css`
  * {
    font-family: Hangeuljaemin4, serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${theme.colors.font};
  }
`;
