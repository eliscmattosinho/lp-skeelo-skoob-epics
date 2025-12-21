import { useEffect, useState } from 'react';

// Função principal do hook
export function useEpicDetails(productName) {
    const [epicData, setEpicData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    import.meta.env.BASE_URL + "epics.json"
                );

                const data = await response.json();
                const product = data[productName];

                if (product?.epicos?.length > 0) {
                    const dadosTratados = product.epicos.map(mapEpico);
                    setEpicData(dadosTratados);
                } else {
                    setEpicData([getDefaultEpicData()]);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setEpicData([getErrorEpicData()]);
            }
        };

        fetchData();
    }, [productName]);

    return epicData;
}

// Função para mapear e tratar os epicos
function mapEpico(epico) {
    return {
        identificador: epico.identificador || "Sem identificador",
        titulo_epico: epico.titulo_epico || "Título não disponível",
        contexto: epico.contexto || "Contexto não disponível",
        historias_de_usuario: tratarHistorias(epico.historias_de_usuario),
        criterios_de_aceitacao: epico.criterios_de_aceitacao || [],
        definicao_de_pronto: epico.definicao_de_pronto || [],
        metricas: epico.metricas || []
    };
}

// Função para tratar as histórias de usuário
function tratarHistorias(historias) {
    if (!Array.isArray(historias)) {
        return [];
    }

    return historias.flatMap(historia =>
        Object.values(historia).flatMap(historiaDaChave =>
            Array.isArray(historiaDaChave) ? historiaDaChave.map(mapHistorias) : []
        )
    );
}

// Função para mapear histórias de usuário
function mapHistorias(us) {
    return {
        titulo: us.titulo || "Título não disponível",
        numero: us.numero || "-",
        user_storie: us.user_storie || "Sem descrição",
        criterios_de_aceitacao: us.criterios_de_aceitacao || []
    };
}

// Função para dados padrão de um épico
function getDefaultEpicData() {
    return {
        identificador: "Sem identificador",
        titulo_epico: "Título não disponível",
        contexto: "Contexto não disponível",
        historias_de_usuario: [],
        criterios_de_aceitacao: [],
        definicao_de_pronto: [],
        metricas: []
    };
}

// Função para dados de erro
function getErrorEpicData() {
    return {
        identificador: "Erro",
        titulo_epico: "Erro ao carregar os dados",
        contexto: "Não foi possível obter as informações.",
        historias_de_usuario: [],
        criterios_de_aceitacao: [],
        definicao_de_pronto: [],
        metricas: []
    };
}
