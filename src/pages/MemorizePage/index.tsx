import { memorizePageStyle } from '@pages/MemorizePage/style.ts';
import { useState } from 'react';
import FlashCard from '@components/pages/memorizePage/FlashCard';

const MemorizePage = () => {
  const test = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }, { key: 6 }, { key: 7 }, { key: 8 }];
  const [active, setActive] = useState(0);
  return (
    <div css={memorizePageStyle}>
      <div id="flashcard_container">
        {test.map((item, index) => (
          <FlashCard key={item.key} active={active} index={index} />
        ))}
      </div>
      <div id="button_container">
        <button
          onClick={() => {
            setActive((prev) => {
              if (prev === test.length - 1) return 0;
              return prev + 1;
            });
          }}
        >
          으아
        </button>
      </div>
    </div>
  );
};

export default MemorizePage;
