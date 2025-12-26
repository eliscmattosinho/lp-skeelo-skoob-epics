import { useEffect, useState } from 'react';
import Epic from '@/features/Epic/Epic';
import './Skeelo.css';

import skeeLogo from '@/assets/images/skee-icon.png';
import skeeloMoc from '@/assets/images/skeelo-epics.png';

import skeeEpicOne from '@/assets/images/skee-epi-1.png';
import skeeEpicTwo from '@/assets/images/skee-epi-2.png';
import skeeEpicThree from '@/assets/images/skee-epi-3.png';
import skeeEpicFour from '@/assets/images/skee-epi-4.png';

import { useEpicDetails } from '@/hooks/useEpicDetails';

const skeeloDescription = [
    'O Skeelo é uma empresa que democratiza o acesso aos livros por meio de parcerias com serviços de assinatura.',
    'Permite que os usuários leiam onde e quando quiserem através de seus dispositivos e tem ganhado destaque, marcando participação na Bienal de 2024, que contou com 700 mil pessoas.'
];

const skeeloRangeItems = [
    'Net Promoter Score',
    'Engajamento',
    'Alcance',
    'Fidelidade',
    'Satisfação'
];

const epicImages = [
    skeeEpicOne,
    skeeEpicTwo,
    skeeEpicThree,
    skeeEpicFour
];

function Skeelo() {
    const [skeeloEpics, setSkeeloEpics] = useState(null);
    const { epics, isLoading } = useEpicDetails('skeelo');

    useEffect(() => {
        if (!epics || epics.length === 0) return;

        const epicsWithImages = epics.map((epic, index) => ({
            ...epic,
            image: epicImages[index] || null
        }));

        setSkeeloEpics(epicsWithImages);
    }, [epics]);

    if (isLoading || skeeloEpics === null) {
        return <p>Carregando epics...</p>;
    }

    return (
        <section className="section-container">
            <Epic
                logo={skeeLogo}
                title="Skeelo"
                description={skeeloDescription}
                mocImage={skeeloMoc}
                rangeItems={skeeloRangeItems}
                epics={skeeloEpics}
                theme="skeelo"
            />
        </section>
    );
}

export default Skeelo;
