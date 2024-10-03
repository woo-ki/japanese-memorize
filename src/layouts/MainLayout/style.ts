import { css, Theme } from '@emotion/react';

export const MainLayoutStyle = (theme: Theme) => css`
  width: 100%;
  height: ${theme.utils.getVH(100)};
`;
