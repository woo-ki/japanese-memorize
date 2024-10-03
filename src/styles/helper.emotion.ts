import { css, Theme } from '@emotion/react';

export const helperClass = (theme: Theme) => css`
  .sample {
    color: ${theme.colors.third};
  }
`;
