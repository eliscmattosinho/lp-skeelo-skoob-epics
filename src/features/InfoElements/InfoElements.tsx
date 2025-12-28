import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import epicsImage from '@/assets/img/pieces.svg';
import contextImage from '@/assets/img/elements/context.svg';
import usImage from '@/assets/img/elements/us.svg';
import metricsImage from '@/assets/img/elements/metrics.svg';
import dodImage from '@/assets/img/elements/dod.svg';

import './InfoElements.css';

interface InfoElementItem {
  id: string;
  title: string;
  img: string;
  text: string;
}

const items: readonly InfoElementItem[] = [
  { id: 'context', title: 'Contexto', img: contextImage, text: 'Ideia geral do épico.' },
  { id: 'us', title: 'User Stories', img: usImage, text: 'Quebra do épico em histórias de valor.' },
  { id: 'metrics', title: 'Métricas', img: metricsImage, text: 'Principais medidas com impacto esperado.' },
  { id: 'dod', title: 'DoD', img: dodImage, text: 'A definição de pronto reúne critérios para um item ser considerado concluído.' },
];

export default function InfoElements() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggle = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section id="elements" className="section-bg">
      <div ref={containerRef} className="article-content">
        <article className="element-container">
          <img className="element-img" src={epicsImage} alt="Ilustração representando épicos" />

          <div className="element-content">
            <h2 className="section-title">Épicos</h2>
            <p className="indent">
              Em <i><span className="w-600">Product Management</span></i>, <span className="w-600">Épicos</span> são grandes iniciativas que agrupam várias <i><span className="w-600">User Stories</span></i> relacionadas, organizadas em torno de um <span className="w-600">objetivo estratégico</span>. Eles fornecem uma visão ampla, ajudando a alinhar esforços do time com as <span className="w-600">metas do produto</span> e <span className="w-600">do negócio</span>.
            </p>
          </div>
        </article>

        <section className="element-group">
          {items.map(({ id, title, img, text }) => {
            const isOpen = expanded === id;

            return (
              <article key={id} className={`element element-${id} ${isOpen ? 'active' : ''}`}>
                <figure className="img-container-elements">
                  <img src={img} alt={title} />
                </figure>

                <button type="button" className="title-summary" aria-expanded={isOpen} onClick={() => toggle(id)}>
                  <h3 className="element-title">{title}</h3>
                  <IoIosArrowDown className={`icon-toggle ${isOpen ? 'rotated' : ''}`} />
                </button>

                <p className={`element-text ${isOpen ? 'expanded' : ''}`}>{text}</p>
              </article>
            );
          })}
        </section>
      </div>
    </section>
  );
}
