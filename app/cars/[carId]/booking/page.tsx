import { BookingDetailsSection } from "@/components/Bookings/BookingDetailsSection";
import { CarsDetailsSection } from "@/components/Cars/CarsDetailsSection";
import { Section } from "@/components/Commons/Section";
import { CarSearchParams } from "@/types/car";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: CarSearchParams;
  params: { carId: string };
}) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  return (
    <Section className="flex flex-col lg:flex-row gap-8">
      <CarsDetailsSection params={resolvedParams} />
      <BookingDetailsSection params={resolvedParams} searchParams={resolvedSearchParams} />
    </Section>
  );
}
