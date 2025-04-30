const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const locations = await prisma.location.createMany({
    data: [
      {
        name: "Aéroport de Faa'a",
        type: "AÉROPORT",
        region: "Tahiti",
        isPickupOnly: false,
        isReturnOnly: false,
        isDefault: true,
        isSameForReturn: true,
        latitude: -17.5537,
        longitude: -149.6063,
      },
      {
        name: "Port de Papeete",
        type: "PORT",
        region: "Tahiti",
        isPickupOnly: false,
        isReturnOnly: true,
        isDefault: false,
        isSameForReturn: true,
        latitude: -17.5343,
        longitude: -149.5665,
      },
      {
        name: "Agence Vaima Center",
        type: "AGENCE",
        region: "Papeete",
        isPickupOnly: false,
        isReturnOnly: false,
        isDefault: true,
        isSameForReturn: true,
        latitude: -17.5337,
        longitude: -149.5669,
      },
      {
        name: "Hôtel Intercontinental Moorea",
        type: "HÔTEL",
        region: "Moorea",
        isPickupOnly: true,
        isReturnOnly: false,
        isDefault: false,
        isSameForReturn: false,
        latitude: -17.4971,
        longitude: -149.8817,
      },
      {
        name: "Aéroport de Moorea",
        type: "AÉROPORT",
        region: "Moorea",
        isPickupOnly: false,
        isReturnOnly: false,
        isDefault: true,
        isSameForReturn: true,
        latitude: -17.4891,
        longitude: -149.7617,
      },
      {
        name: "Agence Quai des Ferries",
        type: "AGENCE",
        region: "Papeete",
        isPickupOnly: false,
        isReturnOnly: false,
        isDefault: false,
        isSameForReturn: true,
        latitude: -17.5341,
        longitude: -149.5679,
      },
    ],
  });

  const mainLocation = await prisma.location.findFirst({
    where: { name: "Hôtel Intercontinental Moorea" },
  });

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
      mainLocationId: mainLocation.id,
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
          { url: "https://images.unsplash.com/photo-1633768428926-81fb4499f795?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { url: "https://images.unsplash.com/photo-1633768428926-81fb4499f795?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
          { url: "https://images.unsplash.com/photo-1633768428926-81fb4499f795?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { url: "https://images.unsplash.com/photo-1633768428926-81fb4499f795?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
