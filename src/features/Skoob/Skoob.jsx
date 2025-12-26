import { useEffect, useState } from 'react';
import Epic from '@/features/Epic/Epic';
import './Skoob.css';

import skoobLogo from '@/assets/images/skoob-logo.svg';
import skeeloMoc from '@/assets/images/skoob-epics.png';

import skoobEpicOne from '@/assets/images/skoob-epi-1.png';
import skoobEpicTwo from '@/assets/images/skoob-epi-2.png';
import skoobEpicThree from '@/assets/images/skoob-epi-3.png';

import { useEpicDetails } from '@/hooks/useEpicDetails';

const skoobDescription = [
    'O Skoob é uma rede social literária com funcionalidades de gerenciamento de leituras que permite aos leitores compartilharem opiniões e descobrir novos livros.'
];

const skoobRangeItems = [
    'Net Promoter Score',
    'Engajamento',
    'Alcance',
    'Fidelidade',
    'Satisfação'
];

const epicImages = [
    skoobEpicOne,
    skoobEpicTwo,
    skoobEpicThree
];

function Skoob() {
    const [skoobEpics, setSkoobEpics] = useState(null);
    const { epics, isLoading } = useEpicDetails('skoob');

    useEffect(() => {
        if (!epics || epics.length === 0) return;

        const epicsWithImages = epics.map((epic, index) => ({
            ...epic,
            image: epicImages[index] || null
        }));

        setSkoobEpics(epicsWithImages);
    }, [epics]);

    if (isLoading || skoobEpics === null) {
        return <p>Carregando epics...</p>;
    }

    return (
        <section className="section-container">
            <Epic
                logo={skoobLogo}
                title="Skoob"
                description={skoobDescription}
                mocImage={skeeloMoc}
                rangeItems={skoobRangeItems}
                epics={skoobEpics}
                theme="skoob"
            />
        </section>
    );
}

export default Skoob;
