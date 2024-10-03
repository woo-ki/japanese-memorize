export const utils = {
  getVH: (vh: number) => `calc(var(--vh) * ${vh})`,
  getFlex: (direction: 'row' | 'column' = 'row') => `
      display: flex;
      flex-direction: ${direction};
    `,
  getFlexCenter: (direction: 'row' | 'column' = 'row') => `
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: ${direction};
    `,
};

export type UtilsTypes = typeof utils;
