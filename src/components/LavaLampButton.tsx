import React, { useEffect, useState } from 'react';
import './LavaLampButton.scss';
import { FiArrowUp } from "react-icons/fi";

const LavaLampButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const header = document.querySelector('header.nav-bar');
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="lava-lamp-button"
      aria-label="Voltar ao topo"
      onClick={scrollToTop}
    >
      <div className="liquid-container">
        <div className="blob gray"></div>
        <div className="blob green"></div>
        <div className="blob blue"></div>
      </div>
      <FiArrowUp className="arrow-icon" size={22} />
    </button>
  );
};

export default LavaLampButton;
