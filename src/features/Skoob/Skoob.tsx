import { useEffect, useState } from 'react';
import EpicComponent from '@/features/Epic/Epic';
import './Skoob.css';

import skoobLogo from '@/assets/images/skoob-logo.svg';
import skeeloMoc from '@/assets/images/skoob-epics.png';

import skoobEpicOne from '@/assets/images/skoob-epi-1.png';
import skoobEpicTwo from '@/assets/images/skoob-epi-2.png';
import skoobEpicThree from '@/assets/images/skoob-epi-3.png';

import { useEpicDetails, Epic } from '@/hooks/useEpicDetails';

type EpicWithImage = Epic & {
  image?: string | null;
};

const skoobDescription: readonly string[] = [
  'O Skoob é uma rede social literária com funcionalidades de gerenciamento de leituras que permite aos leitores compartilharem opiniões e descobrir novos livros.'
];

const skoobRangeItems: readonly string[] = [
  'Net Promoter Score',
  'Engajamento',
  'Alcance',
  'Fidelidade',
  'Satisfação'
];

const epicImages: readonly string[] = [
  skoobEpicOne,
  skoobEpicTwo,
  skoobEpicThree
];

function Skoob() {
  const [skoobEpics, setSkoobEpics] = useState<EpicWithImage[]>([]);
  const { epics, isLoading } = useEpicDetails('skoob');

  useEffect(() => {
    if (!epics.length) return;

    const epicsWithImages: EpicWithImage[] = epics.map((epic, index) => ({
      ...epic,
      image: epicImages[index] ?? null
    }));

    setSkoobEpics(epicsWithImages);
  }, [epics]);

  if (isLoading) {
    return <p>Carregando epics...</p>;
  }

  return (
    <section className="section-container">
      <EpicComponent
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
