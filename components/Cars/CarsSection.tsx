"use client";
import { useAvailableCarsQuery } from "@/lib/hooks/useAvailableCarsQuery";
import { useCarStore } from "@/lib/stores/carStore";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { CarSearchParams } from "@/types/car";
import { LoaderCircle } from "lucide-react";

export default function CarsSection({
  searchParams,
}: {
  searchParams: CarSearchParams;
}) {
  const pickupDateTime = searchParams.pickupDateTime || "";
  const returnDateTime = searchParams.returnDateTime || "";
  const pickupLocation = searchParams.pickupLocation || "";
  const returnLocation = searchParams.returnLocation || "";

  const setFilters = useCarStore((s) => s.setFilters);

  useEffect(() => {
     setFilters({
      pickupDateTime,
      returnDateTime,
      pickupLocation,
      returnLocation,
    });
  }, [pickupDateTime, returnDateTime, setFilters]);

  const { data: cars, isLoading } = useAvailableCarsQuery({
    pickupDateTime,
    returnDateTime,
    pickupLocation,
    returnLocation,
  });

  return (
    <div className="flex-10/12 flex flex-col gap-8 items-start p-4">
      <h1 className="text-4xl font-bold text-center">Voitures disponibles</h1>
      {isLoading ? (
        <div className="text-[#F7835A] flex flex-col items-center gap-2 m-auto">
          <LoaderCircle className="animate-spin" />
          <h2 className="text-3xl">Chargement des voitures...</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-8  items-center justify-center">
          {cars.map((car: any) => (
            <div
              className="bg-white rounded-md shadow-md border-[#A0E9E0] p-4 flex items-center justify-around gap-8 w-full"
              key={car.id}
            >
              {car.imageUrls && (
                <Image
                  src={car.imageUrls[0].url}
                  alt={car.brand}
                  width={200}
                  height={200}
                />
              )}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg">
                  {car.brand} {car.model}
                </h3>
                <div className="flex gap-2">
                  <span className="p-2 bg-[#F7835A] text-white rounded-md">
                    {car.category}
                  </span>
                  <span className="p-2 bg-[#c9ede1]/80 rounded-md">
                    {car.fuelType}
                  </span>
                  <span className="p-2 bg-[#c9ede1]/80 rounded-md">
                    {car.transmission}
                  </span>
                  {car.options.map((opt: any) => (
                    <span className="p-2 bg-[#c9ede1]/80 rounded-md">
                      {opt.name}
                    </span>
                  ))}
                </div>
                <p>Agence: {car.agency.name}</p>
              </div>
              <div className="flex flex-col gap-4 items-center justify-center">
                <p className="font-bold">{car.pricePerDay} XPF</p>
                <Button className="bg-[#F7835A] text-white">Réserver</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
