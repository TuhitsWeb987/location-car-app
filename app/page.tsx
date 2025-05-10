"use client"
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { HowWorkSection } from "@/components/HowWorkSection/HowWorkSection";
import { LocationFamousSection } from "@/components/LocationFamousSection/LocationFamousSection";
import { Section } from "@/components/Commons/Section";
import { useEffect } from "react";
import { prisma } from "@/lib/prisma";

export default function Page() {

  return (
    <Section className="flex flex-col items-center justify-center w-full">
      <HeroSection />
      <HowWorkSection />
      <LocationFamousSection />
    </Section>
  );
}
