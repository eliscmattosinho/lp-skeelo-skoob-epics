import { useEffect, useRef } from "react";

const DRAG_THRESHOLD = 6;

export function useDrag(enabled: boolean = true) {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const enabledRef = useRef(enabled); // Para controlar habilitação dinamicamente
  enabledRef.current = enabled;

  useEffect(() => {
    const el = dragRef.current;
    if (!el) return;

    // permite scroll vertical em touch
    el.style.touchAction = enabledRef.current ? "pan-y" : "auto";

    if (!enabledRef.current) return;

    let isDown = false;
    let didDrag = false;
    let startX = 0;
    let scrollStart = 0;
    let activePointerId: number | null = null;

    /**
     * Elementos interativos NÃO devem iniciar drag
     */
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

    /**
     * Bloqueia autoscroll do botão do meio
     */
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      /**
       * Clique em botão NÃO inicia drag
       */
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

      // Só inicia drag após threshold horizontal
      if (!didDrag) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        didDrag = true;
        el.classList.add("dragging");
      }

      // A partir daqui, impede scroll da página
      e.preventDefault();
      el.scrollLeft = scrollStart - dx;
    };

    const onPointerUp = () => {
      if (activePointerId != null) {
        try {
          el.releasePointerCapture(activePointerId);
        } catch {}
      }
      resetDrag();
    };

    /**
     * Cancela click SOMENTE se houve drag real
     */
    const onClickCapture = (e: MouseEvent) => {
      if (!didDrag) return;
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClickCapture, true);

    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("blur", resetDrag);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);

      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", resetDrag);
    };
  }, []);

  // Função para habilitar drag dinamicamente
  const enableDrag = () => {
    const el = dragRef.current;
    if (!el) return;
    el.style.touchAction = "pan-y";
  };

  return { dragRef, enableDrag };
}
