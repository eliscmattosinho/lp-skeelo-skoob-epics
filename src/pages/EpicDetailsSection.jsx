import React, { useLayoutEffect, useRef, useState } from 'react';
import './EpicDetailsSection.css';
import { useEpicDetails } from '../hooks/useEpicDetails.js';
import { RiExpandDiagonalLine } from "react-icons/ri";
import { GrPrevious, GrNext } from "react-icons/gr";

import { initializeNavigation, initializeUserStoryNavigation } from '../js/EpicDinamicElements.js';
import { useModal } from '../js/ModalManipulation.js';
import Modal from '../components/Modal.jsx';

import useExpandHandler from '../hooks/useExpandHandler.js';

function EpicContext({ context }) {
    return (
        <div className="epic-section epic-context">
            <div id='epic-context-content'>
                <h3 className='epic-section-title'>Contexto</h3>
                <div className='epic-section-body'>
                    <p className="epic-context-text">{context || "Contexto não disponível"}</p>
                </div>
            </div>
        </div>
    );
}

function UserStories({ stories = [], productName, openModal, epicTitle }) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            initializeUserStoryNavigation(containerRef.current);
        }
    }, [stories]);

    const handleExpandClick = useExpandHandler(openModal);

    return (
        <div className="epic-section epic-user-stories" ref={containerRef}>
            <div className="overlay"></div>
            <button
                className="expand-modal expand-modal-us"
                onClick={() =>
                    handleExpandClick(
                        productName,
                        epicTitle,
                        "Histórias de usuário",
                        "userStories",
                        `epic-user-stories-content-${productName}`
                    )
                }
            >
                <RiExpandDiagonalLine />
            </button>

            <div id={`epic-user-stories-content-${productName}`} className="epic-user-stories-container">
                <h3 className="epic-section-title">User Stories</h3>
                <div className="epic-buttons-container">
                    {stories.length > 0 ? (
                        stories.map((story, index) => (
                            <button key={index} className={`btn epic-button btn-${productName}`}>
                                US{story.numero}
                            </button>
                        ))
                    ) : (
                        <p>Nenhuma história de usuário disponível.</p>
                    )}
                </div>

                {stories.map((story, index) => (
                    <div
                        key={index}
                        className="epic-us-container epic-expand-container user-story-details"
                    >
                        <div className="user-story-content">
                            <div className="user-story-header">
                                <h4 className="user-story-title">
                                    {story.titulo || "Título não disponível"}
                                </h4>
                                <p className="user-story-description">
                                    {story.user_storie || "Descrição não disponível"}
                                </p>
                            </div>
                            <div className="user-story-criteria">
                                <h4 className="user-story-title">Critérios de aceitação</h4>
                                <ol className="criteria-list">
                                    {(story.criterios_de_aceitacao || []).map((criteria, i) => (
                                        <li key={i}>{criteria}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DefinitionOfDone({ doneCriteria, productName, openModal, epicTitle }) {
    const handleExpandClick = useExpandHandler(openModal);

    return (
        <div className="epic-section epic-definition-of-done">
            <div className="overlay"></div>
            <button className="expand-modal expand-modal-dod"
                onClick={() => handleExpandClick(productName, epicTitle, "Definição de pronto", "definitionOfDone", `epic-dod-content-${productName}`)}>
                <RiExpandDiagonalLine />
            </button>

            <div id={`epic-dod-content-${productName}`}>
                <h3 className='epic-section-title'>Definição de pronto</h3>
                <div className='dod-details epic-expand-container'>
                    <ul>
                        {(doneCriteria || []).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Metrics({ metrics, productName }) {
    return (
        <div className="epic-section epic-metrics">
            <div id='epic-metrics-content' className="epic-metrics-container">
                <h3 className='epic-section-title'>Métricas e KPIs</h3>
                <div className='metrics-container'>
                    {(metrics || []).map((metric, index) => (
                        <div key={index} className='metric-item'>
                            <div className={`metric-value-container metric-value-container-${productName}`}>
                                <span className='metric-value-block'>
                                    <span className='metric-value metric-value-element'>+</span>
                                    <p className='metric-value'>{metric.valor || "Valor não disponível"}</p>
                                </span>
                            </div>
                            <h5 className='metric-title'>{metric.titulo || "Título não disponível"}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function EpicDetailsSection({ productName, epicId, epicTitle }) {
    const [currentBlock, setCurrentBlock] = useState(0);
    const data = useEpicDetails(productName);

    const previousButtonRef = useRef(null);
    const nextButtonRef = useRef(null);
    const navItemsRef = useRef([]);
    const { isOpen, modalData, openModal, closeModal } = useModal();

    const currentEpic = data.find(epic => epic.identificador === epicId);

    useLayoutEffect(() => {
        const navElements = document.querySelectorAll('.block-elements-nav');
        navItemsRef.current = Array.from(navElements);

        if (previousButtonRef.current && nextButtonRef.current && navItemsRef.current.length > 0) {
            initializeNavigation(previousButtonRef.current, nextButtonRef.current, navItemsRef.current, currentBlock, currentEpic);
        }
    }, [data, currentBlock, currentEpic]);

    if (!data || data.length === 0) {
        return <div>Carregando épicos...</div>;
    }

    if (!currentEpic) {
        return <div>Épico não encontrado.</div>;
    }

    const handleNextBlock = () => {
        if (currentBlock < 3) {
            setCurrentBlock(currentBlock + 1);
        }
    };

    const handlePreviousBlock = () => {
        if (currentBlock > 0) {
            setCurrentBlock(currentBlock - 1);
        }
    };

    return (
        <div id={`${currentEpic.identificador}`} className='epic-details-container'>
            <div className="block-elements-navigation navigation-controls">
                <span className="nav-icon nav-previous" ref={previousButtonRef} onClick={handlePreviousBlock}>
                    <GrPrevious />
                </span>
                <span className="nav-icon nav-next" ref={nextButtonRef} onClick={handleNextBlock}>
                    <GrNext />
                </span>
            </div>

            <div id='block-elements'>
                <div className={`block-elements-nav ${currentBlock === 0 ? '' : 'hide'}`}>
                    <EpicContext context={currentEpic.contexto} />
                </div>
                <div className={`block-elements-nav ${currentBlock === 1 ? '' : 'hide'}`}>
                    <UserStories stories={currentEpic.historias_de_usuario} productName={productName} epicTitle={epicTitle} openModal={openModal} />
                </div>
                <div className={`block-elements-nav ${currentBlock === 2 ? '' : 'hide'}`}>
                    <DefinitionOfDone doneCriteria={currentEpic.criterios_de_aceitacao} productName={productName} epicTitle={epicTitle} openModal={openModal} />
                </div>
                <div className={`block-elements-nav ${currentBlock === 3 ? '' : 'hide'}`}>
                    <Metrics metrics={currentEpic.metricas} productName={productName} />
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                productName={productName}
                epicTitle={epicTitle}
                title={modalData.title}
                contentType={modalData.contentType}
                contentData={modalData.contentData}
            />
        </div>
    );
}

export default EpicDetailsSection;
