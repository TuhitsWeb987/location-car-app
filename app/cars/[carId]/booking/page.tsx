import { BookingDetailsSection } from "@/components/Bookings/BookingDetailsSection";
import { CarsDetailsSection } from "@/components/Cars/CarsDetailsSection";
import { Section } from "@/components/Commons/Section";
import { auth } from "@/lib/auth";
import { CarSearchParams } from "@/types/car";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: CarSearchParams;
  params: { carId: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    const safeParams = Object.entries(searchParams || {}).reduce(
      (acc, [key, value]) => {
        if (typeof value === "string") acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    const query = new URLSearchParams(safeParams);
    const callbackUrl = `/cars/${params.carId}/booking?${query}`;
    redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  return (
    <Section className="flex flex-col lg:flex-row gap-8 h-full mt-5">
      <CarsDetailsSection params={resolvedParams} />
      <BookingDetailsSection
        params={resolvedParams}
        searchParams={resolvedSearchParams}
      />
    </Section>
  );
}
