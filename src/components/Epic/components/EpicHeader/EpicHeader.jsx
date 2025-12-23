import "./EpicHeader.css"

export default function EpicHeader({ logo, title, description, mocImage, theme }) {
    return (
        <header className="epic-header">
            <div className="epic-about">
                <div className="epic-title-container">
                    <h2 className={`${theme}-title`}>{title}</h2>
                    <span className="title-logo">
                        <img src={logo} alt={`${title}`} />
                    </span>
                </div>

                <div className="epic-description text-group">
                    {description.map((p, i) => (
                        <p key={i} className={`p-${theme}`}>{p}</p>
                    ))}
                </div>
            </div>

            <figure className="group-mockup">
                <img className="mockup-img" src={mocImage} alt={`${title}`} />
            </figure>
        </header>
    );
}
