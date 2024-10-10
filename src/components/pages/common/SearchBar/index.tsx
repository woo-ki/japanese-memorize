import SearchIcon from '@assets/icons/search_icon.svg';
import CloseIcon from '@assets/icons/close_icon.svg';
import { ChangeEvent, Dispatch, FC, KeyboardEvent, SetStateAction, useState } from 'react';
import { searchBarStyle } from '@components/pages/common/SearchBar/style.ts';
import { useNavigate } from 'react-router-dom';
import { WordSearchParamsType } from '@hooks/useIndexedDB/types.ts';

type SearchBarProps = {
  keyword?: string;
  smallSize?: boolean;
  setWordSearchParams?: Dispatch<SetStateAction<WordSearchParamsType>>;
};
const SearchBar: FC<SearchBarProps> = ({ keyword, smallSize, setWordSearchParams }) => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword || '');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setWordSearchParams) {
      setWordSearchParams((prev) => ({ ...prev, keyword: e.target.value, nowPage: 1 }));
    }
    setSearchKeyword(e.target.value);
  };
  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword === undefined) {
      handleClick();
    }
  };
  const handleClick = () => {
    if (keyword) {
      if (setWordSearchParams) {
        setWordSearchParams((prev) => ({ ...prev, keyword: '', nowPage: 1 }));
      }
    } else {
      if (searchKeyword === '') return;
      navigate({
        pathname: '/dictionary',
        search: `?keyword=${searchKeyword}`, // 쿼리만 변경
      });
    }
  };

  return (
    <section id="search_bar_container" className={`${smallSize && 'small'}`} css={searchBarStyle}>
      <input
        type="text"
        id="search_input"
        placeholder="검색할 단어를 입력하세요"
        value={keyword !== undefined ? keyword : searchKeyword}
        onChange={handleChange}
        onKeyUp={handleEnterPress}
        autoComplete="off"
      />
      <button id="search_button" onClick={handleClick}>
        {keyword !== undefined ? <CloseIcon /> : <SearchIcon />}
      </button>
    </section>
  );
};

export default SearchBar;
