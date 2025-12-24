import { useRef } from "react";
import { useMagnifier } from "@/hooks/useMagnifier";
import "./EpicHeader.css";

export default function EpicHeader({
    logo,
    title,
    description,
    mocImage,
    theme,
}) {
    const imgRef = useRef(null);

    useMagnifier(imgRef, 2);

    return (
        <header className="product-header">
            <div className="product-about">
                <div className="product-branding">
                    <h2 className={`product-title ${theme}-title`}>{title}</h2>
                    <span className="img-container product-icon">
                        <img src={logo} alt={title} />
                    </span>
                </div>

                <div className="product-description text-group">
                    {description.map((p, i) => (
                        <p key={i} className={`p-${theme}`}>
                            {p}
                        </p>
                    ))}
                </div>
            </div>

            <figure className="img-container img-mockups img-magnifier-container">
                <img
                    ref={imgRef}
                    className="img-mockup"
                    src={mocImage}
                    alt={title}
                />
            </figure>
        </header>
    );
}
