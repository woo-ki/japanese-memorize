type StatesType = {
  isDataLoading: boolean;
};
type ActionsType = {
  // eslint-disable-next-line no-unused-vars
  setIsDataLoading: (isDataLoading: boolean) => void;
};

export type StoreType = StatesType & ActionsType;
