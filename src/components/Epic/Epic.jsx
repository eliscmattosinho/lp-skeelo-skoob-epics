import { IoIosCloseCircleOutline } from "react-icons/io";

import EpicHeader from "./components/EpicHeader/EpicHeader";
import Range from "@/components/Range/Range";

import EpicFrames from "./components/EpicFrames/EpicFrames";
import EpicDetails from "@/components/EpicDetails/EpicDetails";

import { useEpicState } from "./hooks/useEpicState.ts";
import { useEpicDrag } from "./hooks/useEpicDrag.ts";

import "./Epic.css";

function Epic(props) {
    const { theme, rangeItems, epics } = props;
    const epic = useEpicState(theme);
    const drag = useEpicDrag();

    return (
        <article id={theme} className="article-content">
            <div className="epic-product">
                <EpicHeader {...props} />

                <Range
                    items={rangeItems}
                    theme={theme}
                    speed={60}
                />

                <div className={`mockup-group ${theme} ${epic.isEpicVisible ? 'open' : ''}`}>
                    {epic.isEpicVisible && (
                        <div className="btn-container">
                            <button
                                type="button"
                                className="btn-close"
                                onClick={epic.resetEpic}>
                                <IoIosCloseCircleOutline size={25} />
                            </button>
                        </div>
                    )}

                    {epic.showTitle && (
                        <h2 className="epic-title w-600">
                            {epic.selectedTitle}
                        </h2>
                    )}

                    <div className={`mockup-stack ${epic.isEpicVisible ? 'details' : ''}`}>
                        <div ref={drag.dragRef} className={`frame-group ${theme} drag-scroll`}>
                            <EpicFrames
                                epics={epics}
                                theme={theme}
                                clicked={epic.clicked}
                                selectedEpic={epic.selectedEpics[theme]}
                                onSelect={epic.selectEpic}
                            />
                        </div>

                        <div className={`epic-details ${epic.isEpicVisible ? "" : "hide"}`}>
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
