import type { SliceCreator } from '@hooks/useAppStore/utils/getCreate.ts';
import { StoreType } from './types.ts';

export const slice: SliceCreator<StoreType> = (set) => ({
  isDataLoading: false,
  setIsDataLoading: (isDataLoading) => {
    set(() => ({ isDataLoading }));
  },
});
