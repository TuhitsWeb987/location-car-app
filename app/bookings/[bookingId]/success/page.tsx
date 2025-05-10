import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage({ params }: { params: { bookingId: string } }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F0FFF4] px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-600">Paiement réussi</h1>
        <p className="text-gray-700 mt-2">
          Votre réservation <span className="font-medium text-[#003A45]">{params.bookingId}</span> a bien été confirmée.
        </p>
        <div className="mt-6 space-y-3">
          <Link
            href={`/my-bookings`}
            className="inline-block w-full bg-[#F7835A] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e8724b]"
          >
            Voir mes réservations
          </Link>
          <Link
            href="/"
            className="inline-block w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
