import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext(null);

const MOBILE_BREAKPOINT = 768;
const mediaQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export function ScreenProvider({ children }) {
  const getState = () => {
    const mql = window.matchMedia(mediaQuery);

    return {
      width: window.innerWidth,
      isMobile: mql.matches,
    };
  };

  const [state, setState] = useState(getState);

  useEffect(() => {
    const mql = window.matchMedia(mediaQuery);

    const handleChange = () => {
      setState({
        width: window.innerWidth,
        isMobile: mql.matches,
      });
    };

    mql.addEventListener("change", handleChange);

    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <ScreenContext.Provider value={state}>
      {children}
    </ScreenContext.Provider>
  );
}

export function useScreen() {
  const ctx = useContext(ScreenContext);
  if (!ctx) {
    throw new Error("useScreen must be used within ScreenProvider");
  }
  return ctx;
}
