import { css, Theme } from '@emotion/react';

export const dictionaryPageStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  overflow: auto;

  > #search_container {
    ${theme.utils.getFlex('column')}
    gap: 4px;
    position: sticky;
    top: 0;
    padding-bottom: 16px;
    background: ${theme.colors.background};
  }

  > #word_list_container {
    ${theme.utils.getFlex('column')}
    gap: 8px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
