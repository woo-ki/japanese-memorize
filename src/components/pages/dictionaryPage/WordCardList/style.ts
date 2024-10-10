import { css, Theme } from '@emotion/react';

export const wordCardListStyle = (theme: Theme) => css`
  ${theme.utils.getFlex('column')}
  gap: 8px;
`;
