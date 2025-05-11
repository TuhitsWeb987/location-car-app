import { prisma } from "../prisma";

export async function getBooking(id: string) {
  const booking = await prisma.rental.findUnique({
    where: {
      id: id,
    },
    include: {
      car: true,
    },
  });

  return booking;
}

export async function getAllBookings() {
  const allBookings = await prisma.rental.findMany({
    include: {
      car: true,
      user: true,
      pickupLocation: true,
      returnLocation: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return allBookings;
}

export async function getBookingUser(id: string) {
  const booking = await prisma.rental.findMany({
    where: {
      userId: id,
    },
    include: {
      car: true,
      pickupLocation: true,
      returnLocation: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return booking;
}
