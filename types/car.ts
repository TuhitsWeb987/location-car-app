import { Agency, Car, CarImage, CarOption } from "@prisma/client";

export type CarFilters = {
  brand?: string;
  category?: string;
  agencyId?: string;
  pickupDateTime?: string;
  returnDateTime?: string;
  options?: string[];
  fuelType?: string;
  transmission?: string
  pickupLocation?: string
  returnLocation?: string
};

export type CarWithRelation = Car & {
  agency: Agency;
  carImages: CarImage[];
  options: CarOption[];
};

export type CarSearchParams = {
  pickupDateTime: string;
  returnDateTime: string;
  pickupLocation: string;
  returnLocation: string;
};
