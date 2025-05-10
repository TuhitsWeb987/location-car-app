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
