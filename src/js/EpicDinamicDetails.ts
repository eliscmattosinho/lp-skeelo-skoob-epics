type Theme = string;
type EpicId = string;

const canAnimate = (element: HTMLElement): boolean => {
  const styles = window.getComputedStyle(element);

  return (
    styles.display !== "none" &&
    styles.visibility !== "hidden" &&
    styles.opacity !== "0" &&
    !element.classList.contains("hide")
  );
};

export const handleEpicDetails = (epicId: EpicId, theme: Theme): void => {
  const mockupSection = document.querySelector<HTMLElement>(
    `.mockup-group.${theme}`
  );

  if (mockupSection && window.matchMedia("(min-width: 400px)").matches) {
    mockupSection.style.margin = "0 auto";
  }

  const themeSection = document.querySelector<HTMLElement>(
    `#${theme} .mockup-stack`
  );
  const epicFrame = document.getElementById(epicId) as HTMLElement | null;

  if (!epicFrame || !themeSection) {
    console.error(`Erro ao encontrar elementos: ${epicId} ou ${theme}`);
    return;
  }

  applyTransitions(epicId, theme);

  setTimeout(() => {
    hideElementsWithDelay(themeSection, epicId, theme);
  }, 500);
};

const hideElementsWithDelay = (
  themeSection: HTMLElement,
  epicId: EpicId,
  theme: Theme
): void => {
  const epicFrame = themeSection.querySelector<HTMLElement>(`#${epicId}`);
  if (!epicFrame) return;

  ["frame-action", "frame-title", "epic-overlay"].forEach((cls) => {
    const element =
      epicFrame.querySelector<HTMLElement>(`.${cls}-${theme}-epic`) ||
      epicFrame.querySelector<HTMLElement>(`.${cls}`);

    if (!element || element.dataset.animating === "true") return;

    element.dataset.animating = "true";

    applyAnimation(element, () => {
      element.classList.add("hide");
      element.dataset.animating = "false";
    });
  });
};

const applyAnimation = (
  element: HTMLElement,
  callback: () => void
): void => {
  if (!canAnimate(element)) {
    callback();
    return;
  }

  element.style.transition = "opacity 0.5s ease-out";
  element.style.opacity = "0";

  let finished = false;

  const onEnd = () => {
    if (finished) return;
    finished = true;
    element.removeEventListener("transitionend", onEnd);
    callback();
  };

  element.addEventListener("transitionend", onEnd);

  // Fallback preventivo
  setTimeout(onEnd, 600);
};

const applyTransitions = (epicId: EpicId, theme: Theme): void => {
  const epicDetails = document.querySelector<HTMLElement>(".epic-details");
  const themeSection = document.querySelector<HTMLElement>(
    `#${theme} .mockup-stack`
  );
  const epicFrame = document.getElementById(epicId) as HTMLElement | null;

  if (!epicDetails || !epicFrame || !themeSection) {
    console.error(
      `Erro ao encontrar elementos para o épico: ${epicId} ou ${theme}`
    );
    return;
  }

  epicFrame.style.transition = "transform 0.5s ease-in-out";

  if (window.matchMedia("(min-width: 768px)").matches) {
    epicFrame.style.transform = "translate(-10px)";
  }

  themeSection
    .querySelectorAll<HTMLElement>(".mockup-frame")
    .forEach((frame) => {
      frame.style.transition = "transform 0.5s ease-in-out";
      if (window.matchMedia("(min-width: 768px)").matches) {
        frame.style.transform = "translate(-5px)";
      }
    });

  setTimeout(() => {
    epicDetails.style.display = "flex";
    epicDetails.style.opacity = "1";

    const iconClose = document.querySelector<HTMLElement>(
      `#${theme}-close.btn-close.hide`
    );
    iconClose?.classList.remove("hide");
  }, 500);
};

export const restoreEpicElements = (theme: Theme): void => {
  const themeSection = document.querySelector<HTMLElement>(
    `#${theme} .mockup-stack`
  );

  if (!themeSection) {
    console.error(`Erro ao encontrar a seção do tema: ${theme}`);
    return;
  }

  const mockupSection = document.querySelector<HTMLElement>(
    `.mockup-group.${theme}`
  );
  if (mockupSection) {
    mockupSection.style.margin = "0";
  }

  themeSection
    .querySelectorAll<HTMLElement>(".mockup-frame")
    .forEach((epicFrame) => {
      ["frame-action", "frame-title", "epic-overlay"].forEach((cls) => {
        const element =
          epicFrame.querySelector<HTMLElement>(`.${cls}-${theme}-epic`) ||
          epicFrame.querySelector<HTMLElement>(`.${cls}`);

        if (!element) return;

        if (element.classList.contains("hide")) {
          element.classList.remove("hide");
        }

        Object.assign(element.style, {
          opacity: "1",
          transition: "opacity 0.5s ease-in-out",
        });

        delete element.dataset.animating;
      });

      Object.assign(epicFrame.style, {
        transform: "translate(0)",
        transition: "transform 0.5s ease-in-out",
      });
    });
};

export const addMediaQueryListeners = (
  callback: (event: MediaQueryListEvent) => void
): void => {
  [
    "(min-width: 768px)",
    "(min-width: 400px) and (max-width: 767px)",
    "(max-width: 399px)",
  ]
    .map((query) => window.matchMedia(query))
    .forEach((mq) => mq.addEventListener("change", callback));
};
