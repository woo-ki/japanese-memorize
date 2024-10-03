import type { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { logger } from '@hooks/useAppStore/middlewares/logger.ts';

export type MiddleWareOptionType = {
  name: string;
  logger: boolean;
};

type Middleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  // eslint-disable-next-line no-unused-vars
  f: StateCreator<T, Mps, Mcs>,
  // eslint-disable-next-line no-unused-vars
  option: MiddleWareOptionType
) => StateCreator<T, Mps, Mcs>;

// eslint-disable-next-line no-unused-vars
type MiddlewareImpl = <T>(f: StateCreator<T, [], []>, option: MiddleWareOptionType) => StateCreator<T, [], []>;

const middlewaresImpl: MiddlewareImpl = (f, option) => (set, get, store) => {
  return logger(f, option)(set, get, store);
};

export const middlewares = middlewaresImpl as Middleware;
