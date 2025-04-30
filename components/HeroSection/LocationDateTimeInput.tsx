"use client";

import {
  Controller,
  UseFormRegister,
  FieldErrors,
  Control,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { LocationCombobox } from "./LocationCombobox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Props = {
  label: string;
  locationName: string;
  dateName: "pickupDate" | "returnDate";
  timeName: "startTime" | "endTime";
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

export const LocationDateTimeInput = ({
  label,
  locationName,
  dateName,
  timeName,
  control,
  register,
  errors,
}: Props) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg">{label}</h1>

      {/* Localisation */}
      <LocationCombobox
        control={control}
        name={locationName}
        placeholder="Ex: Aéroport de Faa'a"
      />

      {/* Date et Heure */}
      <div className="flex gap-2 items-center mt-2 w-full">
        {/* Date */}
        <Controller
          control={control}
          name={dateName}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "text-left font-normal",
                    !field.value && "text-muted-foreground",
                    errors[dateName] && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value
                    ? format(field.value, "dd/MM/yyyy")
                    : "Choisir une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />

        {/* Heure */}
        <Input
          type="time"
          id={timeName}
          {...register(timeName)}
          className={cn(
            "bg-white justify-center",
            errors[timeName] && "border-red-500"
          )}
        />
      </div>
    </div>
  );
};
