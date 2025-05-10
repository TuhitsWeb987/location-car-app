"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function PaymentPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const router = useRouter();
  const { bookingId } = useParams();

  useEffect(() => {
    const createCheckout = async () => {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        });

        const data = await res.json();

        if (data?.url) {
          router.push(data.url);
        } else {
          console.error("Erreur : Aucune URL Stripe reçue");
          router.push("/error");
        }
      } catch (error) {
        console.error("Erreur lors de la redirection vers Stripe:", error);
        router.push("/error");
      }
    };

    createCheckout();
  }, [bookingId, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFF5E5] text-center px-4">
      <div className="animate-spin mb-4">
        <Loader2 size={48} className="text-[#F7835A]" />
      </div>
      <h1 className="text-2xl font-bold text-[#003A45]">
        Redirection vers le paiement sécurisé...
      </h1>
      <p className="mt-2 text-gray-600">
        Veuillez patienter quelques instants.
      </p>
    </div>
  );
}
  