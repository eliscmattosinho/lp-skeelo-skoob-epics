import { useEffect, useRef, useState } from "react";
import "./Range.css";

interface RangeProps {
  items: readonly string[];
  theme: string;
  speed?: number;
  rowGap?: number;
}

const Range: React.FC<RangeProps> = ({
  items,
  theme,
  speed = 200,
  rowGap = 32,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstRowRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const offsetRef = useRef<number>(0);
  const [trackItems, setTrackItems] = useState<string[]>([]);

  // Ajusta duplicação para preencher toda a largura do container
  useEffect(() => {
    if (!containerRef.current || !firstRowRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const firstRowWidth = firstRowRef.current.scrollWidth + rowGap;

    const repeatCount = Math.ceil(containerWidth / firstRowWidth) + 2;

    const newTrackItems: string[] = [];
    for (let i = 0; i < repeatCount; i++) {
      newTrackItems.push(...items);
    }

    setTrackItems(newTrackItems);
  }, [items, rowGap]);

  // Animação contínua
  useEffect(() => {
    if (!trackItems.length || !firstRowRef.current) return;

    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      offsetRef.current += (speed * delta) / 1000;

      const rowWidth = firstRowRef.current!.scrollWidth + rowGap;

      if (offsetRef.current >= rowWidth) {
        offsetRef.current -= rowWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [trackItems, rowGap, speed]);

  return (
    <div ref={containerRef} className={`range ${theme}-range`}>
      <div ref={trackRef} className="range-track">
        <div ref={firstRowRef} className="range-row">
          {trackItems.map((item, index) => (
            <p className="range-tag" key={`${item}-${index}`}>
              {item}
            </p>
          ))}
        </div>

        {/* fila invisível como espaçador */}
        <div
          className="range-row spacer"
          style={{ width: `${rowGap}px` }}
        />

        <div className="range-row">
          {trackItems.map((item, index) => (
            <p className="range-tag" key={`${item}-dup-${index}`}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Range;
