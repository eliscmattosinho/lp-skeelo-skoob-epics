import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext(null);

const MOBILE_BREAKPOINT = 768;

export function ScreenProvider({ children }) {
  const getState = () => {
    const width = window.innerWidth;

    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    ).matches;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    return {
      width,
      isMobile,
      isTouch,
    };
  };

  const [state, setState] = useState(getState);

  useEffect(() => {
    const mqlMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    );
    const mqlPointer = window.matchMedia("(pointer: coarse)");

    const handleChange = () => {
      setState(getState());
    };

    mqlMobile.addEventListener("change", handleChange);
    mqlPointer.addEventListener("change", handleChange);
    window.addEventListener("resize", handleChange);

    return () => {
      mqlMobile.removeEventListener("change", handleChange);
      mqlPointer.removeEventListener("change", handleChange);
      window.removeEventListener("resize", handleChange);
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
