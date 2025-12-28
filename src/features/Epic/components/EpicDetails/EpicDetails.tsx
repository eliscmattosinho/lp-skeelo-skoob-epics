import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

import { useEpicDetails } from "@/features/Epic/hooks/useEpicDetails";
import { Epic as EpicType, Story } from "@/features/Epic/domain/models";
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

  const stories: Story[] = currentEpic.userStories ?? [];

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
    <EpicOverview key="overview" context={currentEpic.context} />,
    <UserStories
      key="stories"
      stories={stories}
      productName={productName}
      epicTitle={epicTitle}
      openModal={handleOpenModal}
    />,
    <DoD
      key="dod"
      doneCriteria={currentEpic.definitionOfDone}
      productName={productName}
      epicTitle={epicTitle}
      openModal={handleOpenModal}
    />,
    <Metrics
      key="metrics"
      metrics={
        currentEpic.metrics?.map((m) => {
          if (typeof m === "string" || typeof m === "number") return { value: m };
          if (typeof m === "object" && m !== null)
            return m as { value?: string | number; title?: string };
          return { value: undefined };
        }) || []
      }
      productName={productName}
    />,
  ];

  const isFirst = currentBlock === 0;
  const isLast = currentBlock === blocks.length - 1;

  return (
    <div id={currentEpic.epicId} className="details-container">
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
