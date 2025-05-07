import CarsSection from "@/components/Cars/CarsSection";
import FiltersSection from "@/components/Cars/FiltersSection";
import { Section } from "@/components/Commons/Section";
import { CarSearchParams } from "@/types/car";

export default async function Page({
  searchParams,
}: {searchParams: CarSearchParams}) {

  const resolvedSearchParams = await searchParams;


  return (
    <Section className="flex gap-4 justify-center mt-5 h-full">
      <FiltersSection searchParams={resolvedSearchParams} />
      <CarsSection searchParams={resolvedSearchParams} />
    </Section>
  );
}
