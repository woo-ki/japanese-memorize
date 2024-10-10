import { css, Theme } from '@emotion/react';

export const paginationStyle = (theme: Theme) => css`
  ${theme.utils.getFlexCenter()}
  margin-top: 8px;

  > #pagination_item {
    display: flex;
    justify-content: center;
    gap: 8px;

    > div {
      color: ${theme.colors.point};
      padding: 8px 12px;
      border: 1px solid ${theme.colors.subBorder};
      border-radius: 4px;
      transition: background-color 0.3s ease;
      cursor: pointer;

      &.active {
        background-color: ${theme.colors.point};
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.point};
      }
      &.disabled {
        color: ${theme.colors.supportFont}; /* 텍스트 색상: 회색으로 설정 */
        border: 1px solid ${theme.colors.subBorder}; /* 테두리 색상도 연하게 설정 */
        cursor: not-allowed; /* 마우스 커서가 클릭할 수 없음을 나타냄 */
        opacity: 0.5; /* 반투명 효과로 비활성화 느낌 부여 */
      }
    }
  }
`;
