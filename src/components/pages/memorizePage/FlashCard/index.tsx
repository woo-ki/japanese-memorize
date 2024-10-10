import { FC, useEffect, useState } from 'react';
import { flashCardStyle } from '@components/pages/memorizePage/FlashCard/style.ts';
import { Theme } from '@emotion/react';

type FlashCardPropsType = {
  active: number;
  index: number;
};
const FlashCard: FC<FlashCardPropsType> = ({ active, index }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [translateX, setTranslateX] = useState<string>('0%');

  useEffect(() => {
    setTranslateX(`${active === index ? 0 : index < active ? (active - index) * -100 : (index - active) * 100}%`);
  }, [active, index]);

  return (
    <div
      css={(theme: Theme) => flashCardStyle(theme, translateX)}
      className={`${isFlipped ? 'flipped ' : ''}flashcard-contents`}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div className="flashcard-front">프론트</div>
      <div className="flashcard-back">백</div>
    </div>
  );
};

export default FlashCard;
