import { CarFilters, CarWithRelation } from "@/types/car";
import { create } from "zustand";

type CarStore = {
  cars: CarWithRelation[];
  filteredCars: CarWithRelation[];
  filters: CarFilters;
  setCars: (cars: CarWithRelation[]) => void;
  setFilters: (filters: CarFilters) => void;
  applyFilters: () => void;
};

export const useCarStore = create<CarStore>((set, get) => ({
  cars: [],
  filteredCars: [],
  filters: {},

  setCars: (cars) => set({ cars, filteredCars: cars }),
  setFilters: (filters) => {
    set({ filters });
    get().applyFilters();
  },

  applyFilters: () => {
    const { filters, cars } = get();
    const filtered = cars.filter((car) => {
      const matchesOptions =
        !filters.options ||
        filters.options.every((opt) =>
          car.options.some(
            (carOpt) => carOpt.name.toLowerCase() === opt.toLowerCase()
          )
        );
      return (
        (!filters.brand ||
          car.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
        (!filters.category || car.category === filters.category) &&
        (!filters.fuelType || car.fuelType === filters.fuelType) &&
        (!filters.agencyId || car.agencyId === filters.agencyId) &&
        matchesOptions
      );
    });

    set({filteredCars: filtered})
  },
}));
