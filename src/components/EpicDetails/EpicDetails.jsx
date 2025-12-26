import React, { useState } from 'react';
import './EpicDetails.css';

import { GrPrevious, GrNext } from 'react-icons/gr';

import { useEpicDetails } from '@/hooks/useEpicDetails';
import { useModal } from '@/js/ModalManipulation';

import Modal from '@/components/Modal/Modal';

import EpicOverview from './components/EpicOverview';
import UserStories from './components/UserStories';
import DoD from './components/DoD';
import Metrics from './components/Metrics';

function EpicDetails({ productName, epicId, epicTitle }) {
    const [currentBlock, setCurrentBlock] = useState(0);

    const { currentEpic, isLoading } = useEpicDetails(productName, epicId);
    const { isOpen, modalData, openModal, closeModal } = useModal();

    if (isLoading) {
        return <div>Carregando épicos...</div>;
    }

    if (!currentEpic) {
        return <div>Épico não encontrado.</div>;
    }

    const blocks = [
        <EpicOverview key="overview" context={currentEpic.contexto} />,
        (
            <UserStories
                key="stories"
                stories={currentEpic.historias_de_usuario}
                productName={productName}
                epicTitle={epicTitle}
                openModal={openModal}
            />
        ),
        (
            <DoD
                key="dod"
                doneCriteria={currentEpic.criterios_de_aceitacao}
                productName={productName}
                epicTitle={epicTitle}
                openModal={openModal}
            />
        ),
        (
            <Metrics
                key="metrics"
                metrics={currentEpic.metricas}
                productName={productName}
            />
        )
    ];

    const isFirst = currentBlock === 0;
    const isLast = currentBlock === blocks.length - 1;

    return (
        <div
            id={currentEpic.identificador}
            className="details-container"
        >
            <div className="details-content">
                <div className="details-nav">
                    {blocks[currentBlock]}

                    <div className="details-navigation">
                        <button
                            type="button"
                            className={`nav-icon nav-previous ${isFirst ? 'hidden' : ''}`}
                            disabled={isFirst}
                            onClick={() => {
                                if (!isFirst) {
                                    setCurrentBlock(prev => prev - 1);
                                }
                            }}
                        >
                            <GrPrevious />
                        </button>

                        <button
                            type="button"
                            className={`nav-icon nav-next ${isLast ? 'hidden' : ''}`}
                            disabled={isLast}
                            onClick={() => {
                                if (!isLast) {
                                    setCurrentBlock(prev => prev + 1);
                                }
                            }}
                        >
                            <GrNext />
                        </button>
                    </div>
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

export default EpicDetails;
