import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await prisma.car.findMany({
      distinct: ["brand"],
      select: { brand: true },
    });

    const agencies = await prisma.agency.findMany({
      select: { id: true, name: true },
    });

    const options = await prisma.carOption.findMany({
      distinct: ["name"],
      select: { name: true },
    });

    return NextResponse.json({
      brands: brands.map((b) => b.brand),
      agencies,
      options: options.map((o) => o.name),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors du chargement des filtres" },
      { status: 500 }
    );
  }
}
