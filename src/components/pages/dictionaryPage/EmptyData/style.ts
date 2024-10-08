import { css, Theme } from '@emotion/react';

export const emptyDataStyle = (theme: Theme) => css`
  ${theme.utils.getFlexCenter('column')}

  > svg {
    width: 40%;
  }
  > p {
    font-size: ${theme.sizes.header};
    color: ${theme.colors.supportFont};
  }
  > button {
    padding: 8px 16px;
    background-color: ${theme.colors.button};
    color: ${theme.colors.white};
    border: none;
    border-radius: 4px;
    margin-top: 12px;
  }
`;
