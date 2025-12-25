import { MdLockOutline } from "react-icons/md";
import { useHoldSwipeUnlock } from "./useHoldSwipeUnlock";
import { useScreen } from "@/context/ScreenContext";

import "./EpicFrames.css";

export default function EpicFrames({
    epics,
    theme,
    clicked,
    selectedEpic,
    onSelect,
}) {
    const { isTouch } = useScreen();

    return epics.map((epic, index) => {
        const { btnRef, bind } = useHoldSwipeUnlock({
            isTouch,
            onUnlock: () =>
                onSelect(
                    epic.identificador,
                    epic.title || epic.titulo_epico
                ),
        });

        return (
            <div
                key={index}
                id={epic.identificador}
                className={`mockup-frame ${clicked && selectedEpic !== epic.identificador
                    ? "hide"
                    : ""
                    }`}
            >
                <div className="frame-container">
                    <img
                        className={`img-frame frame-${theme}`}
                        src={epic.image}
                        alt={epic.title}
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
                            draggable="false"
                        >
                            <MdLockOutline size={20} />
                        </button>

                        <span className="swipe-hint">
                            {isTouch
                                ? "Hold & swipe up to unlock"
                                : "Click to unlock"}
                        </span>
                    </div>
                </div>
            </div>
        );
    });
}
