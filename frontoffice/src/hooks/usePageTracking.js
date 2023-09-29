import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = (title) => {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState('blah');
  useEffect(() => {
    if (title && prevPath !== location.pathname) {
      setPrevPath(location.pathname);
      console.log('Page tracking !', prevPath, location.pathname, title);
      // console.log('Page tracking !', location.pathname, title);
    //  _paq.push(['setCustomUrl', '/' + location.hash.substr(1)]);
    //  _paq.push(['setDocumentTitle', title]);
    //  _paq.push(['trackPageView']);
    }
  }, [prevPath, setPrevPath, location.pathname, title]);
};

export default usePageTracking;