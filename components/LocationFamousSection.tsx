import { Section } from "./Section";
import Tahiti from "@/public/tahiti.png";
import Moorea from "@/public/moorea.png";
import Bora from "@/public/borabora.png";
import { Card } from "./ui/card";
import Image from "next/image";

export const LocationFamousSection = () => {
  const destinations = [
    {
      name: "Tahiti",
      image: Tahiti,
      description:
        "Découvrez la plus grande île de la Polynésie française, avec ses marchés colorés, ses cascades spectaculaires et ses plages de sable noir. Capitale vibrante et point de départ idéal pour explorer le territoire.",
    },
    {
      name: "Moorea",
      image: Moorea,
      description:
        "L'île sœur de Tahiti vous séduira par ses baies majestueuses, ses plages de sable blanc et ses paysages montagneux. Un paradis pour les amateurs de snorkeling et de randonnée.",
    },
    {
      name: "Bora",
      image: Bora,
      description:
        "La perle du Pacifique, célèbre pour son lagon turquoise, ses bungalows sur pilotis et ses couchers de soleil inoubliables. Une destination de rêve pour des vacances luxueuses.",
    },
  ];
  return (
    <Section className="flex flex-col items-center justify-center gap-5 h-full w-full p-10">
      <h1 className="text-4xl font-bold text-center">Destinations phares</h1>
      <div className="grid grid-cols-1 min-sm:grid-cols-2 md:grid-cols-3 gap-4">
        {destinations.map((destination, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-between gap-4 p-4 bg-[#A0E9E0]/60 min-h-[400px]"
          >
            <Image
              src={destination.image}
              alt={destination.name}
              className="object-cover rounded-xl max-h-[150px] w-full"
            />
            <h3 className="text-2xl font-bold text-center">
              {destination.name}
            </h3>
            <p className="text-justify">{destination.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};
