"use client";

import { Section } from "@/components/Commons/Section";
import { SearchForm } from "@/components/HeroSection/SearchForm";
import { FeaturesGrid } from "@/components/HeroSection/FeaturesGrid";

export const HeroSection = () => {
  return (
    <Section className="w-full h-full bg-[url('/banniere_image.png')] bg-cover bg-center bg-blend-overlay">
      <div className="mb-10 flex flex-col gap-7 justify-center md:px-20">
        {/* Titre principal */}
        <h1 className="text-5xl font-bold text-[#F7835A] px-10 md:py-8 py-5 md:text-left text-center">
          LOCATION DE VOITURES <br /> EN POLYNÉSIE <br /> FRANÇAISE
        </h1>

        {/* Formulaire de recherche */}
        <div className="md:px-10 px-5">
          <SearchForm />
        </div>

        {/* Grille des features */}
        <FeaturesGrid />
      </div>
    </Section>
  );
};
