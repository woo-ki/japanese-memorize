import '@emotion/react';
import { ColorsTypes } from '@styles/theme/colors.emotion.ts';
import { UtilsTypes } from '@styles/theme/utils.emotion.ts';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsTypes;
    utils: UtilsTypes;
  }
}
