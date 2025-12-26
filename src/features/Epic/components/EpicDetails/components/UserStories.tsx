import React, { useRef, useState } from "react";
import "./UserStories.css";
import ExpandContent from "./ExpandContent";
import { useDrag } from "@/hooks/useDrag";
import { Historia } from "@/hooks/useEpicDetails";
import { ProductName, ContentType } from "@/components/Modal/Modal";

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
}

const UserStories: React.FC<UserStoriesProps> = ({
  stories = [],
  productName,
  epicTitle,
  openModal,
  isModalView = false,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const { dragRef } = useDrag();
  const btnRefs = useRef<HTMLButtonElement[]>([]);

  if (!stories.length) return <p>Nenhuma história de usuário disponível.</p>;

  const activeStory = stories[activeStoryIndex];

  const handleSelectStory = (index: number) => {
    setActiveStoryIndex(index);

    const btn = btnRefs.current[index];
    if (btn) {
      btn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const modalContent = (
    <div className="us-content-modal">
      {stories.map((story) => (
        <div key={story.numero} className="user-story-modal">
          <h4>{story.titulo}</h4>
          <p>{story.user_storie}</p>
          {story.criterios_de_aceitacao?.length > 0 && (
            <ul>
              {story.criterios_de_aceitacao.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  if (isModalView) return modalContent;

  return (
    <div className="detail-container">
      <div className="detail-content">
        <h3 className="detail-title">Histórias de usuário</h3>

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

        {openModal && (
          <ExpandContent
            productName={productName}
            epicTitle={epicTitle}
            modalTitle="Histórias de usuário"
            modalKey="userStories"
            modalContent={modalContent}
            openModal={openModal}
          >
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
          </ExpandContent>
        )}
      </div>
    </div>
  );
};

export default UserStories;
