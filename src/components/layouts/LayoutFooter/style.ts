import { css, Theme } from '@emotion/react';

export const layoutFooterStyle = (theme: Theme) => css`
  width: 100%;
  height: ${theme.layouts.footerSize};
  ${theme.utils.getFlexCenter()}
`;
