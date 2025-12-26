import { useScreen } from "@/contexts/ScreenContext";
import EpicFrameItem from "./EpicFrameItem";

import "./EpicFrames.css";

export interface EpicFrame {
  identificador: string;
  title?: string;
  titulo_epico?: string;
  image: string;
}

interface EpicFramesProps {
  epics: EpicFrame[];
  theme: string;
  clicked: boolean;
  selectedEpic: string | null;
  onSelect: (id: string, title: string) => void;
}

const EpicFrames: React.FC<EpicFramesProps> = ({
  epics,
  theme,
  clicked,
  selectedEpic,
  onSelect,
}) => {
  const { isTouch } = useScreen();

  return (
    <>
      {epics.map((epic) => (
        <EpicFrameItem
          key={epic.identificador}
          epic={epic}
          theme={theme}
          clicked={clicked}
          selectedEpic={selectedEpic}
          isTouch={isTouch}
          onSelect={onSelect}
        />
      ))}
    </>
  );
};

export default EpicFrames;
