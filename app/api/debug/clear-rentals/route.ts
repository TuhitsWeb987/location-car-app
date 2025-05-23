import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    await prisma.rental.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression des réservations :", error);
    return NextResponse.json({ error: "Échec suppression" }, { status: 500 });
  }
}
