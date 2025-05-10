"use client";

import { CarSearchParams } from "@/types/car";
import { DateTimeBookingSection } from "./DateTimeBookingSection";
import { LocationBookingSection } from "./LocationBookingSection";
import { useCarDetailsQuery } from "@/lib/hooks/useCarDetailsQuery";
import { OptionBookingSection } from "./OptionBookingSection";
import { Button } from "../ui/button";
import { PriceSummarySection } from "./PriceSummarySection";
import { useLocationStore } from "@/lib/stores/locationStore";
import { useState, useMemo } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const BookingDetailsSection = ({
  searchParams,
  params,
}: {
  searchParams: CarSearchParams;
  params: { carId: string };
}) => {
  const { data: car } = useCarDetailsQuery(params.carId);
  const { data: session } = useSession();
  const locations = useLocationStore((s) => s.locations);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const pickupDateTime = useMemo(
    () => searchParams.pickupDateTime || "",
    [searchParams]
  );
  const returnDateTime = useMemo(
    () => searchParams.returnDateTime || "",
    [searchParams]
  );
  const pickupLocation = useMemo(
    () => searchParams.pickupLocation || "",
    [searchParams]
  );
  const returnLocation = useMemo(
    () => searchParams.returnLocation || "",
    [searchParams]
  );

  const pickupLocationName = useMemo(
    () => locations.find((l) => l.id === pickupLocation)?.name || "",
    [locations, pickupLocation]
  );
  const returnLocationName = useMemo(
    () => locations.find((l) => l.id === returnLocation)?.name || "",
    [locations, returnLocation]
  );
  const router = useRouter();

  const handleBooking = async () => {
    if (!car || !session) {
      toast.error(
        "Les informations sur le véhicule et l'utilisateur sont manquantes."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupDate: pickupDateTime,
          returnDate: returnDateTime,
          totalPrice,
          carId: car.id,
          pickupLocationId: pickupLocation,
          returnLocationId: returnLocation,
        }),
      });

      if (!res.ok) throw new Error("Échec de la réservation");
      toast.success("Réservation effectuée avec succès !");

      const { booking } = await res.json();
      router.push(`/bookings/${booking.id}/payment`);
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      toast.error("Erreur lors de la réservation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

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
          location={pickupLocationName}
          name="Lieu de prise du véhicule"
        />
        <LocationBookingSection
          location={returnLocationName}
          name="Lieu de retour du véhicule"
        />
      </div>

      {car?.options && car.options?.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-[#003A45]">Options</h2>
          <div className="grid grid-cols-1 gap-4">
            {car.options.map((option) => (
              <OptionBookingSection name={option.name} key={option.id} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-around items-center gap-6">
        <Button
          onClick={handleBooking}
          disabled={loading}
          className="bg-[#F7835A] text-xl text-white font-semibold p-10 rounded-lg hover:bg-[#E57D57]"
        >
          {loading ? "Réservation en cours..." : "Confirmer la réservation"}
        </Button>

        <PriceSummarySection
          baseRate={car?.pricePerDay || 0}
          pickupDateTime={pickupDateTime}
          returnDateTime={returnDateTime}
          setTotalPrice={setTotalPrice}
        />
      </div>
    </div>
  );
};
