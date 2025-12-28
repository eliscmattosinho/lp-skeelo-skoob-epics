import React from "react";
import ExpandContent from "./ExpandContent";
import { ProductName, ContentType } from "@/components/Modal/Modal";

interface DoDProps {
  doneCriteria?: string[];
  productName: ProductName;
  epicTitle: string;
  openModal?: (
    productName: ProductName,
    epicTitle: string,
    title: string,
    contentType: ContentType,
    contentNode: React.ReactNode
  ) => void;
  isModalView?: boolean;
}

const DoD: React.FC<DoDProps> = ({
  doneCriteria = [],
  productName,
  epicTitle,
  openModal,
  isModalView = false,
}) => {
  if (!doneCriteria.length) {
    return <p>Não há critérios de pronto.</p>;
  }

  const modalContent = (
    <div className="dod-content-modal">
      <ol>
        {doneCriteria.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );

  if (isModalView) {
    return modalContent;
  }

  return (
    <div className="detail-container epic-definition-of-done">
      <div className="detail-content">
        <h3 className="detail-title">Definição de pronto</h3>

        {openModal && (
          <ExpandContent
            productName={productName}
            epicTitle={epicTitle}
            modalTitle="Definição de pronto"
            modalKey="definitionOfDone"
            modalContent={modalContent}
            openModal={openModal}
          >
            <div className="dod-content">
              <ol>
                {doneCriteria.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
          </ExpandContent>
        )}
      </div>
    </div>
  );
};

export default DoD;
