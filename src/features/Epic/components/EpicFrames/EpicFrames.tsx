import { useScreen } from "@/contexts/ScreenContext";
import EpicFrameItem from "./EpicFrameItem";

import "./EpicFrames.css";

export interface EpicFrame {
  epicId: string;
  title?: string;
  epicTitle?: string;
  image: string;
}

interface EpicFramesProps {
  epics: EpicFrame[];
  theme: string;
  clicked: boolean;
  selectedEpic: string | null;
  onSelect: (id: string, title: string) => void;
  registerEpicRef: (theme: string, epicId: string, el: HTMLDivElement | null) => void;
}

const EpicFrames: React.FC<EpicFramesProps> = ({
  epics,
  theme,
  clicked,
  selectedEpic,
  onSelect,
  registerEpicRef,
}) => {
  const { isTouch } = useScreen();

  return (
    <>
      {epics.map((epic) => (
        <EpicFrameItem
          key={`${theme}-${epic.epicId}`}
          epic={epic}
          theme={theme}
          clicked={clicked}
          selectedEpic={selectedEpic}
          isTouch={isTouch}
          onSelect={onSelect}
          registerEpicRef={registerEpicRef}
        />
      ))}
    </>
  );
};

export default EpicFrames;
