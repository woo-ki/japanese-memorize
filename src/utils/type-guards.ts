import { JlptWordLevelType } from '@hooks/useIndexedDB/utils/fetchJlptWord.ts';

export function isValidLevel(level: string | null): level is JlptWordLevelType | '전체' {
  const validLevels: (JlptWordLevelType | '전체')[] = ['N5', 'N4', 'N3', 'N2', 'N1', '전체'];
  return validLevels.includes(level as JlptWordLevelType | '전체');
}
