import { useEffect, useState } from 'react';
import EpicSection from './EpicSection.jsx';
import './Skeelo.css';

import skeeLogo from '../assets/image-icons/skee-icon.png';
import skeeloMoc from '../assets/image-icons/skeelo-epics.png';
import skeeEpicOne from '../assets/image-icons/skee-epi-1.png';
import skeeEpicTwo from '../assets/image-icons/skee-epi-2.png';
import skeeEpicThree from '../assets/image-icons/skee-epi-3.png';
import skeeEpicFour from '../assets/image-icons/skee-epi-4.png';

import { useEpicDetails } from '../hooks/useEpicDetails.js';

const skeeloDescription = [
    "O Skeelo é uma empresa que democratiza o acesso aos livros por meio de parcerias com serviços de assinatura.",
    "Permite que os usuários leiam onde e quando quiserem através de seus dispositivos e tem ganhado destaque, marcando participação na Bienal de 2024, que contou com 700 mil pessoas."
];

const skeeloRangeItems = ["Net Promoter Score", "Engajamento", "Alcance", "Fidelidade", "Satisfação"];

const epicImages = [skeeEpicOne, skeeEpicTwo, skeeEpicThree, skeeEpicFour];

function Skeelo() {
    const [skeeloEpics, setSkeeloEpics] = useState(null);
    const epicData = useEpicDetails("skeelo");

    useEffect(() => {

        if (!epicData || epicData.length === 0) return;

        const epicsWithImages = epicData.map((epic, index) => ({
            ...epic,
            image: epicImages[index] || null
        }));
        
        setSkeeloEpics(epicsWithImages);
    }, [epicData]);

    if (skeeloEpics === null) {
        return <p>Carregando epics...</p>;
    }

    return (
        <EpicSection
            logo={skeeLogo}
            title="Skeelo"
            description={skeeloDescription}
            mocImage={skeeloMoc}
            rangeItems={skeeloRangeItems}
            epics={skeeloEpics}
            theme="skeelo"
        />
    );
}

export default Skeelo;
