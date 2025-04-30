"use client";

import { useEffect } from "react";
import { useLocationStore } from "@/lib/stores/locationStore";

export function AppInitializer() {
  const setLocations = useLocationStore((s) => s.setLocations);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("/api/locations");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error("Erreur lors du chargement des lieux", err);
      }
    };

    fetchLocations();
  }, [setLocations]);

  return null;
}
