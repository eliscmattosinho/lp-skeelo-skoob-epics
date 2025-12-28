import { useRef } from "react";

type Theme = string;
type EpicId = string;

interface ThemeRefs {
  frames: Record<EpicId, HTMLDivElement | null>;
  stack: HTMLDivElement | null;
  details: HTMLDivElement | null;
}

export type EpicRefsMap = Record<Theme, ThemeRefs>;

export function useEpicRefs() {
  const epicRefs = useRef<EpicRefsMap>({});

  const ensureTheme = (theme: Theme) => {
    if (!epicRefs.current[theme]) {
      epicRefs.current[theme] = {
        frames: {},
        stack: null,
        details: null,
      };
    }
  };

  const registerEpicRef = (theme: Theme, epicId: EpicId, el: HTMLDivElement | null) => {
    ensureTheme(theme);
    epicRefs.current[theme].frames[epicId] = el;
  };

  const registerStackRef = (theme: Theme, el: HTMLDivElement | null) => {
    ensureTheme(theme);
    epicRefs.current[theme].stack = el;
  };

  const registerDetailsRef = (theme: Theme, el: HTMLDivElement | null) => {
    ensureTheme(theme);
    epicRefs.current[theme].details = el;
  };

  const getEpicFrame = (theme: Theme, epicId: EpicId) =>
    epicRefs.current[theme]?.frames[epicId] ?? null;

  const getStack = (theme: Theme) => epicRefs.current[theme]?.stack ?? null;

  const getDetails = (theme: Theme) => epicRefs.current[theme]?.details ?? null;

  return {
    registerEpicRef,
    registerStackRef,
    registerDetailsRef,
    getEpicFrame,
    getStack,
    getDetails,
  };
}
