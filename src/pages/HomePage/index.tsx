import { homePageStyle } from '@pages/HomePage/style.ts';
import SearchBar from 'src/components/pages/common/SearchBar';
import MoveIcon from '@components/pages/homePage/MoveIcon';
import dictionaryIcon from '@assets/icons/dictionary_icon.png';
import memorizeIcon from '@assets/icons/memorize_icon.png';
import logoImage from '@assets/images/logo.png';
import { useIndexedDB } from '@hooks/useIndexedDB';

const HomePage = () => {
  const { init, needOptimize } = useIndexedDB();
  return (
    <section id="home_page_container" css={homePageStyle}>
      <section id="home_page_title_wrapper">
        <img src={logoImage} alt="로고 이미지" />
        <h1 id="home_page_title">일본어 암기장</h1>
      </section>
      <SearchBar />
      <section id="home_page_item_wrapper">
        <MoveIcon title="Dictionary" alt="사전 아이콘" src={dictionaryIcon} to="dictionary" />
        <MoveIcon title="Memorize" alt="암기 아이콘" src={memorizeIcon} to="memorize" />
      </section>
      {needOptimize && (
        <button className="optimize-button" onClick={init}>
          <span>⚙️</span>
          <span>최적화 하기</span>
        </button>
      )}
    </section>
  );
};

export default HomePage;
