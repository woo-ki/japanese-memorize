import { css, Theme } from '@emotion/react';

export const layoutBodyStyle = (theme: Theme) => css`
  width: 100%;
  height: calc(100% - 100px);
  overflow: auto;
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.black};
`;
