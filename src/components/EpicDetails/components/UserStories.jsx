import React, { useRef, useState } from "react";

import "./UserStories.css";

import ExpandContent from "./ExpandContent";
import { useEpicDrag } from "@/components/Epic/hooks/useEpicDrag";

function UserStories({ stories = [], productName, openModal, epicTitle }) {
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);
    const { dragRef } = useEpicDrag();

    const btnRefs = useRef([]);

    if (stories.length === 0) {
        return <p>Nenhuma história de usuário disponível.</p>;
    }

    const activeStory = stories[activeStoryIndex];

    const handleSelectStory = (index) => {
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

    return (
        <div className="detail-container">
            <div className="detail-content">
                <h3 className="detail-title">Histórias de usuário</h3>

                <div ref={dragRef} className="us-btn-group">
                    {stories.map((story, index) => (
                        <button
                            ref={(el) => (btnRefs.current[index] = el)}
                            type="button"
                            key={story.numero ?? index}
                            className={`btn-us btn-us-${productName} ${index === activeStoryIndex ? "active" : ""
                                }`}
                            onClick={() => handleSelectStory(index)}
                        >
                            US{story.numero}
                        </button>
                    ))}
                </div>

                <ExpandContent
                    productName={productName}
                    epicTitle={epicTitle}
                    modalTitle="Histórias de usuário"
                    modalKey="userStories"
                    openModal={openModal}
                    modalContent={
                        <UserStories
                            stories={stories}
                            productName={productName}
                            openModal={openModal}
                            epicTitle={epicTitle}
                        />
                    }
                >
                    <div className="us-content">
                        <div className="us-overview">
                            <h4 className="us-title">
                                {activeStory.titulo || "Título não disponível"}
                            </h4>
                            <p className="us-description">
                                {activeStory.user_storie || "Descrição não disponível"}
                            </p>
                        </div>

                        <div className="us-criteria">
                            <h4 className="us-title">Critérios de aceitação</h4>
                            <ol className="criteria-list">
                                {(activeStory.criterios_de_aceitacao || []).map(
                                    (criteria, i) => (
                                        <li key={i}>{criteria}</li>
                                    )
                                )}
                            </ol>
                        </div>
                    </div>
                </ExpandContent>
            </div>
        </div>
    );
}

export default UserStories;
