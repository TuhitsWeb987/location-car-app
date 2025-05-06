"use client";

import { useCarDetailsQuery } from "@/lib/hooks/useCarDetailsQuery";
import Image from "next/image";

export const CarsDetailsSection = ({
  params,
}: {
  params: { carId: string };
}) => {
  const { data: car, isLoading, error } = useCarDetailsQuery(params.carId);

  if (isLoading) return <p className="text-gray-500">Chargement en cours...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;
  if (!car) return <p className="text-gray-600">Aucune donnée trouvée.</p>;

  return (
    <div className="flex-1/3 flex flex-col items-center justify-around bg-white rounded-xl shadow-md p-8">
      <div className="relative">
        <Image
          src={car.imageUrls[0].url}
          alt=""
          className="rounded-lg"
          width={400}
          height={700}
        />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <h3 className="text-lg font-bold">
          {car.brand} {car.model}
        </h3>
        <div className="flex gap-2">
          <span className="p-2 bg-[#F7835A] text-white rounded-md">
            {car.category}
          </span>
          <span className="p-2 bg-[#c9ede1]/80 rounded-md">{car.fuelType}</span>
          <span className="p-2 bg-[#c9ede1]/80 rounded-md">
            {car.transmission}
          </span>
        </div>
      </div>
        <h3 className="text-2xl font-bold text-[#003A45]">
            {car.pricePerDay} XPF / jour
        </h3>
    </div>
  );
};
