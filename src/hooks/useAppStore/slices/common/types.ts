export type AlertPropsType = {
  type: 'caution' | 'info';
  title: string;
  message: string;
  confirmButton: string;
  cancelButton?: string;
};
type StatesType = {
  isDataLoading: boolean;
  alertProps: AlertPropsType;
  showAlert: boolean;
  // eslint-disable-next-line no-unused-vars
  alertResolve: ((value: boolean) => void) | null;
};

// eslint-disable-next-line no-unused-vars
export type OpenAlertType = (alertProps: AlertPropsType) => Promise<boolean>;
// eslint-disable-next-line no-unused-vars
export type setIsDataLoadingType = (isDataLoading: boolean) => void;
type ActionsType = {
  setIsDataLoading: setIsDataLoadingType;
  openAlert: OpenAlertType;
  // eslint-disable-next-line no-unused-vars
  confirmAlert: (result: boolean) => void;
};

export type StoreType = StatesType & ActionsType;
