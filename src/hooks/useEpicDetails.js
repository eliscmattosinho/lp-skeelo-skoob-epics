import { useEffect, useState } from 'react';

export function useEpicDetails(productName, epicId) {
    const [epics, setEpics] = useState([]);
    const [currentEpic, setCurrentEpic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    import.meta.env.BASE_URL + 'epics.json'
                );

                if (!response.ok) {
                    throw new Error('Erro ao carregar o arquivo JSON');
                }

                const data = await response.json();
                const product = data?.[productName];

                if (!product?.epicos?.length) {
                    setEpics([]);
                    setCurrentEpic(null);
                    return;
                }

                const mappedEpics = product.epicos.map(mapEpico);
                setEpics(mappedEpics);

                if (epicId) {
                    const epicFound = mappedEpics.find(
                        epic => epic.identificador === epicId
                    );
                    setCurrentEpic(epicFound || null);
                }
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar os dados do épico.');
                setEpics([]);
                setCurrentEpic(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [productName, epicId]);

    return {
        epics,
        currentEpic,
        isLoading,
        error
    };
}

function mapEpico(epico) {
    return {
        identificador: epico.identificador || 'Sem identificador',
        titulo_epico: epico.titulo_epico || 'Título não disponível',
        contexto: epico.contexto || 'Contexto não disponível',
        historias_de_usuario: tratarHistorias(epico.historias_de_usuario),
        criterios_de_aceitacao: epico.criterios_de_aceitacao || [],
        definicao_de_pronto: epico.definicao_de_pronto || [],
        metricas: epico.metricas || []
    };
}

function tratarHistorias(historias) {
    if (!Array.isArray(historias)) return [];

    return historias.flatMap(historia =>
        Object.values(historia).flatMap(valor =>
            Array.isArray(valor) ? valor.map(mapHistoria) : []
        )
    );
}

function mapHistoria(us) {
    return {
        titulo: us.titulo || 'Título não disponível',
        numero: us.numero || '-',
        user_storie: us.user_storie || 'Sem descrição',
        criterios_de_aceitacao: us.criterios_de_aceitacao || []
    };
}
