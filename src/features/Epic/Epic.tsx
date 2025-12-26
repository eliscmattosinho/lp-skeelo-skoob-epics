import { IoIosCloseCircleOutline } from "react-icons/io";

import EpicHeader from "./components/EpicHeader/EpicHeader";
import Range from "@/components/Range/Range";
import EpicFrames, { EpicFrame } from "./components/EpicFrames/EpicFrames";
import EpicDetails from "@/features/Epic/components/EpicDetails/EpicDetails";

import { useEpicState } from "./hooks/useEpicState";
import { useDrag } from "@/hooks/useDrag";

import { Epic as EpicDomain } from "@/hooks/useEpicDetails";
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

  // Drag desligado somente quando detalhes estão abertos
  const drag = useDrag(!epic.isEpicVisible);

  const epicsWithImage: EpicFrame[] = epics.map((e) => ({
    identificador: e.identificador,
    title: e.titulo_epico,
    titulo_epico: e.titulo_epico,
    image: e.image || "/path/to/default/image.png",
  }));

  const handleSelectEpic = (id: string, title: string) => {
    epic.selectEpic(id, title);
  };

  return (
    <article id={theme} className="article-content">
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

          <div className={`mockup-stack ${epic.isEpicVisible ? "details" : ""}`}>
            <div
              ref={drag.dragRef}
              className={`frame-group ${theme} drag-scroll`}
            >
              <EpicFrames
                epics={epicsWithImage}
                theme={theme}
                clicked={epic.clicked}
                selectedEpic={epic.selectedEpics[theme] || null}
                onSelect={handleSelectEpic}
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
