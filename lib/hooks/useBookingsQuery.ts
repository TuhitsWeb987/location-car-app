import { useQuery } from "@tanstack/react-query";

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings/my");
      if (!res.ok)
        throw new Error(
          "Erreur lors du chargement des réservations de l'utilisateur"
        );
      const data = await res.json();
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllBookings = () => {
  return useQuery({
    queryKey: ["AllBookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings");
      if (!res.ok)
        throw new Error("Erreur lors du chargement des réservations");
      const data = await res.json();
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
