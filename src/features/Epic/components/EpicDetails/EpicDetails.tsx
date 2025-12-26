import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

import { useEpicDetails, Epic as EpicType, Historia } from "@/hooks/useEpicDetails";
import { useModal } from "@/hooks/useModal";
import Modal, { ProductName, ContentType } from "@/components/Modal/Modal";

import EpicOverview from "./components/EpicOverview";
import UserStories from "./components/UserStories";
import DoD from "./components/DoD";
import Metrics from "./components/Metrics";

import "./EpicDetails.css";

interface EpicDetailsProps {
  productName: ProductName;
  epicId: string;
  epicTitle: string;
}

const EpicDetails: React.FC<EpicDetailsProps> = ({
  productName,
  epicId,
  epicTitle,
}) => {
  const [currentBlock, setCurrentBlock] = useState(0);
  const { currentEpic, isLoading } = useEpicDetails<EpicType>(productName, epicId);
  const { isOpen, modalData, openModal, closeModal } = useModal<ContentType>();

  if (isLoading) return <div>Carregando épicos...</div>;
  if (!currentEpic) return <div>Épico não encontrado.</div>;

  const historias: Historia[] = currentEpic.historias_de_usuario ?? [];

  const handleOpenModal = (
    productName: ProductName,
    epicTitle: string,
    title: string,
    contentType: ContentType,
    contentNode: React.ReactNode
  ) => {
    openModal({
      productName,
      epicTitle,
      title,
      contentType,
      contentData: contentNode,
    });
  };

  const blocks = [
    <EpicOverview key="overview" context={currentEpic.contexto} />,
    <UserStories
      key="stories"
      stories={historias}
      productName={productName}
      epicTitle={epicTitle}
      openModal={handleOpenModal}
    />,
    <DoD
      key="dod"
      doneCriteria={currentEpic.criterios_de_aceitacao}
      productName={productName}
      epicTitle={epicTitle}
      openModal={handleOpenModal}
    />,
    <Metrics
      key="metrics"
      metrics={
        currentEpic.metricas?.map((m) => {
          if (typeof m === "string" || typeof m === "number") return { valor: m };
          if (typeof m === "object" && m !== null)
            return m as { valor?: string | number; titulo?: string };
          return { valor: undefined };
        }) || []
      }
      productName={productName}
    />,
  ];

  const isFirst = currentBlock === 0;
  const isLast = currentBlock === blocks.length - 1;

  return (
    <div id={currentEpic.identificador} className="details-container">
      <div className="details-content">
        <div className="details-nav">
          {blocks[currentBlock]}

          <div className="details-navigation">
            <button
              type="button"
              className={`nav-icon nav-previous ${isFirst ? "hidden" : ""}`}
              disabled={isFirst}
              onClick={() => setCurrentBlock((prev) => Math.max(prev - 1, 0))}
            >
              <GrPrevious />
            </button>

            <button
              type="button"
              className={`nav-icon nav-next ${isLast ? "hidden" : ""}`}
              disabled={isLast}
              onClick={() =>
                setCurrentBlock((prev) =>
                  Math.min(prev + 1, blocks.length - 1)
                )
              }
            >
              <GrNext />
            </button>
          </div>
        </div>
      </div>

      {modalData && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          productName={modalData.productName}
          epicTitle={modalData.epicTitle}
          title={modalData.title}
          contentType={modalData.contentType}
          contentData={modalData.contentData}
        />
      )}
    </div>
  );
};

export default EpicDetails;
