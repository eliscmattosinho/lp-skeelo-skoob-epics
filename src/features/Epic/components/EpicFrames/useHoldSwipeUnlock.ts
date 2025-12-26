import { useRef } from "react";

interface UseHoldSwipeUnlockOptions {
  onUnlock: () => void;
  swipeThreshold?: number;
  holdDelay?: number;
  isTouch: boolean;
}

export function useHoldSwipeUnlock({
  onUnlock,
  swipeThreshold = 20,
  holdDelay = 120,
  isTouch,
}: UseHoldSwipeUnlockOptions) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const startY = useRef(0);
  const deltaY = useRef(0);
  const isHolding = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- TOUCH ---------- */

  const onTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!isTouch) return;

    startY.current = e.touches[0].clientY;
    deltaY.current = 0;
    isHolding.current = false;

    holdTimer.current = setTimeout(() => {
      isHolding.current = true;
      btnRef.current?.classList.add("dragging");
    }, holdDelay);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!isHolding.current || !btnRef.current) return;

    deltaY.current = e.touches[0].clientY - startY.current;

    if (deltaY.current < 0) {
      btnRef.current.style.transform = `translateY(${deltaY.current}px)`;
    }
  };

  const onTouchEnd = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    if (!btnRef.current) return;

    btnRef.current.classList.remove("dragging");
    btnRef.current.style.transform = "translateY(0)";

    if (isHolding.current && deltaY.current < -swipeThreshold) {
      onUnlock();
    }

    isHolding.current = false;
  };

  /* ---------- DESKTOP ---------- */

  const onClick = () => {
    if (!isTouch) {
      onUnlock();
    }
  };

  return {
    btnRef,
    bind: {
      onClick,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
