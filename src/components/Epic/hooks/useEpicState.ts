import { useState } from "react";
import { handleEpicDetails, restoreEpicElements } from "@/js/EpicDinamicDetails";

type Theme = string;
type EpicId = string;

type SelectedEpicsMap = Record<Theme, EpicId | null>;

interface UseEpicStateReturn {
  selectedEpics: SelectedEpicsMap;
  clicked: boolean;
  isEpicVisible: boolean;
  selectedTitle: string;
  showTitle: boolean;
  selectEpic: (epicId: EpicId, epicTitle: string) => void;
  resetEpic: () => void;
}

export function useEpicState(theme: Theme): UseEpicStateReturn {
  const [selectedEpics, setSelectedEpics] = useState<SelectedEpicsMap>({});
  const [clicked, setClicked] = useState<boolean>(false);
  const [isEpicVisible, setIsEpicVisible] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const selectEpic = (epicId: EpicId, epicTitle: string): void => {
    const number = epicId.replace("epico", "");
    const title = `Épico ${number} - ${epicTitle}`;

    setClicked(true);
    setSelectedEpics(prev => ({ ...prev, [theme]: epicId }));
    setSelectedTitle(title);
    setIsEpicVisible(true);
    setShowTitle(true);

    handleEpicDetails(epicId, theme);
  };

  const resetEpic = (): void => {
    restoreEpicElements(theme);
    setSelectedEpics(prev => ({ ...prev, [theme]: null }));
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
