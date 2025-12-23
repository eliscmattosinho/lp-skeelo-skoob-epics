export const handleEpicDetails = (epicId, theme) => {
    // Extrair o número do épico a partir do identificador
    const epicNumber = epicId.replace('epico', '');
    const mockupSection = document.querySelector(`.epic-section-mockups.${theme}`);

    if (window.matchMedia('(min-width: 400px)').matches) {
        mockupSection.style.margin = '0 auto';
    }

    // container mockups-stack
    const themeSection = document.querySelector(`#${theme} .mockups-stack`);
    // épico .mockup-frame
    const epicFrame = document.getElementById(epicId);

    if (!epicFrame || !themeSection) {
        console.error(`Erro ao encontrar elementos: ${epicId} ou ${theme}`);
        return;
    }

    applyTransitions(epicId, theme);

    // Inicia o processo de ocultação dos elementos com delay
    setTimeout(() => hideElementsWithDelay(themeSection, epicId, theme), 500);
};

const hideElementsWithDelay = (themeSection, epicId, theme) => {
    const epicFrame = themeSection.querySelector(`#${epicId}`);
    if (!epicFrame) return;

    // Esconde elementos com animação
    ['hide', 'frame-action'].forEach(cls => {
        const element = epicFrame.querySelector(`.${cls}-${theme}-epic`) || epicFrame.querySelector(`.${cls}`);
        if (element) {
            applyAnimation(element, () => {
                element.style.display = 'none';
            });
        }
    });
};

const applyAnimation = (element, callback) => {
    // Oculta o elemento completamente antes de aplicar a animação de opacidade
    element.style.display = 'flex';
    element.style.transition = 'opacity 0.5s ease-out';
    element.style.opacity = '0';

    element.addEventListener('transitionend', () => {
        callback();
    }, { once: true });
};

const applyTransitions = (epicId, theme) => {
    const epicDetails = document.querySelector(".block-elements-details");
    const themeSection = document.querySelector(`#${theme} .mockups-stack`);
    const epicFrame = document.getElementById(epicId);

    if (!epicDetails || !epicFrame || !themeSection) {
        console.error(`Erro ao encontrar elementos para o épico: ${epicId} ou ${theme}`);
        return;
    }

    // epicDetails.style.opacity = '0';
    // epicDetails.style.transition = 'opacity 0.5s ease-in-out';

    epicFrame.style.transition = 'transform 0.5s ease-in-out';

    if (window.matchMedia('(min-width: 768px)').matches) {
        epicFrame.style.transform = 'translate(-10px)';
    }

    const epicFrames = themeSection.querySelectorAll('.mockup-frame');
    epicFrames.forEach(frame => {
        frame.style.transition = 'transform 0.5s ease-in-out';
        if (window.matchMedia('(min-width: 768px)').matches) {
            frame.style.transform = 'translate(-5px)';
        }
    });

    setTimeout(() => {
        epicDetails.style.display = 'flex';

        // if (window.matchMedia('(max-width: 768px)').matches) {
        //     epicDetails.style.marginTop = '-60px';
        // }

        setTimeout(() => {
            epicDetails.style.opacity = '1';
        }, 10);

        const iconClose = document.querySelector(`#${theme}-close.btn-close.invisible`);
        if (iconClose) {
            iconClose.classList.remove('invisible');
        }
    }, 500);
};

export const restoreEpicElements = (theme) => {
    const themeSection = document.querySelector(`#${theme} .mockups-stack`);
    if (!themeSection) {
        console.error(`Erro ao encontrar a seção do tema: ${theme}`);
        return;
    }

    const mockupSection = document.querySelector(`.epic-section-mockups.${theme}`);
    if (mockupSection) {
        mockupSection.style.margin = '0';
    }

    const epicFrames = themeSection.querySelectorAll('.mockup-frame');
    epicFrames.forEach(epicFrame => {
        ['hide', 'frame-action'].forEach(cls => {
            const element = epicFrame.querySelector(`.${cls}-${theme}-epic`) || epicFrame.querySelector(`.${cls}`);
            if (element) {
                Object.assign(element.style, {
                    display: 'flex',
                    opacity: '1',
                    transition: 'opacity 0.5s ease-in-out'
                });
            }
        });

        Object.assign(epicFrame.style, {
            transform: 'translate(0)',
            transition: 'transform 0.5s ease-in-out'
        });
    });
};

export const addMediaQueryListeners = callback => {
    ['(min-width: 768px)', '(min-width: 400px) and (max-width: 767px)', '(max-width: 399px)']
        .map(q => window.matchMedia(q))
        .forEach(mq => mq.addEventListener('change', callback));
};
