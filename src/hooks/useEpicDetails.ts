import { useEffect, useState } from "react";

export interface Historia {
  titulo: string;
  numero: string;
  user_storie: string;
  criterios_de_aceitacao: string[];
}

export interface Epic {
  identificador: string;
  titulo_epico: string;
  contexto: string;
  historias_de_usuario: Historia[];
  criterios_de_aceitacao: string[];
  definicao_de_pronto: string[];
  metricas: (string | { valor?: string | number; titulo?: string })[];
  image?: string;
}

interface EpicRaw {
  identificador?: string;
  titulo_epico?: string;
  contexto?: string;
  historias_de_usuario?: unknown;
  criterios_de_aceitacao?: string[];
  definicao_de_pronto?: string[];
  metricas?: (string | { valor?: string | number; titulo?: string })[];
  image?: string;
}

interface ProductRaw {
  epicos?: EpicRaw[];
}

type EpicsJson = Record<string, ProductRaw>;

export function useEpicDetails<T = Epic>(productName: string, epicId?: string) {
  const [epics, setEpics] = useState<T[]>([]);
  const [currentEpic, setCurrentEpic] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}epics.json`);
        if (!response.ok) throw new Error("Erro ao carregar o arquivo JSON");

        const data: EpicsJson = await response.json();
        const product = data[productName];

        if (!product?.epicos?.length) {
          setEpics([]);
          setCurrentEpic(null);
          return;
        }

        const mappedEpics = product.epicos.map(mapEpico) as T[];
        setEpics(mappedEpics);

        if (epicId) {
          const epicFound = mappedEpics.find(
            (epic) => (epic as unknown as Epic).identificador === epicId
          );
          setCurrentEpic(epicFound ?? null);
        }
      } catch (err: unknown) {
        console.error(err);
        setError("Erro ao carregar os dados do épico.");
        setEpics([]);
        setCurrentEpic(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productName, epicId]);

  return { epics, currentEpic, isLoading, error };
}

/* Mapeadores */

function mapEpico(epico: EpicRaw): Epic {
  return {
    identificador: epico.identificador ?? "Sem identificador",
    titulo_epico: epico.titulo_epico ?? "Título não disponível",
    contexto: epico.contexto ?? "Contexto não disponível",
    historias_de_usuario: tratarHistorias(epico.historias_de_usuario),
    criterios_de_aceitacao: epico.criterios_de_aceitacao ?? [],
    definicao_de_pronto: epico.definicao_de_pronto ?? [],
    metricas: epico.metricas ?? [],
    image: epico.image ?? "/path/to/default/image.png",
  };
}

function tratarHistorias(historias: unknown): Historia[] {
  if (!Array.isArray(historias)) return [];

  // Flatten cada grupo de histórias (us1, us2...) para o array de Historia
  return historias.flatMap(historiasObj => {
    if (typeof historiasObj !== "object" || historiasObj === null) return [];
    return Object.values(historiasObj as Record<string, Historia[]>).flatMap(usArray =>
      Array.isArray(usArray)
        ? usArray.map(us => mapHistoria(us))
        : []
    );
  });
}

function mapHistoria(us: Partial<Historia>): Historia {
  return {
    titulo: us.titulo ?? "Título não disponível",
    numero: us.numero ?? "-",
    user_storie: us.user_storie ?? "Sem descrição",
    criterios_de_aceitacao: us.criterios_de_aceitacao ?? [],
  };
}

