type Theme = string;
type EpicId = string;

// Controle de animações por elemento
const runningAnimations = new WeakMap<HTMLElement, Promise<void>>();
const animationQueues = new WeakMap<HTMLElement, (() => void)[]>();

const canAnimate = (element: HTMLElement): boolean => {
  const styles = window.getComputedStyle(element);
  return (
    styles.display !== "none" &&
    styles.visibility !== "hidden" &&
    styles.opacity !== "0" &&
    !element.classList.contains("hide")
  );
};

const applyAnimation = (element: HTMLElement, callback: () => void): void => {
  if (!canAnimate(element)) {
    callback();
    return;
  }

  runningAnimations.delete(element);
  animationQueues.delete(element);

  animationQueues.set(element, []);
  const queue = animationQueues.get(element)!;

  const anim = new Promise<void>((resolve) => {
    element.style.transition = "opacity 0.5s ease-out";
    element.style.opacity = "0";

    let finished = false;
    const onEnd = () => {
      if (finished) return;
      finished = true;
      element.removeEventListener("transitionend", onEnd);
      resolve();
      callback();
    };

    element.addEventListener("transitionend", onEnd);
    setTimeout(onEnd, 600);
  });

  runningAnimations.set(element, anim);
  anim.finally(() => {
    runningAnimations.delete(element);
    const next = queue.shift();
    if (next) next();
  });
};

const animateOpen = (element: HTMLElement, x: number): void => {
  element.style.transition = "none";
  element.style.transform = "translate3d(0,0,0)";
  element.offsetHeight;

  requestAnimationFrame(() => {
    element.style.transition = "transform 0.5s ease-in-out";
    element.style.transform = `translate3d(${x}px,0,0)`;
  });
};

const animateClose = (element: HTMLElement, x: number): void => {
  element.style.transition = "none";
  element.style.transform = `translate3d(${x}px,0,0)`;
  element.offsetHeight;

  requestAnimationFrame(() => {
    element.style.transition = "transform 0.4s ease-in-out";
    element.style.transform = "translate3d(0,0,0)";
  });
};

export const handleEpicDetails = (
  epicFrame: HTMLElement,
  stack: HTMLDivElement,
  details: HTMLDivElement,
  theme: Theme,
  epicId: EpicId,
  onComplete?: () => void
): void => {
  if (epicFrame.dataset.epicActive === epicId) return;
  epicFrame.dataset.epicActive = epicId;

  if (window.matchMedia("(min-width: 400px)").matches) {
    stack.style.margin = "0 auto";
  }

  if (window.matchMedia("(min-width: 768px)").matches) {
    animateOpen(epicFrame, -10);
  }

  const frames = Array.from(stack.querySelectorAll<HTMLElement>(".mockup-frame"));
  let processed = 0;

  frames.forEach((frame) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      animateOpen(frame, -5);
    }
    processed++;
    if (processed === frames.length && onComplete) {
      onComplete();
    }
  });

  if (!details.dataset.visible) {
    details.dataset.visible = "true";
    setTimeout(() => {
      details.style.display = "flex";
      details.style.opacity = "1";
    }, 500);
  }

  if (!epicFrame.dataset.hideScheduled) {
    epicFrame.dataset.hideScheduled = "true";
    setTimeout(() => hideElementsWithDelay(epicFrame, theme), 500);
  }
};

const hideElementsWithDelay = (epicFrame: HTMLElement, theme: Theme): void => {
  ["frame-action", "frame-title", "epic-overlay"].forEach((cls) => {
    const element =
      epicFrame.querySelector<HTMLElement>(`.${cls}-${theme}-epic`) ||
      epicFrame.querySelector<HTMLElement>(`.${cls}`);

    if (!element) return;

    applyAnimation(element, () => {
      element.classList.add("hide");
    });
  });
};

export const restoreEpicElements = (theme: Theme, epicId: EpicId): void => {
  const frames = document.querySelectorAll<HTMLElement>(
    `.mockup-group.${theme} .mockup-frame[data-epic-id="${epicId}"]`
  );

  frames.forEach((epicFrame) => {
    delete epicFrame.dataset.epicActive;
    delete epicFrame.dataset.hideScheduled;

    if (window.matchMedia("(min-width: 768px)").matches) {
      animateClose(epicFrame, -10);
    }

    ["frame-action", "frame-title", "epic-overlay"].forEach((cls) => {
      const element =
        epicFrame.querySelector<HTMLElement>(`.${cls}-${theme}-epic`) ||
        epicFrame.querySelector<HTMLElement>(`.${cls}`);

      if (!element) return;

      runningAnimations.delete(element);
      animationQueues.delete(element);

      element.classList.remove("hide");
      element.style.transition = "opacity 0.4s ease-out";
      element.style.opacity = "1";
    });
  });
};
