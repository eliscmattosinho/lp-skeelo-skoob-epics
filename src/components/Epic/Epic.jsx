import { IoIosCloseCircleOutline } from "react-icons/io";

import EpicHeader from "./components/EpicHeader/EpicHeader";
import Range from "@/components/Range/Range";

import EpicFrames from "./components/EpicFrames/EpicFrames";
import EpicDetails from "@/components/EpicDetails/EpicDetails";

import { useEpicState } from "./hooks/useEpicState";
import { useEpicDrag } from "./hooks/useEpicDrag";

import "./Epic.css";

function Epic(props) {
    const { theme, rangeItems, epics } = props;
    const epic = useEpicState(theme);
    const drag = useEpicDrag();

    return (
        <article id={theme} className="article-content">
            <div className="epic-content-mockups">
                <EpicHeader {...props} />

                <Range
                    items={rangeItems}
                    theme={theme}
                    speed={1.8}
                />

                <div className={`epic-section-mockups ${theme}`}>
                    {epic.isEpicVisible && (
                        <span className="btn-close" onClick={epic.resetEpic}>
                            <IoIosCloseCircleOutline />
                        </span>
                    )}

                    {epic.showTitle && (
                        <h2 className="epic-title epic-section-title">
                            {epic.selectedTitle}
                        </h2>
                    )}

                    <div ref={drag.containerRef} className="mockups-stack drag-scroll">
                        <div ref={drag.framesRef} className={`frames-block ${theme}`}>
                            <EpicFrames
                                epics={epics}
                                theme={theme}
                                clicked={epic.clicked}
                                selectedEpic={epic.selectedEpics[theme]}
                                onSelect={epic.selectEpic}
                            />
                        </div>

                        <div className={`block-elements-details ${epic.isEpicVisible ? "" : "hide"}`}>
                            {epic.selectedEpics[theme] && (
                                <EpicDetails
                                    productName={theme}
                                    epicId={epic.selectedEpics[theme]}
                                    epicTitle={epic.selectedTitle}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Epic;
