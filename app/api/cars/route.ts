import { getAvailableCars } from "@/lib/services/car";
import { CarFilters } from "@/types/car";
import { z } from "zod";

const schema = z
  .object({
    pickupDateTime: z.string().datetime(),
    returnDateTime: z.string().datetime(),
    pickupLocation: z.string(),
    returnLocation: z.string(),
  })
  .refine(
    (data) => new Date(data.returnDateTime) > new Date(data.pickupDateTime),
    {
      message: "La date de retour doit être après la date de prise",
      path: ["returnDateTime"],
    }
  );

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      pickupDateTime: searchParams.get("pickupDateTime") || undefined,
      returnDateTime: searchParams.get("returnDateTime") || undefined,
      pickupLocation: searchParams.get("pickupLocation") || undefined,
      returnLocation: searchParams.get("returnLocation") || undefined,
    };

    const validation = schema.safeParse(query);

    if (!validation.success) {
      return Response.json(
        {
          success: false,
          message: "Paramètres invalides",
          errors: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const filters: CarFilters = validation.data;

    const cars = await getAvailableCars(filters);

    return Response.json(
      {
        success: true,
        data: cars,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API /api/cars] Erreur:", error);
    return Response.json(
      {
        success: false,
        message: "Erreur serveur lors de la récupération des voitures",
      },
      { status: 500 }
    );
  }
}
