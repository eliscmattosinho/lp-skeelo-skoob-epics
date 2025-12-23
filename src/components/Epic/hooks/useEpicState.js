import { useState } from "react";
import { handleEpicDetails, restoreEpicElements } from "@/js/EpicDinamicDetails";

export function useEpicState(theme) {
    const [selectedEpics, setSelectedEpics] = useState({});
    const [clicked, setClicked] = useState(false);
    const [isEpicVisible, setIsEpicVisible] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [showTitle, setShowTitle] = useState(false);

    const selectEpic = (epicId, epicTitle) => {
        const number = epicId.replace("epico", "");
        const title = `Épico ${number} - ${epicTitle}`;

        setClicked(true);
        setSelectedEpics(p => ({ ...p, [theme]: epicId }));
        setSelectedTitle(title);
        setIsEpicVisible(true);
        setShowTitle(true);

        handleEpicDetails(epicId, theme);
    };

    const resetEpic = () => {
        restoreEpicElements(theme, selectedEpics[theme]);
        setSelectedEpics(p => ({ ...p, [theme]: null }));
        setSelectedTitle("");
        setIsEpicVisible(false);
        setClicked(false);
        setShowTitle(false);
    };

    return {
        selectedEpics,
        clicked,
        isEpicVisible,
        selectedTitle,
        showTitle,
        selectEpic,
        resetEpic
    };
}
