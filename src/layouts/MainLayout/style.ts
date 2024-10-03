import { css, Theme } from '@emotion/react';

export const mainLayoutStyle = (theme: Theme) => css`
  width: 100%;
  height: ${theme.utils.getVH(100)};
  background: ${theme.colors.background};
  max-width: 600px;
`;
