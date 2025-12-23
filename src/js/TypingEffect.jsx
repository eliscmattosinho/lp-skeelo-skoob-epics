import { useEffect, useReducer, useMemo } from "react";

const initialState = {
  displayedChars: [], // armazenamos como array
  index: 0,
  phase: "typing", // typing | deleting
};

function reducer(state, action) {
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
      return { displayedChars: [], index: 0, phase: "typing" };

    default:
      return state;
  }
}

function TypingEffect({ text, speed = 100, deleteSpeed = 50, pause = 1500 }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { displayedChars, index, phase } = state;

  const chars = useMemo(() => Array.from(text), [text]); // caracteres completos

  useEffect(() => {
    let timeout;

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

    return () => clearTimeout(timeout);
  }, [phase, index, displayedChars, chars, speed, deleteSpeed, pause]);

  return (
    <p className="p-typing">
      {displayedChars.join("")} {/* reconstruímos a string */}
      <span className="blinking-cursor" aria-hidden="true">
        |
      </span>
    </p>
  );
}

export default TypingEffect;
