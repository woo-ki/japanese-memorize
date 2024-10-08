import { css, Theme } from '@emotion/react';

export const wordCardStyle = (theme: Theme) => css`
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  background: #ffe8e0;
  box-shadow: 0 4px 8px ${theme.colors.shadow};

  > .word-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    > .word-text-wrapper {
      font-size: 20px;
      color: ${theme.colors.point};

      > .furigana-text {
        font-size: 0.7em;
        color: ${theme.colors.supportFont};
      }
    }

    > .level-info {
      font-size: 16px;
      background-color: ${theme.colors.point};
      color: ${theme.colors.white};
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
  > .word-card-means-wrapper {
    margin-top: 12px;
    font-size: 1em;
    ${theme.utils.getFlex('column')}
    gap: 4px;
    color: ${theme.colors.secondFont};
  }
  > .word-card-footer-wrapper {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    color: #888;
  }
`;
