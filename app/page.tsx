import { HeroSection } from "@/components/HeroSection";
import { HowWorkSection } from "@/components/HowWorkSection";
import { LocationFamousSection } from "@/components/LocationFamousSection";
import { Section } from "@/components/Section";

export default function HomePage() {
  return (
    <Section className="flex flex-col items-center justify-center w-full">
      <HeroSection />
      <HowWorkSection />
      <LocationFamousSection />
    </Section>
  );
}
