"use client";
import { CarSearchParams } from "@/types/car";
import { DateTimeBookingSection } from "./DateTimeBookingSection";
import { LocationBookingSection } from "./LocationBookingSection";
import { useCarDetailsQuery } from "@/lib/hooks/useCarDetailsQuery";
import { OptionBookingSection } from "./OptionBookingSection";
import { Button } from "../ui/button";
import { PriceSummarySection } from "./PriceSummarySection";

export const BookingDetailsSection = ({
  searchParams,
  params,
}: {
  searchParams: CarSearchParams;
  params: { carId: string };
}) => {
  const { data: car, isLoading, error } = useCarDetailsQuery(params.carId);
  const pickupDateTime = searchParams.pickupDateTime || "";
  const returnDateTime = searchParams.returnDateTime || "";
  const pickupLocation = searchParams.pickupLocation || "";
  const returnLocation = searchParams.returnLocation || "";
  return (
    <div className="flex-2/3 space-y-6">
      <h2 className="text-3xl font-bold text-[#003A45]">Date et heure</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateTimeBookingSection
          selectedDate={pickupDateTime}
          name="Date de prise du véhicule"
        />
        <DateTimeBookingSection
          selectedDate={returnDateTime}
          name="Date de retour du véhicule"
        />
      </div>

      <h2 className="text-3xl font-bold text-[#003A45]">Lieu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LocationBookingSection
          location={pickupLocation}
          name="Date de prise du véhicule"
        />
        <LocationBookingSection
          location={returnLocation}
          name="Date de retour du véhicule"
        />
      </div>

      {car?.options && car.options.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-[#003A45]">Options</h2>
          <div className="grid grid-cols-1 gap-4">
            {car?.options.map((option: { id: string; name: string }) => (
              <OptionBookingSection name={option.name} key={option.id} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-around items-center gap-6">
        <Button className="bg-[#F7835A] text-xl text-white font-semibold p-10 rounded-lg hover:bg-[#E57D57]">
          Confirmer la réservation
        </Button>
        <PriceSummarySection
          baseRate={car?.pricePerDay || 0}
          pickupDateTime={pickupDateTime}
          returnDateTime={returnDateTime}
        />
      </div>
    </div>
  );
};
