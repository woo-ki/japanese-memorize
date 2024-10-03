import { type JlptStoreType, useJlptStore } from '@hooks/useAppStore/slices/jlpt';

type AppStoreType = {
  jlpt: JlptStoreType;
};

export type StoreKeyType = keyof AppStoreType;

export function useAppStore(): AppStoreType;
// eslint-disable-next-line no-unused-vars
export function useAppStore<K extends StoreKeyType>(storeKey: K): AppStoreType[K];
export function useAppStore<K extends StoreKeyType>(storeKey?: K): AppStoreType | AppStoreType[K] {
  const stores: AppStoreType = {
    jlpt: useJlptStore(),
  };
  if (storeKey) {
    return stores[storeKey];
  } else {
    return stores;
  }
}
