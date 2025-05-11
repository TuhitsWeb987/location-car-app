import { auth } from "@/lib/auth";
import { getBookingUser } from "@/lib/services/booking";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const bookings = await getBookingUser(session.user.id);
    console.log("data", bookings)
    return Response.json(
      {
        success: true,
        data: bookings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/booking/me]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
