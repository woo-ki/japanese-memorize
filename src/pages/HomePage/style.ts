import { css, Theme } from '@emotion/react';

export const homePageStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  gap: 16px;
  ${theme.utils.getFlexCenter('column')}

  > #home_page_title_wrapper {
    ${theme.utils.getFlex()};
    align-items: flex-end;
    margin-bottom: 36px;
    gap: 8px;
    > #home_page_title {
      font-size: 36px;
    }
    > img {
      width: 50px;
    }
  }

  > #home_page_item_wrapper {
    ${theme.utils.getFlexCenter()}
    gap: 16px;
    width: 100%;
  }
`;
