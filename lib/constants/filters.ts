export const fuelTypeOptions = [
  "ESSENCE",
  "DIESEL",
  "ELECTRIQUE",
  "HYBRIDE",
] as const;
export type FuelType = (typeof fuelTypeOptions)[number];

export const categoryOptions = [
  "ÉCONOMIQUE",
  "SUV",
  "BERLINE",
  "UTILITAIRE",
] as const;
export type Category = (typeof categoryOptions)[number];

export const transmissionOptions = ["MANUELLE", "AUTOMATIQUE"] as const;
export type Transmission = (typeof transmissionOptions)[number];

export const fuelTypeLabels: Record<FuelType, string> = {
  ESSENCE: "Essence",
  DIESEL: "Diesel",
  ELECTRIQUE: "Électrique",
  HYBRIDE: "Hybride",
};

export const categoryLabels: Record<Category, string> = {
  ÉCONOMIQUE: "Économique",
  SUV: "SUV",
  BERLINE: "Berline",
  UTILITAIRE: "Utilitaire",
};

export const transmissionLabels: Record<Transmission, string> = {
  MANUELLE: "Manuelle",
  AUTOMATIQUE: "Automatique",
};
