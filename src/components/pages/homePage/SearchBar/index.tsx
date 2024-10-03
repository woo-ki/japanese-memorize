import SearchIcon from '@assets/icons/search_icon.svg';
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { searchBarStyle } from '@components/pages/homePage/SearchBar/style.ts';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };
  const handleClick = useCallback(() => {
    if (searchKeyword === '') return;
    navigate({
      pathname: '/dictionary',
      search: `?keyword=${searchKeyword}`, // 쿼리만 변경
    });
  }, [searchKeyword, navigate]);

  return (
    <section id="search_bar_container" css={searchBarStyle}>
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
