import { css, Theme } from '@emotion/react';

export const layoutBodyStyle = (theme: Theme) => css`
  width: 100%;
  overflow: hidden;
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.border};
  height: calc(100% - ${theme.layouts.footerSize} - ${theme.layouts.headerSize});
  border-top: 1px solid ${theme.colors.border};
  background: ${theme.colors.background};

  &.main-page {
    height: calc(100% - ${theme.layouts.footerSize});
    border-top: none;
  }
`;
