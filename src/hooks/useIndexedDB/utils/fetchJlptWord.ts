export type JlptWordTypeForFetch = {
  uuid: string;
  level: string;
  word: string;
  furigana: string;
  parts: string[];
  means: string[];
  study_date?: Date | null;
  memorize_count?: number;
  failed_memorize_count?: number;
};

export type JlptWordType = Required<JlptWordTypeForFetch>;

export type FetchJlptWordResponseType = {
  last_modified: Date;
  word_list: JlptWordTypeForFetch[];
};

export const fetchJlptWord = async (): Promise<FetchJlptWordResponseType> => {
  const url = `${import.meta.env.PROD ? 'https://woo-ki.s3.ap-northeast-2.amazonaws.com' : '/s3'}/japanese-memorize/data/jlpt_word.json`;
  const response = await fetch(url);

  return {
    last_modified: new Date(response.headers.get('Last-Modified') || '2024-10-06'),
    word_list: await response.json(),
  };
};
