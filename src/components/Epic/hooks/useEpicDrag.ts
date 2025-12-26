import { useEffect, useRef } from "react";

const DRAG_THRESHOLD = 6;

export function useEpicDrag() {
    const dragRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = dragRef.current;
        if (!el) return;

        let isDown = false;
        let didDrag = false;
        let startX = 0;
        let scrollStart = 0;
        let activePointerId: number | null = null;

        const isInteractive = (target: EventTarget | null) => {
            if (!(target instanceof HTMLElement)) return false;
            return !!target.closest(
                "button, a, input, textarea, select, [role='button']"
            );
        };

        const resetDrag = () => {
            isDown = false;
            didDrag = false;
            activePointerId = null;
            el.classList.remove("dragging");
        };

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;

            // não inicia drag se o alvo for interativo
            if (isInteractive(e.target)) return;

            isDown = true;
            didDrag = false;
            activePointerId = e.pointerId;

            startX = e.clientX;
            scrollStart = el.scrollLeft;

            el.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDown || e.pointerId !== activePointerId) return;

            const dx = e.clientX - startX;

            if (!didDrag) {
                if (Math.abs(dx) < DRAG_THRESHOLD) return;
                didDrag = true;
                el.classList.add("dragging");
            }

            el.scrollLeft = scrollStart - dx;
        };

        const onPointerUp = () => {
            if (activePointerId != null) {
                try {
                    el.releasePointerCapture(activePointerId);
                } catch { }
            }
            resetDrag();
        };

        /**
         * Cancela o click SOMENTE se houve drag real
         */
        const onClickCapture = (e: MouseEvent) => {
            if (!didDrag) return;
            e.preventDefault();
            e.stopPropagation();
        };

        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("pointermove", onPointerMove, { passive: false });
        el.addEventListener("pointerup", onPointerUp);
        el.addEventListener("pointercancel", onPointerUp);
        el.addEventListener("click", onClickCapture, true);

        // fallback global
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("blur", resetDrag);

        return () => {
            el.removeEventListener("pointerdown", onPointerDown);
            el.removeEventListener("pointermove", onPointerMove);
            el.removeEventListener("pointerup", onPointerUp);
            el.removeEventListener("pointercancel", onPointerUp);
            el.removeEventListener("click", onClickCapture, true);

            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("blur", resetDrag);
        };
    }, []);

    return { dragRef };
}
