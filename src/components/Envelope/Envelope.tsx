import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import { envelopeThemes } from "./EnvelopeThemes";
import "./Envelope.scss";

type ThemeName = keyof typeof envelopeThemes;

type EnvelopeProps = {
  children: ReactNode;
  theme?: ThemeName;
};

export default function Envelope({
  children,
  theme = "default",
}: EnvelopeProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const colors = envelopeThemes[theme];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const style: CSSProperties = {
    "--envelope-back": colors.back,
    "--envelope-flap": colors.flap,
    "--envelope-front": colors.front,
  } as CSSProperties;

  return (
    <div
      ref={wrapperRef}
      className={`envelope-wrapper ${open ? "open" : ""}`}
      style={style}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="envelope">
        <div className="back" />
        <div className="paper">{children}</div>
        <div className="flap" />
        <div className="front" />
      </div>
    </div>
  );
}
