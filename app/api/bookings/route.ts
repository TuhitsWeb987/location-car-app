// app/api/bookings/route.ts
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  pickupDate: z.string().datetime(),
  returnDate: z.string().datetime(),
  totalPrice: z.number().min(0),
  carId: z.string().min(1),
  pickupLocationId: z.string().min(1),
  returnLocationId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      pickupDate,
      returnDate,
      totalPrice,
      carId,
      pickupLocationId,
      returnLocationId,
    } = parsed.data;

    // Vérifier que la voiture existe
    const carExists = await prisma.car.findUnique({ where: { id: carId } });
    if (!carExists) {
      return NextResponse.json({ error: "Voiture introuvable" }, { status: 404 });
    }

    // Créer la réservation
    const booking = await prisma.rental.create({
      data: {
        pickupDate: new Date(pickupDate),
        returnDate: new Date(returnDate),
        totalPrice,
        status: "pending",
        userId: session.user.id,
        carId,
        pickupLocationId,
        returnLocationId,
      },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Erreur création réservation :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la réservation" },
      { status: 500 }
    );
  }
}
