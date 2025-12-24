import { useEffect, useRef, useState } from "react";
import "./Range.css";

function Range({ items, theme, speed = 200, rowGap = 32 }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const firstRowRef = useRef(null);
  const rafRef = useRef(null);

  const offsetRef = useRef(0);
  const [trackItems, setTrackItems] = useState([]);

  // Ajusta duplicação para preencher toda a largura do container
  useEffect(() => {
    if (!containerRef.current || !firstRowRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const firstRowWidth = firstRowRef.current.scrollWidth + rowGap;

    const repeatCount = Math.ceil(containerWidth / firstRowWidth) + 2;

    const newTrackItems = [];
    for (let i = 0; i < repeatCount; i++) {
      newTrackItems.push(...items);
    }
    setTrackItems(newTrackItems);
  }, [items, rowGap]);

  // Animação contínua
  useEffect(() => {
    if (!trackItems.length || !firstRowRef.current) return;

    let lastTime = performance.now();

    const animate = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      offsetRef.current += (speed * delta) / 1000;

      const rowWidth = firstRowRef.current.scrollWidth + rowGap;

      if (offsetRef.current >= rowWidth) {
        offsetRef.current -= rowWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trackItems, rowGap, speed]);

  return (
    <div ref={containerRef} className={`range ${theme}-range`}>
      <div ref={trackRef} className="range-track">
        <div className="range-row" ref={firstRowRef}>
          {trackItems.map((item, i) => (
            <p className="range-tag" key={i}>{item}</p>
          ))}
        </div>

        {/* gambs fila invisível como espaçador */}
        <div className="range-row spacer" style={{ width: `${rowGap}px` }} />

        <div className="range-row">
          {trackItems.map((item, i) => (
            <p className="range-tag" key={i}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Range;
