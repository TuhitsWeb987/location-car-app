// app/api/users/route.ts
import { auth } from "@/lib/auth"; // BetterAuth session
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  const ctx = await auth.$context;

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const form = await req.formData();

    const name = form.get("name")?.toString() || "";
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    const image = form.get("image") as string | null;

    let imageUrl: string | undefined = undefined;

    if (image) {
      imageUrl = image;
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    // Mise à jour du mot de passe si nécessaire
    if (password) {
      const hashedPassword = await ctx.password.hash(password);
      await ctx.internalAdapter.updatePassword(session.user.id, hashedPassword);
      await auth.api.signOut({
        headers: req.headers
      })
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Erreur PUT /api/users", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
