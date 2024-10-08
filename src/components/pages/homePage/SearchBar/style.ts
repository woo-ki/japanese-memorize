import { css, Theme } from '@emotion/react';

export const searchBarStyle = (theme: Theme) => css`
  display: flex;
  width: 100%;
  height: 45px;

  > #search_input {
    background: ${theme.colors.second};
    outline: none;
    width: 100%;
    border: 1px solid ${theme.colors.border};
    border-radius: 50px 0 0 50px;
    padding: 8px 8px 8px 16px;
    font-size: 20px;
  }

  > #search_button {
    background: transparent;
    outline: none;
    flex-shrink: 0;
    padding: 8px 10px 8px 6px;
    background: ${theme.colors.button};
    border-radius: 0 50px 50px 0;
    border: 1px solid ${theme.colors.border};
    border-left: none;
  }
`;
