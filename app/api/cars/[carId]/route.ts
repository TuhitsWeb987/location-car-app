import { getCarById } from "@/lib/services/car";

export async function GET(request: Request, context: { params: Promise<{ carId: string }> }) {
  try {
    const params = await context.params;
    const car = await getCarById(params.carId);

    return Response.json(
      {
        success: true,
        data: car,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[API /api/cars] Erreur:", error);
    return Response.json(
      {
        success: false,
        message: "Erreur serveur lors de la récupération du véhicule",
      },
      {
        status: 500,
      }
    );
  }
}
