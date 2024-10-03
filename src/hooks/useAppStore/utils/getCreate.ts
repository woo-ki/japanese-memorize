import { type StateCreator, type StoreApi, type UseBoundStore, create } from 'zustand';
import { type MiddleWareOptionType, middlewares } from '@hooks/useAppStore/middlewares/middlewares.ts';

export type SliceCreator<T> = StateCreator<T>;
export function getCreate<T>(slice: StateCreator<T>, store_name: string): UseBoundStore<StoreApi<T>> {
  const option: MiddleWareOptionType = {
    name: store_name,
    logger: import.meta.env.VITE_APP_LOGGER === 'true',
  };
  return create<T>()(middlewares(slice, option));
}
