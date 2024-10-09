type SchemaType = {
  name: string;
  keyPath: string | string[];
  options: {
    unique: boolean;
    multiEntry?: boolean;
  };
};
export type ObjectStoresMetaType = {
  store: string;
  storeConfig: {
    keyPath: string;
    autoIncrement: boolean;
  };
  storeSchema: SchemaType[];
};

export type DBConfigType = {
  name: string;
  version: number;
  objectStoresMeta: ObjectStoresMetaType[];
};

export const DBConfig: DBConfigType = {
  name: 'japanese-memorize',
  // 수정사항 생긴다면 무조건 버전을 올려야 함
  version: 1,
  // storeSchema는 수정할 수 있지만 storeConfig와 store는 수정할 수 없음.
  objectStoresMeta: [
    {
      store: 'last-modified',
      storeConfig: { keyPath: 'store_name', autoIncrement: false },
      storeSchema: [],
    },
    {
      store: 'jlpt-word',
      storeConfig: { keyPath: 'uuid', autoIncrement: false },
      storeSchema: [
        { name: 'searchIndex', keyPath: ['level', 'furigana'], options: { unique: false } },
        { name: 'levelIndex', keyPath: 'level', options: { unique: false } },
      ],
    },
  ],
};
