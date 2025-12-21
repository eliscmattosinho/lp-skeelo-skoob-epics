import "../styles/App.css";
import "./Elementos.css";
import { IoIosArrowDown } from "react-icons/io";

import epicsImage from '../assets/image-icons/epics-image.svg';
import contextImage from '../assets/image-icons/context-svg.svg';
import usImage from '../assets/image-icons/us-svg.svg';
import metricsImage from '../assets/image-icons/metrics-svg.svg';
import dodImage from '../assets/image-icons/dod-svg.svg';

import { useState, useRef, useEffect } from 'react';

function Elementos() {
    const [expanded, setExpanded] = useState(null);
    const containerRef = useRef(null);

    const toggle = (section) => {
        setExpanded(expanded === section ? null : section);
    };

    // Clique fora da seção
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setExpanded(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id="elementos" className="content-block content-block-elements">
            <div className="section-elements section-content-blocks" ref={containerRef}>
                <div className="epic-block">
                    <img className="epic-image" src={epicsImage} alt="quebra-cabeça" />
                    <div className="epic-content">
                        <h3 className="section-title">Épicos</h3>
                        <p className="p-epic">
                            Em <strong>Product Management</strong>, épicos são grandes iniciativas que agrupam várias user stories relacionadas, organizadas em torno de um <strong>objetivo estratégico</strong>. Eles fornecem uma visão ampla, ajudando a alinhar esforços do time com as <strong>metas do produto</strong> e <strong>do negócio</strong>.
                        </p>
                    </div>
                </div>

                <div className="block-elements content-section">
                    {[
                        { id: "context", title: "Contexto", img: contextImage, text: "Ideia geral do épico." },
                        { id: "us", title: "User Stories", img: usImage, text: "Quebra do épico em histórias de valor." },
                        { id: "metrics", title: "Métricas", img: metricsImage, text: "Principais medidas com impacto esperado." },
                        { id: "dod", title: "DoD", img: dodImage, text: "Critérios para o item ser considerado concluído." }
                    ].map(({ id, title, img, text }) => (
                        <div key={id} className={`element flex-column element-${id}`}>
                            <div className="img-container-elements">
                                <img className="image-element" src={img} alt="" />
                            </div>
                            <div className={`toggle-section ${expanded === id ? 'expanded' : ''}`}>
                                <button className="title-summary" onClick={() => toggle(id)}>
                                    {title}
                                    <IoIosArrowDown className={`icon-toggle ${expanded === id ? 'rotated' : ''}`} />
                                </button>
                                <p className="p-element">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Elementos;
