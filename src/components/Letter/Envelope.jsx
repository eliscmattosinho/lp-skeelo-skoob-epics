import { useState, useRef, useEffect } from "react";
import { envelopeThemes } from "./EnvelopeThemes";
import "./Envelope.scss";

export default function Envelope({ children, theme = "default" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const colors = envelopeThemes[theme] || envelopeThemes.default;

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`envelope-wrapper ${open ? "open" : ""}`}
      style={{
        "--envelope-back": colors.back,
        "--envelope-flap": colors.flap,
        "--envelope-front": colors.front,
      }}
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
