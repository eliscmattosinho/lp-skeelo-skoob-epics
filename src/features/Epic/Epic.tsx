import { IoIosCloseCircleOutline } from "react-icons/io";

import EpicHeader from "./components/EpicHeader/EpicHeader";
import Range from "@/components/Range/Range";
import EpicFrames, { EpicFrame } from "./components/EpicFrames/EpicFrames";
import EpicDetails from "@/features/Epic/components/EpicDetails/EpicDetails";

import { useEpicState } from "./hooks/useEpicState";
import { useEpicRefs } from "./hooks/useEpicRefs";
import { useDrag } from "@/hooks/useDrag";

import { Epic as EpicDomain } from "@/features/Epic/domain/models";
import { ProductName } from "@/components/Modal/Modal";

import "./Epic.css";

interface EpicProps {
  theme: ProductName;
  rangeItems: readonly string[];
  epics: EpicDomain[];
  logo: string;
  title: string;
  description: readonly string[];
  mocImage: string;
}

function Epic({ theme, rangeItems, epics, ...headerProps }: EpicProps) {
  const epic = useEpicState(theme);
  const epicRefs = useEpicRefs();
  const drag = useDrag(!epic.isEpicVisible);

  const epicsWithImage: EpicFrame[] = epics.map((e: EpicDomain) => ({
    epicId: e.epicId,
    title: e.epicTitle,
    epicTitle: e.epicTitle,
    image: e.image || "/path/to/default/image.png",
  }));

  const handleSelectEpic = (id: string, title: string) => {
    epic.selectEpic(id, title, {
      getFrame: epicRefs.getEpicFrame,
      getStack: epicRefs.getStack,
      getDetails: epicRefs.getDetails,
    }, drag.enableDrag);
  };

  return (
    <article className="article-content">
      <div className="epic-product">
        <EpicHeader theme={theme} {...headerProps} />

        <Range items={rangeItems} theme={theme} speed={60} />

        <div className={`mockup-group ${theme} ${epic.isEpicVisible ? "open" : ""}`}>
          {epic.isEpicVisible && (
            <div className="btn-container">
              <button
                type="button"
                className="btn-close"
                onClick={epic.resetEpic}
              >
                <IoIosCloseCircleOutline size={25} />
              </button>
            </div>
          )}

          {epic.showTitle && (
            <h2 className="epic-title w-600">{epic.selectedTitle}</h2>
          )}

          <div
            ref={(el) => epicRefs.registerStackRef(theme, el)}
            className={`mockup-stack ${epic.isEpicVisible ? "details" : ""}`}
          >
            <div ref={drag.dragRef} className={`frame-group ${theme} drag-scroll`}>
              <EpicFrames
                epics={epicsWithImage}
                theme={theme}
                clicked={epic.clicked}
                selectedEpic={epic.selectedEpics[theme] || null}
                onSelect={handleSelectEpic}
                registerEpicRef={epicRefs.registerEpicRef}
              />
            </div>

            <div
              ref={(el) => epicRefs.registerDetailsRef(theme, el)}
              className={`epic-details ${epic.isEpicVisible ? "" : "hide"}`}
            >
              {epic.selectedEpics[theme] && (
                <EpicDetails
                  productName={theme}
                  epicId={epic.selectedEpics[theme]!}
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
