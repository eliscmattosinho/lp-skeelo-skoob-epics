import { useCallback } from 'react';

const useExpandHandler = (openModal) => {
    return useCallback(
        (productName, epicTitle, title, contentType, contentNode) => {
            openModal(
                productName,
                epicTitle,
                title,
                contentType,
                contentNode
            );
        },
        [openModal]
    );
};

export default useExpandHandler;
