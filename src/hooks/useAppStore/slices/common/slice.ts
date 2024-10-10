import type { SliceCreator } from '@hooks/useAppStore/utils/getCreate.ts';
import { AlertPropsType, StoreType } from './types.ts';

const defaultAlertProps: AlertPropsType = {
  type: 'info',
  title: '',
  message: '',
  confirmButton: '',
};
export const slice: SliceCreator<StoreType> = (set, get) => ({
  isDataLoading: false,
  needOptimize: false,
  alertProps: defaultAlertProps,
  showAlert: false,
  alertResolve: null,
  setIsDataLoading: (isDataLoading) => {
    set(() => ({ isDataLoading }));
  },
  setNeedOptimize: (needOptimize) => {
    set(() => ({ needOptimize }));
  },
  openAlert: (alertProps) => {
    return new Promise((resolve) => {
      set(() => ({ alertProps, showAlert: true, alertResolve: resolve }));
    });
  },
  confirmAlert: (result) => {
    set(() => ({ alertProps: defaultAlertProps, showAlert: false }));
    const resolve = get().alertResolve;
    if (resolve) {
      resolve(result);
      set(() => ({ alertResolve: null }));
    }
  },
});
