import React, { useRef, useState } from "react";
import "./UserStories.css";
import ExpandContent from "./ExpandContent";
import { useDrag } from "@/hooks/useDrag";
import { Historia } from "@/hooks/useEpicDetails";
import { ProductName, ContentType } from "@/components/Modal/Modal";

// @TODO: deep link?

interface UserStoriesProps {
  stories?: Historia[];
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
  initialStoryIndex?: number;
}

const UserStories: React.FC<UserStoriesProps> = ({
  stories = [],
  productName,
  epicTitle,
  openModal,
  isModalView = false,
  initialStoryIndex = 0,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(initialStoryIndex);
  const { dragRef } = useDrag();
  const btnRefs = useRef<HTMLButtonElement[]>([]);

  if (!stories.length) {
    return <p>Nenhuma história de usuário disponível.</p>;
  }

  const activeStory = stories[activeStoryIndex];

  const handleSelectStory = (index: number) => {
    setActiveStoryIndex(index);

    const btn = btnRefs.current[index];
    const container = dragRef.current;

    if (!btn || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const isHiddenLeft = btnRect.left < containerRect.left;
    const isHiddenRight = btnRect.right > containerRect.right;

    if (isHiddenLeft || isHiddenRight) {
      container.scrollTo({
        left:
          btn.offsetLeft -
          container.clientWidth / 2 +
          btn.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const buttons = (
    <div ref={dragRef} className="us-btn-group">
      {stories.map((story, index) => (
        <button
          key={story.numero ?? index}
          type="button"
          ref={(el) => {
            if (el) btnRefs.current[index] = el;
          }}
          className={`btn-us btn-us-${productName} ${index === activeStoryIndex ? "active" : ""
            }`}
          onClick={() => handleSelectStory(index)}
        >
          US{story.numero}
        </button>
      ))}
    </div>
  );

  const content = (
    <div className="us-content">
      <div className="us-overview">
        <h4 className="us-title">{activeStory.titulo}</h4>
        <p className="us-description">{activeStory.user_storie}</p>
      </div>

      <div className="us-criteria">
        <h4 className="us-title">Critérios de aceitação</h4>
        <ol className="criteria-list">
          {(activeStory.criterios_de_aceitacao || []).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ol>
      </div>
    </div>
  );

  if (isModalView) {
    return (
      <div className="us-modal-wrapper">
        {buttons}
        {content}
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-content">
        <h3 className="detail-title">Histórias de usuário</h3>

        {buttons}

        {openModal ? (
          <ExpandContent
            productName={productName}
            epicTitle={epicTitle}
            modalTitle="Histórias de usuário"
            modalKey="userStories"
            modalContent={
              <UserStories
                stories={stories}
                productName={productName}
                epicTitle={epicTitle}
                isModalView
                initialStoryIndex={activeStoryIndex}
              />
            }
            openModal={openModal}
          >
            {content}
          </ExpandContent>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default UserStories;
