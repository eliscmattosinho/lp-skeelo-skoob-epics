import { MdLockOutline } from "react-icons/md";

import "./EpicFrames.css"

export default function EpicFrames({
    epics,
    theme,
    clicked,
    selectedEpic,
    onSelect
}) {
    return epics.map((epic, index) => (
        <div
            key={index}
            id={epic.identificador}
            className={`mockup-frame ${
                clicked && selectedEpic !== epic.identificador ? "hide" : ""
            }`}
        >
            <div className="frame-container">
                <img
                    className={`img-frame frame-${theme}`}
                    src={epic.image}
                    alt={epic.title}
                />

                <span className={`hide-epic hide-${theme}-epic`} />
                <span className="cam-point" />

                <div className="frame-action">
                    <h4 className="frame-title">{epic.title || epic.titulo_epico}</h4>
                    <MdLockOutline />
                    <button
                        className="btn btn-unlock"
                        onClick={() =>
                            onSelect(
                                epic.identificador,
                                epic.title || epic.titulo_epico
                            )
                        }
                    >
                        Desbloquear
                    </button>
                </div>
            </div>
        </div>
    ));
}
