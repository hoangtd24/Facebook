import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    //Scroll to top when navigate
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);
  return children;
}

export default ScrollToTop;
