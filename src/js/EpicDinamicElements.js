export function initializeNavigation(previousButton, nextButton, contextNav, currentBlock, currentEpic) {
    let currentIndex = currentBlock;

    function updateNavigation() {
        // Verifica os blocos do épico específico
        const epicBlocks = contextNav.filter(item => item.dataset.epicId === currentEpic.identificador);

        // Atualiza visibilidade dos blocos
        epicBlocks.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });

        if (currentIndex === 0) {
            previousButton.style.visibility = 'hidden';
        } else {
            previousButton.style.visibility = 'visible';
        }

        if (currentIndex === 3) {
            nextButton.style.visibility = 'hidden';
        } else {
            nextButton.style.visibility = 'visible';
        }
    }

    updateNavigation();

    previousButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateNavigation();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < contextNav.length - 1) {
            currentIndex++;
            updateNavigation();
        }
    });
}

/**
 * Inicializa a navegação entre User Stories dentro de um container específico.
 * 
 * Esta função permite que, ao clicar em um botão (ex: "US1", "US2"...), 
 * apenas a respectiva descrição da user story seja exibida,
 * escondendo as demais. O escopo é limitado ao container passado,
 * evitando conflitos entre diferentes seções ou modais.
 * 
 * @param {HTMLElement} container - Elemento DOM onde as user stories estão inseridas. 
 * Deve conter os elementos com as classes `.epic-buttons-container` e `.user-story-details`.
 */
export function initializeUserStoryNavigation(container) {
    if (!container) return;

    const userStoryContainers = container.querySelectorAll('.user-story-details');
    const userStoryButtons = container.querySelectorAll('.epic-buttons-container .epic-button');

    if (userStoryContainers.length === 0 || userStoryButtons.length === 0) return;

    // Exibe apenas o primeiro bloco de user story
    userStoryContainers.forEach((storyEl, index) => {
        storyEl.classList.toggle('hide', index !== 0);
    });

    // Adiciona evento de clique para alternar entre histórias
    userStoryButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            userStoryContainers.forEach(container => container.classList.add('hide'));
            userStoryContainers[index].classList.remove('hide');
        });
    });
}

