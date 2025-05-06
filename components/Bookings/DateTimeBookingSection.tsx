import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

export const DateTimeBookingSection = ({
  selectedDate,
  name,
}: {
  selectedDate: any;
  name: string;
}) => {
  const formatDateTime = (date: Date) => {
    return format(date, "dd/MM/yy HH:mm", { locale: fr });
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold text-[#003A45]">{name}</h3>
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-white p-4">
        <CalendarIcon className="h-5 w-5 text-[#003A45]" />
        <div className="text-xl">{formatDateTime(selectedDate)}</div>
      </div>
    </div>
  );
};
