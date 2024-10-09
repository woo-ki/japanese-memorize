type AlertPropsType = {
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
type ActionsType = {
  // eslint-disable-next-line no-unused-vars
  setIsDataLoading: (isDataLoading: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  openAlert: (alertProps: AlertPropsType) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  confirmAlert: (result: boolean) => void;
};

export type StoreType = StatesType & ActionsType;
