import { getBooking } from "@/lib/services/booking";
import { stripe } from "@/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    const booking = await getBooking(bookingId);

    if (!booking) {
      return NextResponse.json(
        { error: "Réservation introuvable" },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "XPF",
            product_data: {
              name: `${booking.car.brand} ${booking.car.model}`,
              description: `Du ${new Date(
                booking.pickupDate
              ).toLocaleDateString()} au ${new Date(booking.returnDate)}`,
            },
            unit_amount: Math.round(booking.totalPrice),
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/bookings/${bookingId}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/bookings/${bookingId}/payment`,
      metadata: {
        bookingId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR", error);
    return NextResponse.json({ error: "Erreur Stripe." }, { status: 500 });
  }
}
