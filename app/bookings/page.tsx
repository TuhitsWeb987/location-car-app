import { useAllBookings } from "@/lib/hooks/useBookingsQuery";

export default function page() {
  const allBookings = useAllBookings().data;

  return <p>All bookings</p>;
}
