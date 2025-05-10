import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const strip = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
});

const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function buffer(readable: ReadableStream<Uint8Array>) {
  const chunks = [];
  const reader = readable.getReader();
  let result = await reader.read();

  while (!result.done) {
    chunks.push(result.value);
    result = await reader.read();
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const rawBody = await buffer(req.body!);
  const signature = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error: any) {
    console.error("Webhook signature verificaton failed", error.message);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      try {
        await prisma.rental.update({
          where: {
            id: bookingId,
          },
          data: {
            status: "confirmed",
          },
        });
        console.log(`Réservation ${bookingId} confirmée.`);
      } catch (error) {
        console.error("Erreur de mise à jour de la réservation:", error);
      }
    }
  }

  return new NextResponse("OK", { status: 200 });
}
