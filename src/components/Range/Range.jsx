import { useEffect, useMemo, useRef, useState } from "react";
import "./Range.css";

function Range({ items, theme, speed = 1.1 }) {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const measureRef = useRef(null);

    const [repeatCount, setRepeatCount] = useState(2);

    // Mede a largura real de uma sequência de items
    useEffect(() => {
        if (!measureRef.current || !containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const contentWidth = measureRef.current.scrollWidth;

        if (contentWidth === 0) return;

        const minWidth = containerWidth * 2;
        const neededRepeats = Math.ceil(minWidth / contentWidth);

        setRepeatCount(Math.max(2, neededRepeats));
    }, [items]);

    const loopItems = useMemo(() => {
        return Array.from({ length: repeatCount })
            .flatMap(() => items);
    }, [items, repeatCount]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let lastTime = 0;
        const fps = 60;
        const frameDuration = 1000 / fps;

        const autoScroll = (time) => {
            if (time - lastTime >= frameDuration) {
                container.scrollLeft += speed;
                lastTime = time;

                const resetPoint = container.scrollWidth / repeatCount;
                if (container.scrollLeft >= resetPoint) {
                    container.scrollLeft -= resetPoint;
                }
            }

            animationRef.current = requestAnimationFrame(autoScroll);
        };

        animationRef.current = requestAnimationFrame(autoScroll);

        return () => cancelAnimationFrame(animationRef.current);
    }, [speed, repeatCount]);

    return (
        <div ref={containerRef} className={`range ${theme}-range`}>
            {/* elemento invisível apenas para medição */}
            <div
                ref={measureRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                }}
            >
                {items.map((item, index) => (
                    <p className="range-tag" key={`measure-${index}`}>
                        {item}
                    </p>
                ))}
            </div>

            {loopItems.map((item, index) => (
                <p className="range-tag" key={`${item}-${index}`}>
                    {item}
                </p>
            ))}
        </div>
    );
}

export default Range;
