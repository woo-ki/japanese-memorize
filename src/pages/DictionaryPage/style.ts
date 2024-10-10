import { css, Theme } from '@emotion/react';

export const dictionaryPageStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤을 위한 설정 */

  > #search_container {
    ${theme.utils.getFlex('column')}
    gap: 4px;
    position: sticky;
    top: 0;
    padding-bottom: 16px;
    background: ${theme.colors.background};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
