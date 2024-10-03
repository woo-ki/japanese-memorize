import type { JlptStoreType } from './types.ts';
import { getCreate } from '@hooks/useAppStore/utils/getCreate.ts';
import { slice } from './slice.ts';

export * from './types.ts';

export const useJlptStore = getCreate<JlptStoreType>(slice, 'jlpt-store');
