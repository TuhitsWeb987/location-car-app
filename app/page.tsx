import { HeroSection } from "@/components/HeroSection/HeroSection";
import { HowWorkSection } from "@/components/HowWorkSection/HowWorkSection";
import { LocationFamousSection } from "@/components/LocationFamousSection/LocationFamousSection";
import { Section } from "@/components/Commons/Section";

export default function Page() {

  return (
    <Section className="flex flex-col items-center justify-center w-full">
      <HeroSection />
      <HowWorkSection />
      <LocationFamousSection />
    </Section>
  );
}
