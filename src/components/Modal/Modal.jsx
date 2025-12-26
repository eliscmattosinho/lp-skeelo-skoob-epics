import React, { useEffect } from 'react';
import './Modal.css';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import USSkeelo from '@/assets/modal/us-modal-skeelo.svg';
import DoDSkeelo from '@/assets/modal/dod-modal-skeelo.svg';
import USSkoob from '@/assets/modal/us-modal-skoob.svg';
import DoDSkoob from '@/assets/modal/dod-modal-skoob.svg';

const imageMap = {
    skeelo: {
        userStories: USSkeelo,
        definitionOfDone: DoDSkeelo
    },
    skoob: {
        userStories: USSkoob,
        definitionOfDone: DoDSkoob
    }
};

function Modal({
    isOpen,
    onClose,
    title,
    productName,
    contentType,
    contentData
}) {
    useEffect(() => {
        document.body.classList.toggle('modal-open', isOpen);
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-container open">
            <span className="btn-close btn-close-modal" onClick={onClose}>
                <IoIosCloseCircleOutline />
            </span>

            <div className="modal-block">
                <div className="modal-header">
                    {imageMap[productName]?.[contentType] && (
                        <img
                            className="modal-image"
                            src={imageMap[productName][contentType]}
                            alt=""
                        />
                    )}
                    <h2 className="modal-title">{title}</h2>
                </div>

                <div className="modal-content">
                    {contentData}
                </div>
            </div>
        </div>
    );
}

export default Modal;
