import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ScreenState {
  width: number;
  isMobile: boolean;
  isTouch: boolean;
}

interface ScreenProviderProps {
  children: ReactNode;
}

const MOBILE_BREAKPOINT = 768;

const ScreenContext = createContext<ScreenState | undefined>(undefined);

export function ScreenProvider({ children }: ScreenProviderProps) {
  const getState = (): ScreenState => {
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

  const [state, setState] = useState<ScreenState>(getState);

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

export function useScreen(): ScreenState {
  const ctx = useContext(ScreenContext);

  if (!ctx) {
    throw new Error("useScreen must be used within ScreenProvider");
  }

  return ctx;
}
