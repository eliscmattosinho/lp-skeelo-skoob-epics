import { useEffect, useState } from "react";
import { Epic, EpicsJson } from "@/features/Epic/domain/models";
import { mapEpic } from "@/features/Epic/domain/mappers";

export function useEpicDetails<T = Epic>(
  productName: string,
  epicId?: string
) {
  const [epics, setEpics] = useState<T[]>([]);
  const [currentEpic, setCurrentEpic] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}epics.json`
        );

        if (!response.ok) {
          throw new Error("Failed to load JSON file");
        }

        const data: EpicsJson = await response.json();
        const product = data[productName];

        if (!product?.epics?.length) {
          setEpics([]);
          setCurrentEpic(null);
          return;
        }

        const mappedEpics = product.epics.map(mapEpic) as T[];
        setEpics(mappedEpics);

        if (epicId) {
          setCurrentEpic(
            mappedEpics.find(
              epic => (epic as unknown as Epic).epicId === epicId
            ) ?? null
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load epic data.");
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
