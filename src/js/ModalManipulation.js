import { useState, useEffect } from 'react';
import { initializeUserStoryNavigation } from '@/js/EpicDinamicElements';

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({
        productName: '',
        title: '',
        contentType: '',
        contentData: []
    });

    useEffect(() => {
        if (isOpen) {
            // Bloquear o scroll fora do modal
            document.body.classList.add('modal-open');
            
            // Garantir que o títlo seja atualizado quando o modal for aberto
            let titleBlock = document.querySelector(".modal-content h3.epic-section-title");
            if (titleBlock) {
                titleBlock.textContent = modalData.epicTitle;
            } else {
                console.log("Título não encontrado:", titleBlock);
            }
        } else {
            document.body.classList.remove('modal-open');
        }

        // Limpeza no efeito para remover a classe quando o componente for desmontado
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen, modalData.epicTitle]);

    const openModal = (productName, epicTitle, title, contentType, contentData) => {
        setModalData({ productName, epicTitle, title, contentType, contentData });
        setIsOpen(true);

        setTimeout(() => {
            initializeUserStoryNavigation();
        }, 100);

        document.querySelectorAll(".overlay").forEach(overlay => overlay.classList.add("open"));
    };

    const closeModal = () => {
        document.querySelectorAll(".overlay").forEach(overlay => overlay.classList.remove("open"));
        setIsOpen(false);
        setModalData({
            productName: '',
            title: '',
            contentType: '',
            contentData: []
        });
    };

    return { isOpen, modalData, openModal, closeModal };
}
