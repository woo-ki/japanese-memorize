import { homePageStyle } from '@pages/HomePage/style.ts';
import SearchBar from '@components/pages/homePage/SearchBar';
import MoveIcon from '@components/pages/homePage/MoveIcon';
import dictionaryIcon from '@assets/icons/dictionary_icon.png';
import memorizeIcon from '@assets/icons/memorize_icon.png';
import logoImage from '@assets/images/logo.png';

const HomePage = () => {
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
    </section>
  );
};

export default HomePage;
