import React, { ReactNode } from "react";
import { RiExpandDiagonalLine } from "react-icons/ri";
import useExpandHandler from "@/hooks/useExpandHandler";
import { ProductName, ContentType } from "@/components/Modal/Modal";
import "./ExpandContent.css";

interface ExpandContentProps {
  productName: ProductName;
  epicTitle: string;
  modalTitle: string;
  modalKey: ContentType;
  modalContent: ReactNode;
  children: ReactNode;
  openModal: (
    productName: ProductName,
    epicTitle: string,
    title: string,
    contentType: ContentType,
    contentNode: ReactNode
  ) => void;
}

const ExpandContent: React.FC<ExpandContentProps> = ({
  productName,
  epicTitle,
  modalTitle,
  modalKey,
  modalContent,
  children,
  openModal,
}) => {
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

      <div className="expand-container">{children}</div>
    </div>
  );
};

export default ExpandContent;
