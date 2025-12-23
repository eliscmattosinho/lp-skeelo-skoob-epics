import { contextLinks } from "@/config/contextLinks";
import { contextImages } from "@/config/contextImages";

import "./InfoContext.css";

function Contexto() {
    return (
        <section id="contexto" className="section-container">
            <div className="context-section">
                <article className="article-content">
                    <header className="title-group">
                        <h2 className="section-title">
                            Contexto
                        </h2>
                        <h3 className="subtitle">
                            O início
                        </h3>
                    </header>

                    <div className="text-group">
                        <p>
                            Em <span className="w-600">agosto de 2024</span>, o <span className="w-600">Skeelo</span> concluiu a <span className="w-600">aquisição da rede social literária Skoob</span>, que pertencia à <span className="w-600">Americanas</span>. De acordo com declarações oficiais, o valor da negociação foi de aproximadamente <span className="w-600">R$&#160;1,5&#160;milhão</span>.
                        </p>
                        <p>
                            Com a aquisição, o Skeelo anunciou um <span className="w-600">plano de modernização tecnológica do Skoob</span>, incluindo <span className="w-600">melhorias na interface do aplicativo</span> e o desenvolvimento de uma <span className="w-600">versão web responsiva</span>, atendendo à sua base de cerca de <span className="w-600">11 milhões</span> de usuários cadastrados, dos quais aproximadamente <span className="w-600">1,3 milhão</span> são ativos por mês <abbr title="Monthly Active Users">(MAUs)</abbr>.
                        </p>
                        <p>
                            Até então, as aplicações continuam <span className="w-600">operando separadamente</span>, mas há <span className="w-600">planos de integração</span> entre as plataformas.
                        </p>
                    </div>

                    <div className="btn-group">
                        {contextLinks.map(({ label, url, className }) => (
                            <button
                                key={label}
                                className={`btn ${className}`}
                                onClick={() => window.open(url, "_blank", "noreferrer")}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </article>

                <div className="img-group">
                    {contextImages.map(({ src, className, alt }, index) => (
                        <div className="img-circle-container" key={index}>
                            <img
                                className={`img ${className ?? ""}`}
                                src={src}
                                alt={alt}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Contexto;
