import { useEffect, useReducer, useMemo } from "react";

type Phase = "typing" | "deleting";

interface State {
  displayedChars: string[];
  index: number;
  phase: Phase;
}

type Action =
  | { type: "TYPE_NEXT"; char: string }
  | { type: "DELETE_PREV" }
  | { type: "SET_PHASE"; phase: Phase }
  | { type: "RESET" };

interface TypingEffectProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
}

const initialState: State = {
  displayedChars: [],
  index: 0,
  phase: "typing",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TYPE_NEXT":
      return {
        ...state,
        displayedChars: [...state.displayedChars, action.char],
        index: state.index + 1,
      };

    case "DELETE_PREV":
      return {
        ...state,
        displayedChars: state.displayedChars.slice(0, -1),
      };

    case "SET_PHASE":
      return {
        ...state,
        phase: action.phase,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function TypingEffect({
  text,
  speed = 100,
  deleteSpeed = 50,
  pause = 1500,
}: TypingEffectProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { displayedChars, index, phase } = state;

  const chars = useMemo<string[]>(() => Array.from(text), [text]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (phase === "typing") {
      if (index < chars.length) {
        timeout = setTimeout(() => {
          dispatch({ type: "TYPE_NEXT", char: chars[index] });
        }, speed);
      } else {
        timeout = setTimeout(() => {
          dispatch({ type: "SET_PHASE", phase: "deleting" });
        }, pause);
      }
    }

    if (phase === "deleting") {
      if (displayedChars.length > 0) {
        timeout = setTimeout(() => {
          dispatch({ type: "DELETE_PREV" });
        }, deleteSpeed);
      } else {
        dispatch({ type: "RESET" });
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [phase, index, displayedChars, chars, speed, deleteSpeed, pause]);

  return (
    <p className="p-typing">
      {displayedChars.join("")}
      <span className="blinking-cursor" aria-hidden="true">
        |
      </span>
    </p>
  );
}

export default TypingEffect;
