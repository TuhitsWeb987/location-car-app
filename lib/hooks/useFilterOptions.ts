import { useQuery } from "@tanstack/react-query";

export const useFilterOptions = () => {
  return useQuery({
    queryKey: ["filterOptions"],
    queryFn: async () => {
      const res = await fetch("/api/filters");
      if (!res.ok) throw new Error("Erreur de chargement des filtres");
      const data = await res.json();
      return data as {
        brands: string[];
        agencies: { id: string; name: string }[];
        options: string[];
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};
