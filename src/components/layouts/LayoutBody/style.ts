import { css, Theme } from '@emotion/react';

export const layoutBodyStyle = (theme: Theme) => css`
  width: 100%;
  overflow: auto;
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.border};
  height: calc(100% - ${theme.layouts.footerSize} - ${theme.layouts.headerSize});
  border-top: 1px solid ${theme.colors.border};

  &.main-page {
    height: calc(100% - ${theme.layouts.footerSize});
    border-top: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
