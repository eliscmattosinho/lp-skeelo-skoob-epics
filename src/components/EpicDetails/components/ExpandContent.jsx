import React from "react";
import { RiExpandDiagonalLine } from "react-icons/ri";
import useExpandHandler from "@/hooks/useExpandHandler";
import "./ExpandContent.css";

function ExpandContent({
    productName,
    epicTitle,
    modalTitle,
    modalKey,
    modalContent,
    children,
    openModal
}) {
    const handleExpandClick = useExpandHandler(openModal);

    return (
        <div className="expand-wrapper">
            <button
                type="button"
                className="expand-modal"
                onClick={() =>
                    handleExpandClick(
                        productName,
                        epicTitle,
                        modalTitle,
                        modalKey,
                        modalContent
                    )
                }
            >
                <RiExpandDiagonalLine size={12} />
            </button>

            <div className="expand-container">
                {children}
            </div>
        </div>
    );
}

export default ExpandContent;
