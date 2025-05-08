
export default async function PaymentPage({ params }: { params: { bookingId: string } }) {
    const { bookingId } = await params;
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Paiement de la réservation</h1>
        <p>Booking ID : {bookingId}</p>
        {/* Intégration Stripe à venir */}
      </div>
    );
  }
  