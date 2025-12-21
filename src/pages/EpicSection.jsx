import React, { useState, useEffect, useRef } from 'react';
import { CiLock } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import './EpicSection.css';
import EpicDetailsSection from "./EpicDetailsSection";
import { handleEpicDetails, restoreEpicElements, addMediaQueryListeners } from "../js/EpicDinamicDetails";
import { initAutoScroll } from "../js/DinamicEpics";

import { enableDragScroll } from "../js/DragScroll";

function EpicSection({ logo, title, description, mocImage, rangeItems, epics, theme }) {
    const [selectedEpics, setSelectedEpics] = useState({});
    const [clicked, setClicked] = useState(false);
    const [isEpicVisible, setIsEpicVisible] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [showTitle, setShowTitle] = useState(false);

    const handleEpicSelection = (epicId, theme, epicTitle) => {
        const epicNumber = epicId.replace('epico', '');
        const formattedTitle = `Épico ${epicNumber} - ${epicTitle}`;

        setClicked(true);
        setSelectedEpics(prevState => ({
            ...prevState,
            [theme]: epicId
        }));
        setSelectedTitle(formattedTitle);
        setIsEpicVisible(true);
        setShowTitle(true);
        handleEpicDetails(epicId, theme);
    };

    const resetEpicState = () => {
        restoreEpicElements(theme, selectedEpics[theme]);
        setSelectedEpics(prevState => ({
            ...prevState,
            [theme]: null
        }));
        setSelectedTitle("");
        setIsEpicVisible(false);
        setClicked(false);
        setShowTitle(false);
    };

    useEffect(() => {
        const handleMediaQueryChange = () => { };
        addMediaQueryListeners(handleMediaQueryChange);
        return () => { };
    }, []);

    useEffect(() => {
        initAutoScroll();
    }, []);

    const framesRef = useRef(null);
    const ref = useRef(null);

    useEffect(() => {
        const removeListeners = enableDragScroll(framesRef.current);
        return () => {
            if (removeListeners) removeListeners();
        };
    }, []);

    useEffect(() => {
        enableDragScroll(ref.current);
    }, []);

    return (
        <div id={`${theme}`} className="content-block">
            <div className="content-section">
                <div className="content epic-content-mockups">
                    <div className="epics-content">
                        <div className="first-col-epic">
                            <div className="epic-block-title">
                                <h2 className={`${theme}-title`}>{title}</h2>
                                <span className="span-image">
                                    <img src={logo} alt={`${title} logo`} />
                                </span>
                            </div>
                            <div className="block-p-epic text-blocks">
                                {description.map((para, index) => (
                                    <p className={`p-${theme} text-indent`} key={index}>{para}</p>
                                ))}
                            </div>
                        </div>
                        <div className="second-col-epic">
                            <img className="imageMoc" src={mocImage} alt={`${title} mockups`} />
                        </div>
                    </div>

                    <div className={`range ${theme}-range`}>
                        {rangeItems.map((item, index) => (
                            <p className={`range-tag`} key={index}>{item}</p>
                        ))}
                    </div>

                    <div className={`epic-section-mockups ${theme}`}>
                        {isEpicVisible && (
                            <span
                                id={`${theme}-close`}
                                className="close-icon invisible"
                                onClick={resetEpicState}
                            >
                                <IoIosCloseCircleOutline />
                            </span>
                        )}

                        {showTitle && <h2 className="epic-title epic-section-title">{selectedTitle}</h2>}

                        <div ref={ref} id={`${theme}`} className="mockups-stack drag-scroll">
                            <div ref={framesRef} className={`frames-block ${theme}`}>
                                {epics.map((epic, index) => (
                                    <div
                                        id={epic.identificador}
                                        className={`mockup-frame ${clicked && selectedEpics[theme] !== epic.identificador ? 'hide' : ''}`}
                                        key={index}
                                    >
                                        <div className="frame-container">
                                            <img
                                                className={`frame-image frame-image-${theme}`}
                                                src={epic.image}
                                                alt={`frame ${epic.title}`}
                                            />

                                            <span className={`hide-epic hide-${theme}-epic`}></span>

                                            <span className="cam-point"></span>

                                            <div className="frame-infos-action">
                                                <h4 className="frame-info-title">{epic.title || epic.titulo_epico}</h4>
                                                <CiLock />
                                                <button
                                                    className="btn go-to-block-frame"
                                                    onClick={() =>
                                                        handleEpicSelection(epic.identificador, theme, epic.title || epic.titulo_epico)
                                                    }
                                                >
                                                    Desbloquear
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div id={`${theme}-elements`} className={`block-elements-details ${isEpicVisible ? '' : 'hide'}`}>
                                {selectedEpics[theme] && (
                                    <EpicDetailsSection
                                        key={selectedEpics[theme]}
                                        productName={theme}
                                        epicId={selectedEpics[theme]}
                                        epicTitle={selectedTitle}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EpicSection;
