import { css, Theme } from '@emotion/react';

export const customAlertStyle = (theme: Theme) => css`
  background: ${theme.colors.overlay};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${theme.utils.getVH(100)};
  ${theme.utils.getFlexCenter()};

  .dialog-container {
    background-color: ${theme.colors.white};
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px ${theme.colors.shadow};
    border-radius: 8px;
    padding: 20px;
    width: 80vw;
    max-width: 400px;
    text-align: center;

    .dialog-icon {
      font-size: ${theme.sizes.title};
      color: ${theme.colors.point};
      margin-bottom: 10px;
    }
    .dialog-title {
      font-size: ${theme.sizes.header};
      margin-bottom: 10px;
    }
    .dialog-message {
      font-size: ${theme.sizes.contents};
      color: ${theme.colors.secondFont};
      margin-bottom: 20px;
      white-space: pre-wrap;
    }
    .dialog-buttons {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-top: 20px;

      .dialog-button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: ${theme.sizes.contents};
        flex: 1;

        &.cancel-button {
          background-color: ${theme.colors.second};
        }
        &.confirm-button {
          background-color: ${theme.colors.button};
          color: ${theme.colors.white};
        }
      }
    }
  }
`;
