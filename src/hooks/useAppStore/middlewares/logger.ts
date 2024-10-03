import type { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { MiddleWareOptionType } from './middlewares.ts';

type Logger = <
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
type LoggerImpl = <T>(f: StateCreator<T, [], []>, option: MiddleWareOptionType) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, option) => (set, get, store) => {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const loggedSet: typeof set = (...a) => {
    const { name, logger: enabled } = option;
    const action_name = `${name} update`;
    const time = getCurrentTime();
    if (!enabled) {
      set(...(a as Parameters<typeof set>));
      return;
    }
    console.group(`%c${action_name} %c@ ${time}`, 'color: black; font-weight: bold', 'color: grey');
    console.log(`  %cprev state\n`, 'color: grey; font-weight: bold', get());
    set(...(a as Parameters<typeof set>));
    console.log(`  %cnext state\n`, 'color: green; font-weight: bold', get());
    console.groupEnd();
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as Logger;
