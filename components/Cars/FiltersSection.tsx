"use client";

import { PickupReturnFilter } from "@/components/Cars/PickupReturnFilter";
import { CheckboxGroup } from "@/components/Cars/CheckboxGroup";
import { useCarStore } from "@/lib/stores/carStore";
import { useFilterOptions } from "@/lib/hooks/useFilterOptions";
import {
  categoryOptions,
  categoryLabels,
  fuelTypeOptions,
  fuelTypeLabels,
  transmissionOptions,
  transmissionLabels,
} from "@/lib/constants/filters";
import { CarSearchParams } from "@/types/car";

export default function FiltersSection({ searchParams }: {searchParams: CarSearchParams}) {

  const { filters, setFilters } = useCarStore();
  const { data } = useFilterOptions();

  const toggleFilter = (key: keyof typeof filters, value: string) => {
    setFilters({
      ...filters,
      [key]: filters[key] === value ? undefined : value,
    });
  };

  const toggleOption = (name: string) => {
    const options = filters.options ?? [];
    const updated = options.includes(name)
      ? options.filter((o) => o !== name)
      : [...options, name];
    setFilters({ ...filters, options: updated });
  };

  return (
    <div className="flex-2/12 flex flex-col gap-4 justify-center">
      <div className="bg-white p-4 rounded-md shadow-md space-y-2">
        <PickupReturnFilter searchParams={searchParams}/>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md space-y-6">
        <CheckboxGroup
          label="Catégories"
          options={categoryOptions.map((type) => ({
            id: type,
            label: categoryLabels[type],
          }))}
          selected={[filters.category ?? ""]}
          onToggle={(val) => toggleFilter("category", val)}
        />
        <CheckboxGroup
          label="Options"
          options={data?.options.map((opt) => ({ id: opt, label: opt })) || []}
          selected={filters.options}
          onToggle={toggleOption}
        />
        <CheckboxGroup
          label="Carburant"
          options={fuelTypeOptions.map((type) => ({
            id: type,
            label: fuelTypeLabels[type],
          }))}
          selected={[filters.fuelType ?? ""]}
          onToggle={(val) => toggleFilter("fuelType", val)}
        />
        <CheckboxGroup
          label="Transmission"
          options={transmissionOptions.map((type) => ({
            id: type,
            label: transmissionLabels[type],
          }))}
          selected={[filters.transmission ?? ""]}
          onToggle={(val) => toggleFilter("transmission", val)}
        />
        <CheckboxGroup
          label="Marques"
          options={
            data?.brands.map((brand) => ({ id: brand, label: brand })) || []
          }
          selected={[filters.brand ?? ""]}
          onToggle={(val) => toggleFilter("brand", val)}
        />
        <CheckboxGroup
          label="Agences"
          options={
            data?.agencies.map((agency) => ({
              id: agency.id,
              label: agency.name,
            })) || []
          }
          selected={[filters.agencyId ?? ""]}
          onToggle={(val) => toggleFilter("agencyId", val)}
        />
      </div>
    </div>
  );
}
