import SearchIcon from '@assets/icons/search_icon.svg';
import { ChangeEvent, Dispatch, FC, KeyboardEvent, SetStateAction, useCallback, useState } from 'react';
import { searchBarStyle } from '@components/pages/common/SearchBar/style.ts';
import { useNavigate } from 'react-router-dom';
import { WordSearchParamsType } from '@hooks/useIndexedDB/types.ts';

type SearchBarProps = {
  initValue?: string;
  smallSize?: boolean;
  setWordSearchParams?: Dispatch<SetStateAction<WordSearchParamsType>>;
};
const SearchBar: FC<SearchBarProps> = ({ initValue, smallSize, setWordSearchParams }) => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>(initValue || '');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };
  const handleClick = useCallback(() => {
    if (setWordSearchParams) {
      setWordSearchParams((prev) => ({ ...prev, keyword: searchKeyword, nowPage: 1 }));
    } else {
      if (searchKeyword === '') return;
      navigate({
        pathname: '/dictionary',
        search: `?keyword=${searchKeyword}`, // 쿼리만 변경
      });
    }
  }, [searchKeyword, navigate]);

  return (
    <section id="search_bar_container" className={`${smallSize && 'small'}`} css={searchBarStyle}>
      <input
        type="text"
        id="search_input"
        placeholder="검색할 단어를 입력하세요"
        value={searchKeyword}
        onChange={handleChange}
        onKeyUp={handleEnterPress}
        autoComplete="off"
      />
      <button id="search_button" onClick={handleClick}>
        <SearchIcon />
      </button>
    </section>
  );
};

export default SearchBar;
