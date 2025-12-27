import React, { useEffect, ReactNode } from "react";
import "./Modal.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

import USSkeelo from "@/assets/modal/us-modal-skeelo.svg";
import DoDSkeelo from "@/assets/modal/dod-modal-skeelo.svg";
import USSkoob from "@/assets/modal/us-modal-skoob.svg";
import DoDSkoob from "@/assets/modal/dod-modal-skoob.svg";

export type ProductName = "skeelo" | "skoob";
export type ContentType = "userStories" | "definitionOfDone";

type ImageMap = Record<ProductName, Partial<Record<ContentType, string>>>;

const imageMap: ImageMap = {
  skeelo: {
    userStories: USSkeelo,
    definitionOfDone: DoDSkeelo,
  },
  skoob: {
    userStories: USSkoob,
    definitionOfDone: DoDSkoob,
  },
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: ProductName;
  epicTitle: string;
  title: string;
  contentType: ContentType;
  contentData: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  productName,
  epicTitle,
  title,
  contentType,
  contentData,
}) => {
  useEffect(() => {
    document.body.classList.toggle("modal-open", isOpen);
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  if (!isOpen) return null;

  const imageSrc = imageMap[productName]?.[contentType];

  return (
    <>
      <div className="overlay open" onClick={onClose} />

      <div className="modal-container open">
        <button
          type="button"
          className="btn-close btn-close-modal"
          onClick={onClose}
        >
          <IoIosCloseCircleOutline size={22} />
        </button>

        <div className="modal-content">
          <div className="modal-header">
            {imageSrc && (
              <div className="img-container modal-img">
                <img className="img-modal" src={imageSrc} alt="" />
              </div>
            )}
            <h2 className="modal-title">{title}</h2>
          </div>

          <h3 className="modal-epic-title">{epicTitle}</h3>

          <div className="modal-inner">{contentData}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
