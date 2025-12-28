import { useState } from "react";
import { handleEpicDetails, restoreEpicElements } from "@/ts/EpicDinamicDetails";

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

interface DomAccessors {
  getFrame: (theme: Theme, epicId: EpicId) => HTMLDivElement | null;
  getStack: (theme: Theme) => HTMLDivElement | null;
  getDetails: (theme: Theme) => HTMLDivElement | null;
}

export function useEpicState(theme: Theme) {
  const [selectedEpics, setSelectedEpics] = useState<Record<Theme, EpicId | null>>({});
  const [clicked, setClicked] = useState(false);
  const [isEpicVisible, setIsEpicVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showTitle, setShowTitle] = useState(false);

  const selectEpic = (
    epicId: EpicId,
    epicTitle: string,
    dom: DomAccessors,
    enableDrag?: () => void
  ) => {
    setClicked(true);
    setSelectedEpics((p) => ({ ...p, [theme]: epicId }));
    setSelectedTitle(`Épico ${epicId} - ${epicTitle}`);
    setIsEpicVisible(true);
    setShowTitle(true);

    const frame = dom.getFrame(theme, epicId);
    const stack = dom.getStack(theme);
    const details = dom.getDetails(theme);

    if (frame && stack && details) {
      handleEpicDetails(frame, stack, details, theme, epicId, enableDrag);
    }
  };

  const resetEpic = () => {
    const epicId = selectedEpics[theme];

    if (epicId) {
      restoreEpicElements(theme, epicId);
    }

    setSelectedEpics((p) => ({ ...p, [theme]: null }));
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
    resetEpic,
  };
}
