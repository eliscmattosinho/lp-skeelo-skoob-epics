import "./Footer.css";

function Footer() {
    return (
        <footer id="footer-container">
            <div id="footer-content">
                <div className="footer-container">
                    <p className="footer-text">
                        Este projeto foi idealizado a partir da versão Notion:{' '}
                        <a
                            href="https://eliscmattosinho.notion.site/Ecossistema-de-leitura-digital-15432edc5fc5805a8ecfe3447f2d3d0b"
                            className="notion-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ecossistema de Leitura Digital &#40;2025&#41;
                        </a>
                    </p>
                </div>

                <p className="footer-text">Próximo projeto:</p>

                <a
                    id="btn-project"
                    className="btn"
                    href="https://eliscmattosinho.github.io/development-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span>Development Hub</span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
