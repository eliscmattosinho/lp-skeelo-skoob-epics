import '../styles/App.css';
import "./Footer.css";


function Footer() {
    return (
        <div id="footer-block">
            <div id="footer-content">
                <div className="footer-container">
                    <p className="p-footer">Todos os direitos reservados.</p>
                    <p className="p-footer">2025</p>
                </div>

                <a id="p-state" className="btn-p-state" href="https://eliscmattosinho.github.io/development-board/" target="_blank" rel="noopener noreferrer">
                    Board de desenvolvimento
                </a>
            </div>
        </div>
    );
}

export default Footer;