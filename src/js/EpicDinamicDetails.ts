type Theme = string;
type EpicId = string;
//@todo: amanhã
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

    if (element) {
      applyAnimation(element, () => {
        element.classList.add("hide");
      });
    }
  });
};

const applyAnimation = (element: HTMLElement, callback: () => void): void => {
  element.style.transition = "opacity 0.5s ease-out";
  element.style.opacity = "0";

  element.addEventListener("transitionend", () => callback(), { once: true });
};

const applyTransitions = (epicId: EpicId, theme: Theme): void => {
  const epicDetails = document.querySelector<HTMLElement>(".details-container");
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

  themeSection
    .querySelectorAll<HTMLElement>(".mockup-frame")
    .forEach((epicFrame) => {
      ["frame-action", "frame-title", "epic-overlay"].forEach((cls) => {
        const element =
          epicFrame.querySelector<HTMLElement>(`.${cls}-${theme}-epic`) ||
          epicFrame.querySelector<HTMLElement>(`.${cls}`);

        if (element) {
          element.classList.remove("hide");

          Object.assign(element.style, {
            opacity: "1",
            transition: "opacity 0.5s ease-in-out",
          });
        }
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
