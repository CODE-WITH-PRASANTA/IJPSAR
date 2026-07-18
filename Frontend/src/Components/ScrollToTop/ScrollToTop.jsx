import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly snaps the window scroll position back to coordinates (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Fires automatically every single time the route path changes

  return null;
};

export default ScrollToTop;