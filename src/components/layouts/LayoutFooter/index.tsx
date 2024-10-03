import { layoutFooterStyle } from '@components/layouts/LayoutFooter/style.ts';
import { useEffect } from 'react';

const LayoutFooter = () => {
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle;
        if (adsbygoogle) {
          adsbygoogle.push({});
        }
      } catch (e) {
        console.error(e);
      }
    };

    const interval = setInterval(() => {
      // Check if Adsense script is loaded every 300ms
      if (window.adsbygoogle) {
        pushAd();
        // clear the interval once the ad is pushed so that function isn't called indefinitely
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <footer css={layoutFooterStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: 320, height: 100 }}
        data-ad-client="ca-pub-9287532724113794"
        data-ad-slot="6333744210"
      ></ins>
    </footer>
  );
};

export default LayoutFooter;
