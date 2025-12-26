import React from 'react';

interface EpicOverviewProps {
  context?: string;
}

const EpicOverview: React.FC<EpicOverviewProps> = ({ context }) => {
  return (
    <div className="detail-container epic-overview">
      <div className="detail-content">
        <h3 className="detail-title">Contexto</h3>
        <div className="detail-container-body">
          <p className="epic-overview-text">
            {context ?? "Contexto não disponível"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EpicOverview;
