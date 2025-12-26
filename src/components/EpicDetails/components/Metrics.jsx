import React from 'react';

import "./Metrics.css"

function Metrics({ metrics, productName }) {
    return (
        <div className="detail-container">
            <div className="detail-content">
                <div className="metric-content">
                    <h3 className="detail-title">Métricas e KPIs esperadas</h3>
                    <div className="metric-container">
                        {(metrics || []).map((metric, index) => (
                            <div key={index} className="metric-item">
                                <div
                                    className={`value-container value-container-${productName}`}
                                >

                                    <p className={`metric-value metric-value-${productName}`}>
                                        +{metric.valor || null}
                                    </p>
                                </div>

                                <h5 className="metric-title">
                                    {metric.titulo || "Título não disponível"}
                                </h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Metrics;
