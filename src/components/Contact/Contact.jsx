import { useState } from "react";
import "./Contact.css";

import contactCardBlue from '@/assets/image-icons/contact-card-blue.svg';
import contactCardRed from '@/assets/image-icons/contact-card-red.svg';
import contactCardDark from '@/assets/image-icons/contact-card.svg';

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
        <div id="bg-cgreen" className="content-block">
            <div id="contato" className="content">
                <div className="content-blocks">
                    <div className="block-title">
                        <div className='contact-block'>
                            <h3 className="section-title">Contato</h3>
                            <h4 className="sub-title">Quer saber onde me encontrar?</h4>
                        </div>
                    </div>

                    <div className="contact-card-block">
                        <div className="block-contact">
                            <p className="p-contact">
                                <a
                                    href="https://www.linkedin.com/in/eliscmattosinho/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </p>
                            <img className="img-contact" src={contactCardBlue} alt="" />
                        </div>

                        <div className="block-contact">
                            <p className="p-contact">
                                <button
                                    type="button"
                                    onClick={copiarEmail}
                                    className="email-button"
                                >
                                    {copiado ? "Copiado!" : "E-mail"}
                                </button>
                            </p>
                            <img className="img-contact" src={contactCardRed} alt="" />
                        </div>

                        <div className="block-contact">
                            <p className="p-contact">
                                <a
                                    href="https://github.com/eliscmattosinho"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                            </p>
                            <img className="img-contact" src={contactCardDark} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
