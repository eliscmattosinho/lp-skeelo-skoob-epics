import { useEffect, useRef } from "react";

interface UseAutoScrollParams {
    containerRef: React.RefObject<HTMLElement | null>;
    itemRefs: React.RefObject<HTMLElement[]>;
    activeIndex: number;
    initialIndex?: number;
}

export function useAutoScroll({
    containerRef,
    itemRefs,
    activeIndex,
    initialIndex = 0,
}: UseAutoScrollParams) {
    const hasAutoScrolledRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        const item = itemRefs.current?.[activeIndex];

        if (!container || !item) return;

        if (
            hasAutoScrolledRef.current &&
            activeIndex === initialIndex
        ) {
            return;
        }

        const itemRect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const isHiddenLeft = itemRect.left < containerRect.left;
        const isHiddenRight = itemRect.right > containerRect.right;

        if (!isHiddenLeft && !isHiddenRight) {
            hasAutoScrolledRef.current = true;
            return;
        }

        container.scrollTo({
            left:
                item.offsetLeft -
                container.clientWidth / 2 +
                item.clientWidth / 2,
            behavior: "smooth",
        });

        hasAutoScrolledRef.current = true;
    }, [activeIndex, initialIndex, containerRef, itemRefs]);
}
