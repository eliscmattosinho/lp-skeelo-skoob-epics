import { useState } from 'react';

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({
        productName: '',
        epicTitle: '',
        title: '',
        contentType: '',
        contentData: null
    });

    const openModal = (
        productName,
        epicTitle,
        title,
        contentType,
        contentData
    ) => {
        setModalData({
            productName,
            epicTitle,
            title,
            contentType,
            contentData
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalData({
            productName: '',
            epicTitle: '',
            title: '',
            contentType: '',
            contentData: null
        });
    };

    return { isOpen, modalData, openModal, closeModal };
}
