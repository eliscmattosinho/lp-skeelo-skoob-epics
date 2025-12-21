import { useEffect, useReducer } from "react";

const initialState = {
  displayedText: "",
  index: 0,
  phase: "typing", // typing | deleting
};

function reducer(state, action) {
  switch (action.type) {
    case "TYPE_NEXT":
      return {
        ...state,
        displayedText: state.displayedText + action.char,
        index: state.index + 1,
      };

    case "DELETE_PREV":
      return {
        ...state,
        displayedText: state.displayedText.slice(0, -1),
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

function TypingEffect({ text, speed = 100, deleteSpeed = 50, pause = 1500 }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { displayedText, index, phase } = state;

  useEffect(() => {
    let timeout;

    if (phase === "typing") {
      if (index < text.length) {
        timeout = setTimeout(() => {
          dispatch({
            type: "TYPE_NEXT",
            char: text.charAt(index),
          });
        }, speed);
      } else {
        timeout = setTimeout(() => {
          dispatch({ type: "SET_PHASE", phase: "deleting" });
        }, pause);
      }
    }

    if (phase === "deleting") {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          dispatch({ type: "DELETE_PREV" });
        }, deleteSpeed);
      } else {
        dispatch({ type: "RESET" });
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, index, displayedText, text, speed, deleteSpeed, pause]);

  return (
    <p className="p-typing">
      {displayedText}
      <span className="blinking-cursor" aria-hidden="true">
        |
      </span>
    </p>
  );
}

export default TypingEffect;
