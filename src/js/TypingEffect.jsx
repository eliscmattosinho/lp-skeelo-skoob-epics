import { useEffect, useState } from 'react';

function TypingEffect({ text, speed = 100, pause = 1500 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, pause]);

  return <p id="p-typing">{displayedText}<span className="blinking-cursor">|</span></p>;
}

export default TypingEffect;
