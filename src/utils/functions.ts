export const commonFunctions = {
  isNumber: (value: string | null): boolean => {
    if (value === null) {
      return false;
    }

    // 숫자로 변환 후 NaN 체크
    return !isNaN(Number(value));
  },
};
