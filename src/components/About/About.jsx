import "./About.css";

import TypingEffect from "@/js/TypingEffect";

import booksImage from "@/assets/image-icons/books.svg";

function About() {
    return (
        <div id="bg-green-top" className="content-block">
            <section id="sobre" className="content">
                <article className="section-group">
                    <div className="title-container">
                        <h4 className="subtitle">
                            Ecossistema de leitura digital
                        </h4>
                        <h1 className="title">Skeelo-Skoob</h1>
                    </div>

                    <div className="center">
                        <div className="typing-container">
                            <TypingEffect
                                text="A mudança no mercado literário começa aqui."
                                speed={60}
                            />
                        </div>
                        <figure className="img-container">
                            <img
                                src={booksImage}
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
