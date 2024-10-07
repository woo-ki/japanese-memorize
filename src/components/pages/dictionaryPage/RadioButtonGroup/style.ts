import { css, Theme } from '@emotion/react';

export const radioButtonGroupStyle = (theme: Theme) => css`
  ${theme.utils.getFlex('column')}
  padding: 8px;
  border: 1px solid ${theme.colors.black};
  background: ${theme.colors.second};
  border-radius: 8px;
  gap: 8px;

  > .radio-button-area {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    > .radio-button-wrapper {
      ${theme.utils.getFlexCenter()}
      gap: 4px;

      > .radio-button-checkbox {
        width: 16px;
        height: 16px;
        background: ${theme.colors.white};
        border: 1px solid ${theme.colors.black};
        border-radius: 100px;
        position: relative;

        &.active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          background: ${theme.colors.button};
          border-radius: 100px;
        }
      }
    }
  }
`;
