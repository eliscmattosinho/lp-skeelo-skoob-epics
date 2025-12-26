import { useState } from "react";
import "./Contact.css";

import TypingEffect from "@/js/TypingEffect";
import Envelope from "@/components/Envelope/Envelope";

function Contact() {
    const email = "eliscmattosinho@gmail.com";
    const [copiado, setCopiado] = useState(false);

    const copiarEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        } catch {
            // falha silenciosa
        }
    };

    return (
        <div id="bg-green-bottom">
            <section id="contato" className="section-container">
                <article className="article-content">
                    <div className="title-container">
                        <h2 className="section-title">
                            Contato
                        </h2>
                        <h3 className="subtitle">
                            <TypingEffect
                                text={`Quer saber onde me encontrar? \u{2728}`}
                                speed={60}
                            />
                        </h3>
                    </div>

                    <div className="envelope-group">
                        <Envelope theme="linkedin">
                            <button
                                type="button"
                                className="btn-contact"
                                onClick={() =>
                                    window.open(
                                        "https://www.linkedin.com/in/eliscmattosinho/",
                                        "_blank",
                                        "noreferrer"
                                    )
                                }
                            >
                                LinkedIn
                            </button>
                        </Envelope>

                        <Envelope theme="email">
                            <button
                                type="button"
                                className="btn-contact"
                                onClick={copiarEmail}>
                                {copiado ? "Copiado!" : "E-mail"}
                            </button>
                        </Envelope>

                        <Envelope theme="github">
                            <button
                                type="button"
                                className="btn-contact"
                                onClick={() =>
                                    window.open(
                                        "https://github.com/eliscmattosinho",
                                        "_blank",
                                        "noreferrer"
                                    )
                                }
                            >
                                GitHub
                            </button>
                        </Envelope>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default Contact;
