import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export const usePageTracking = (title) => {
  const location = useLocation();
  const { trackPageView } = useMatomo()
  useEffect(() => {
    trackPageView({
      documentTitle: title
    });
  }, [location, trackPageView]);
}

export const Layout = ({ children, title }) => {
  usePageTracking(title);
  return children;
}

export default Layout;