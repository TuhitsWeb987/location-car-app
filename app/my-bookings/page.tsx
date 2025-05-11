"use client";

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useMyBookings } from "@/lib/hooks/useBookingsQuery";

export default function MyBookingsPage() {
  const { data: bookings, isLoading, error } = useMyBookings();
  console.log(bookings);
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin text-[#F7835A] w-10 h-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Une erreur est survenue lors du chargement de vos réservations.
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Vous n'avez aucune réservation pour le moment.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#003A45] mb-8 text-center">
        Mes réservations
      </h1>

      <div className="space-y-6">
        {bookings.map((booking: any) => (
          <div
            key={booking.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 border-l-4 border-[#A0E9E0]"
          >
            {booking.car?.imageUrls?.[0]?.url && (
              <Image
                src={booking.car.imageUrls[0].url}
                alt={booking.car.brand}
                width={200}
                height={150}
                className="rounded-md object-cover"
              />
            )}

            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-[#003A45]">
                {booking.car.brand} {booking.car.model}
              </h2>
              <p className="text-gray-600">
                {booking.pickupLocation.name} ➔ {booking.returnLocation.name}
              </p>
              <p className="text-sm text-gray-500">
                Du {format(new Date(booking.pickupDate), "dd MMM yyyy HH:mm", { locale: fr })} au {" "}
                {format(new Date(booking.returnDate), "dd MMM yyyy HH:mm", { locale: fr })}
              </p>
              <p className="font-bold text-[#F7835A] text-lg">
                {booking.totalPrice} XPF
              </p>
              <p className="text-sm text-gray-700">
                Statut : <span className="font-medium">{booking.status}</span>
              </p>
            </div>

            <Button variant="outline" className="mt-4 md:mt-0">
              Voir les détails
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
