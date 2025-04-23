const { PrismaClient } = require("@prisma/client");
const { url } = require("inspector");
const prisma = new PrismaClient();

async function main() {
  const agency = await prisma.agency.create({
    data: {
      name: "Moorea Cars",
      siret: "1234567890001221341234",
      email: "contact@mooreacars.pf",
      phone: "+689 40 56 78 90",
      address: "PK 10, Haapiti, Moorea",
      island: "Moorea",
      website: "https://mooreacars.pf",
      isApproved: true,
      tahiti_number: "12345667776542123134",
    },
  });

  await prisma.car.create({
    data: {
      brand: "Toyota",
      model: "Yaris",
      year: 2022,
      category: "ECONOMIQUE",
      fuelType: "ESSENCE",
      transmission: "MANUELLE",
      seats: 5,
      doors: 5,
      airConditioning: true,
      mileageLimit: 200,
      pricePerDay: 5500,
      pricePerWeek: 35000,
      available: true,
      agency: { connect: { id: agency.id } },
      imageUrls: {
        create: [
          { url: "https://source.unsplash.com/featured/?car,yaris" },
          { url: "https://source.unsplash.com/featured/?toyota,yaris,side" },
        ],
      },
    },
  });

  await prisma.car.create({
    data: {
      brand: "Hyundai",
      model: "Kona",
      year: 2023,
      category: "SUV",
      fuelType: "ELECTRIQUE",
      transmission: "AUTOMATIQUE",
      seats: 5,
      doors: 5,
      airConditioning: true,
      mileageLimit: null,
      pricePerDay: 7900,
      pricePerWeek: 50000,
      available: true,
      agency: { connect: { id: agency.id } },
      imageUrls: {
        create: [
          { url: "https://source.unsplash.com/featured" },
          { url: "https://source.unsplash.com/featured" },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "Tane Teva",
      email: "tane@example.com",
      hashedPassword: "passwordhash",
      phone: "+689 87 65 43 21",
      birthDate: new Date("1998-05-15"),
      licenseDate: new Date("2016-06-01"),
    },
  });
}

main()
  .then(() => {
    console.log("🌴 Données de test insérées avec succès");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
