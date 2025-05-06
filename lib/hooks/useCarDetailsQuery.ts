import { Agency, Car, CarImage } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { string } from "zod";

type CarDetails = Car & {
  imageUrls: CarImage[];
  agency: Agency;
  options: {
    id: string;
    name: string;
  }[];
};

export const useCarDetailsQuery = (carId: string) => {
  return useQuery<CarDetails>({
    queryKey: ["carDetails", carId],
    queryFn: async () => {
      const res = await fetch(`/api/cars/${carId}`);
      if (!res.ok) {
        throw new Error("Impossible de récupérer les détails du véhicule");
      }
      const json = await res.json();
      return json.data;
    },
    enabled: !!carId,
    staleTime: 1000 * 60 * 5,
  });
};
