import { css, Theme } from '@emotion/react';

export const flashCardStyle = (theme: Theme, translateX: string) => css`
  perspective: 1000px; /* 추가 */
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  perspective-origin: center;
  transform-style: preserve-3d;
  transform: translateX(${translateX});

  > div {
    width: 100%;
    height: 100%;
    ${theme.utils.getFlexCenter()};
    border-radius: 20px;
    backface-visibility: hidden;

    &.flashcard-front {
      position: absolute;
      background: ${theme.colors.third};
    }

    &.flashcard-back {
      position: absolute;
      background: ${theme.colors.point};
      color: ${theme.colors.white};
      transform: rotateY(180deg);
    }
  }

  &.flipped {
    transform: translateX(${translateX}) rotateY(180deg);
  }
`;
