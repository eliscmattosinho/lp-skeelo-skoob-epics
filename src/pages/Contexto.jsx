import '../styles/App.css';
import './Contexto.css';

import skoobLogo from '../assets/image-icons/skoob-logo.png';
import skeeloLogo from '../assets/image-icons/skeelo-logo.png';
import pokemonSurprise from '../assets/image-icons/pokemon-surprise.jpg';

function Contexto() {
    return (
        <div id="contexto" className="content-block">
            <div className="context-section content-section">
                <div className="block-context">
                    <div className="grid mobile-section section-content-blocks">
                        <div className="section-content-blocks first-column">
                            <div id="header-block">
                                <h3 className="section-title context-title">Contexto</h3>
                                <h4 className="sub-title">O início</h4>
                            </div>
                            <div>
                                <div className="p-block text-blocks">
                                    <p className="text-indent">Em agosto de 2024, o Skeelo concluiu a aquisição da rede social literária Skoob, que pertencia à Americanas, e a transação foi aprovada pelo Cade. De acordo com declarações oficiais, o valor da negociação foi de aproximadamente R$ 1,5 milhão.</p>
                                    <p className="text-indent">Com a aquisição, o Skeelo anunciou um plano de modernização tecnológica do Skoob, incluindo melhorias na interface do app e o desenvolvimento de uma versão web responsiva, atendendo a sua base de cerca de 11 milhões de usuários cadastrados, dos quais aproximadamente 1,3 milhão são ativos por mês (MAUs).</p>
                                    <p className="text-indent">Até então, os apps e sites das duas marcas continuam operando separadamente, mas integrando progressivamente funcionalidades.</p>
                                </div>
                            </div>
                            <div className="btns-block">
                                <button className="btn btn-skoob btn-twhite" onClick={() => window.open('https://www.skoob.com.br/', '_blank', 'noreferrer')}>Skoob</button>
                                <button className="btn btn-skeelo btn-twhite" onClick={() => window.open('https://skeelo.com/pt/', '_blank', 'noreferrer')}>Skeelo</button>
                                <button className="btn btn-publishenews btn-twhite" onClick={() => window.open('https://www.publishnews.com.br/materias/2024/08/20/skeelo-completa-a-aquisicao-do-skoob-e-quer-atualizar-o-ambiente-da-rede-social', '_blank', 'noreferrer')}>Publishenews</button>
                            </div>
                        </div>

                        <div className="images-block">
                            <div className="img-container"><img className='img' src={skoobLogo} alt="skoob logo"></img></div>
                            <div className="img-container"><img className='img' src={skeeloLogo} alt="skeelo logo"></img></div>
                            <div className="img-container"><img className='img' src={pokemonSurprise} alt="pokemon surprise intro"></img></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Contexto;