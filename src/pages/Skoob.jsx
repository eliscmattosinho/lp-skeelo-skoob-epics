import { useEffect, useState } from 'react';
import EpicSection from './EpicSection.jsx';
import './Skoob.css';
import skoobLogo from '../assets/image-icons/skoob-icon.png';
import skeeloMoc from '../assets/image-icons/skoob-epics.png';
import skoobEpicOne from '../assets/image-icons/skoob-epi-1.png';
import skoobEpicTwo from '../assets/image-icons/skoob-epi-2.png';
import skoobEpicThree from '../assets/image-icons/skoob-epi-3.png';

import { useEpicDetails } from '../hooks/useEpicDetails.js';

const skoobDescription = [
    "O Skoob é uma rede social literária com funcionalidades de gerenciamento de leituras que permite aos leitores compartilharem opiniões e descobrir novos livros."
];

const skoobRangeItems = ["Net Promoter Score", "Engajamento", "Alcance", "Fidelidade", "Satisfação"];

const epicImages = [skoobEpicOne, skoobEpicTwo, skoobEpicThree];

function Skoob() {
    const [skoobEpics, setSkoobEpics] = useState(null);
    const epicData = useEpicDetails("skoob");

    useEffect(() => {

        if (!epicData || epicData.length === 0) return;

        const epicsWithImages = epicData.map((epic, index) => ({
            ...epic,
            image: epicImages[index] || null
        }));
        
        setSkoobEpics(epicsWithImages);
    }, [epicData]);

    if (skoobEpics === null) {
        return <p>Carregando epics...</p>;
    }

    return (
        <EpicSection
            logo={skoobLogo}
            title="Skoob"
            description={skoobDescription}
            mocImage={skeeloMoc}
            rangeItems={skoobRangeItems}
            epics={skoobEpics}
            theme="skoob"
        />
    );
}

export default Skoob;
