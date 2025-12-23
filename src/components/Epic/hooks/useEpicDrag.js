import { useEffect, useRef } from "react";

const DRAG_THRESHOLD = 6;

export function useEpicDrag() {
    const containerRef = useRef(null);
    const framesRef = useRef(null);

    useEffect(() => {
        const setup = (element) => {
            if (!element) return () => {};

            let isPointerDown = false;
            let isDragging = false;
            let startX = 0;
            let scrollStart = 0;
            let pointerId = null;

            const cleanupVisualState = () => {
                isPointerDown = false;
                isDragging = false;

                element.classList.remove("dragging");
                element.classList.remove("grabbing");

                if (
                    pointerId !== null &&
                    element.hasPointerCapture(pointerId)
                ) {
                    element.releasePointerCapture(pointerId);
                }

                pointerId = null;
            };

            const onPointerDown = (e) => {
                if (e.button !== 0) return;

                isPointerDown = true;
                isDragging = false;
                startX = e.clientX;
                scrollStart = element.scrollLeft;
                pointerId = e.pointerId;

                element.classList.add("grabbing");
            };

            const onPointerMove = (e) => {
                if (!isPointerDown) return;

                const deltaX = e.clientX - startX;

                if (!isDragging) {
                    if (Math.abs(deltaX) < DRAG_THRESHOLD) return;

                    isDragging = true;
                    element.classList.add("dragging");
                    element.setPointerCapture(pointerId);
                }

                e.preventDefault();
                element.scrollLeft = scrollStart - deltaX;
            };

            element.addEventListener("pointerdown", onPointerDown);
            element.addEventListener("pointermove", onPointerMove);
            element.addEventListener("pointerup", cleanupVisualState);
            element.addEventListener("pointercancel", cleanupVisualState);

            // 🔑 garante liberação quando NÃO houve drag
            window.addEventListener("pointerup", cleanupVisualState);

            return () => {
                element.removeEventListener("pointerdown", onPointerDown);
                element.removeEventListener("pointermove", onPointerMove);
                element.removeEventListener("pointerup", cleanupVisualState);
                element.removeEventListener("pointercancel", cleanupVisualState);
                window.removeEventListener("pointerup", cleanupVisualState);
            };
        };

        const cleanups = [
            setup(containerRef.current),
            setup(framesRef.current),
        ];

        return () => cleanups.forEach(fn => fn());
    }, []);

    return { containerRef, framesRef };
}
