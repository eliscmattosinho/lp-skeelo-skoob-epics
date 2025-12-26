import React from "react";

import ExpandContent from "./ExpandContent";

function DoD({ doneCriteria, productName, openModal, epicTitle }) {
    return (
        <div className="detail-container epic-definition-of-done">
            <div className="detail-content">
                <h3 className="detail-title">Definição de pronto</h3>

                <ExpandContent
                    productName={productName}
                    epicTitle={epicTitle}
                    modalTitle="Definição de pronto"
                    modalKey="definitionOfDone"
                    openModal={openModal}
                    modalContent={
                        <DoD
                            doneCriteria={doneCriteria}
                            productName={productName}
                        />
                    }
                >
                    <div className="dod-content">
                        <ol>
                            {(doneCriteria || []).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ol>
                    </div>
                </ExpandContent>
            </div>
        </div>
    );
}

export default DoD;
