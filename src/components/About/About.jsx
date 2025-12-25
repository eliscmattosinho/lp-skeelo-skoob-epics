import "./About.css";

import TypingEffect from "@/js/TypingEffect";

import booksImage from "@/assets/images/books.svg";

function About() {
    return (
        <div id="bg-green-top">
            <section id="sobre" className="section-container">
                <article className="article-content">
                    <div className="title-container lp-title">
                        <h3 className="subtitle">
                            Ecossistema de leitura digital
                        </h3>
                        <h1 className="title">
                            <span className="title-gradient">Skeelo-Skoob</span>
                        </h1>
                    </div>

                    <div className="hero-content">
                        <div className="typing-container">
                            <TypingEffect
                                text={`A mudança no mercado literário começa aqui. \u{1F4DA}`}
                                speed={60}
                            />
                        </div>
                        <figure className="img-container">
                            <img
                                src={booksImage}
                                className="books"
                                loading="eager"
                                alt="Ilustração de livros verdes empilhados."
                            />
                        </figure>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default About;
