import { css, Theme } from '@emotion/react';

export const searchBarStyle = (theme: Theme) => css`
    display: flex;
    width: 100%;
    border: 2px solid ${theme.colors.black};
    border-radius: 100px;
    background: ${theme.colors.t4};

    > #search_input {
      background: transparent;
      border: none;
      outline: none;
      width: 100%;
      border-right: 2px solid ${theme.colors.black};
      padding: 8px 8px 8px 16px;
      font-size: 20px;
    }
    
    > #search_button {
      background: transparent;
      border: none;
      outline: none;
      flex-shrink: 0;
      padding: 8px;
      background: ${theme.colors.t};
      border-radius: 0 50px 50px 0;
    }
  }
`;
