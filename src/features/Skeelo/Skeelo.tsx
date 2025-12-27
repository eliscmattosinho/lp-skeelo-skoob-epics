import { useEffect, useState } from 'react';
import Epic from '@/features/Epic/Epic';
import './Skeelo.css';

import skeeLogo from '@/assets/img/skeelo/skee-icon.svg';
import skeeloMoc from '@/assets/img/skeelo/skeelo-epics.png';

import skeeEpicOne from '@/assets/img/skeelo/epics/skee-epi-1.png';
import skeeEpicTwo from '@/assets/img/skeelo/epics/skee-epi-2.png';
import skeeEpicThree from '@/assets/img/skeelo/epics/skee-epi-3.png';
import skeeEpicFour from '@/assets/img/skeelo/epics/skee-epi-4.png';

import { useEpicDetails } from '@/features/Epic/hooks/useEpicDetails';
import { Epic as EpicDomain } from '@/features/Epic/domain/models';

type EpicWithImage = EpicDomain & {
    image?: string | null;
};

const skeeloDescription: readonly string[] = [
    'O Skeelo é uma empresa que democratiza o acesso aos livros por meio de parcerias com serviços de assinatura.',
    'Permite que os usuários leiam onde e quando quiserem através de seus dispositivos e tem ganhado destaque, marcando participação na Bienal de 2024, que contou com 700 mil pessoas.'
];

const skeeloRangeItems: readonly string[] = [
    'Net Promoter Score',
    'Engajamento',
    'Alcance',
    'Fidelidade',
    'Satisfação'
];

const epicImages: readonly string[] = [
    skeeEpicOne,
    skeeEpicTwo,
    skeeEpicThree,
    skeeEpicFour
];

function Skeelo() {
    const [skeeloEpics, setSkeeloEpics] = useState<EpicWithImage[]>([]);
    const { epics, isLoading } = useEpicDetails('skeelo');

    useEffect(() => {
        if (!epics.length) return;

        const epicsWithImages: EpicWithImage[] = epics.map((epic, index) => ({
            ...epic,
            image: epicImages[index] ?? null
        }));

        setSkeeloEpics(epicsWithImages);
    }, [epics]);

    if (isLoading) {
        return <p>Carregando epics...</p>;
    }

    return (
        <section id="skeelo" className="section-container">
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
