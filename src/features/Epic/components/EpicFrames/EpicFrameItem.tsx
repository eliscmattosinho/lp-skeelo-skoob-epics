import { MdLockOutline } from "react-icons/md";
import { useHoldSwipeUnlock } from "./useHoldSwipeUnlock";
import { EpicFrame } from "./EpicFrames";

interface EpicFrameItemProps {
  epic: EpicFrame;
  theme: string;
  clicked: boolean;
  selectedEpic: string | null;
  isTouch: boolean;
  onSelect: (id: string, title: string) => void;
}

const EpicFrameItem: React.FC<EpicFrameItemProps> = ({
  epic,
  theme,
  clicked,
  selectedEpic,
  isTouch,
  onSelect,
}) => {
  const { btnRef, bind } = useHoldSwipeUnlock({
    isTouch,
    onUnlock: () =>
      onSelect(epic.identificador, epic.title || epic.titulo_epico || ""),
  });

  return (
    <div
      id={epic.identificador}
      className={`mockup-frame ${clicked && selectedEpic !== epic.identificador ? "hide" : ""
        }`}
    >
      <div className="frame-container">
        <img
          className={`img-frame frame-${theme}`}
          src={epic.image}
          alt={epic.title || epic.titulo_epico}
        />

        <span className={`epic-overlay hide-${theme}-epic`} />
        <span className="cam-point" />

        <h4 className="frame-title">
          {epic.title || epic.titulo_epico}
        </h4>

        <div className="frame-action">
          <button
            ref={btnRef}
            className="btn-unlock"
            type="button"
            {...bind}
            draggable={false}
          >
            <MdLockOutline size={20} />
          </button>

          <span className="swipe-hint">
            {isTouch ? "Hold & swipe up to unlock" : "Click to unlock"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpicFrameItem;
