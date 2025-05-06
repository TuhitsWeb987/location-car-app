import { CarFilters } from "@/types/car";
import { prisma } from "../prisma";

export async function getAvailableCars(filters: CarFilters) {
  const { pickupDateTime, returnDateTime, pickupLocation } = filters;

  const location = await prisma.location.findFirst({
    where: {
      id: pickupLocation,
    },
  });

  if (!location) throw new Error("Nous n'avons pas trouvé de location");
  return await prisma.car.findMany({
    where: {
      available: true,
      agency: {
        mainLocation: {
          region: location.region,
        },
      },
      rentals: {
        none: {
          AND: [
            { pickupDate: { lt: new Date(returnDateTime!) } },
            { returnDate: { gt: new Date(pickupDateTime!) } },
          ],
        },
      },
    },
    include: {
      agency: { include: { mainLocation: true } },
      imageUrls: true,
      options: true,
    },
  });
}

export async function getCarById(carId: string) {
  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
    include: {
      agency: { include: { mainLocation: true } },
      imageUrls: true,
      options: true,
    },
  });
  return car;
}
