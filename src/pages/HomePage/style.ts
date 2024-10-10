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
      font-size: ${theme.sizes.title};
    }
    > img {
      width: 60px;
    }
  }

  > #home_page_item_wrapper {
    ${theme.utils.getFlexCenter()}
    gap: 16px;
    width: 100%;
  }

  > .optimize-button {
    background-color: ${theme.colors.button}; /* 사용자 색상 코드 사용 */
    border: none;
    padding: 8px 24px 8px 16px;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-size: ${theme.sizes.contents};
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    ${theme.utils.getFlexCenter()};
    gap: 2px;

    > span {
      color: ${theme.colors.white};
    }
  }
`;
