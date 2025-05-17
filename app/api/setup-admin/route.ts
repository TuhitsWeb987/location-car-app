import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const providedKey = req.headers.get("x-admin-key");
  const secretKey = process.env.ADMIN_SECRET_KEY;

  if (!secretKey || providedKey !== secretKey) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const name = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing ADMIN_EMAIL or ADMIN_PASSWORD" },
      { status: 500 }
    );
  }

  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (existingAdmin) {
    return NextResponse.json(
      { error: "Admin already exists" },
      { status: 403 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });

    return NextResponse.json({
      message: "✅ Utilisateur existant promu administrateur",
      email,
    });
  }

  const session = await auth.api.signUpEmail({
    body: {
      name: name || "Administrateur",
      email: email,
      password: password,
    },
  });

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      role: "admin",
    },
  });

  await auth.api.signOut({
    headers: req.headers,
  });

  return NextResponse.json({
    message: "✅ Utilisateur admin créé avec succès",
    email,
  });
}
