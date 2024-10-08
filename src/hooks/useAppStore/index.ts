import { type StoreType as CommonStoreType, useCommonStore } from '@hooks/useAppStore/slices/common';

type AppStoreType = {
  common: CommonStoreType;
};

export type StoreKeyType = keyof AppStoreType;

export function useAppStore(): AppStoreType;
// eslint-disable-next-line no-unused-vars
export function useAppStore<K extends StoreKeyType>(storeKey: K): AppStoreType[K];
export function useAppStore<K extends StoreKeyType>(storeKey?: K): AppStoreType | AppStoreType[K] {
  const stores: AppStoreType = {
    common: useCommonStore(),
  };
  if (storeKey) {
    return stores[storeKey];
  } else {
    return stores;
  }
}
