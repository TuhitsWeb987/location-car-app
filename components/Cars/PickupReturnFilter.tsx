"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationCombobox } from "@/components/HeroSection/LocationCombobox";
import React, { useState } from "react";
import { combineDateAndTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CarSearchParams } from "@/types/car";

export const PickupReturnFilter = ({
  searchParams,
}: {
  searchParams: CarSearchParams;
}) => {
  const router = useRouter();

  const pickupDateTime = new Date(searchParams.pickupDateTime || "");
  const returnDateTime = new Date(searchParams.returnDateTime || "");

  const [pickupDate, setPickupDate] = useState(
    new Date(
      pickupDateTime.getFullYear(),
      pickupDateTime.getMonth(),
      pickupDateTime.getDate()
    )
  );
  const [returnDate, setReturnDate] = useState(
    new Date(
      returnDateTime.getFullYear(),
      returnDateTime.getMonth(),
      returnDateTime.getDate()
    )
  );
  const [pickupTime, setPickupTime] = useState(
    `${pickupDateTime.getHours().toString().padStart(2, "0")}:${pickupDateTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  );
  const [returnTime, setReturnTime] = useState(
    `${returnDateTime.getHours().toString().padStart(2, "0")}:${returnDateTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  );
  const [pickupLocation, setPickupLocation] = useState(
    searchParams.pickupLocation || ""
  );
  const [returnLocation, setReturnLocation] = useState(
    searchParams.returnLocation || ""
  );

  const handleSearch = () => {
    const pickupDateTime = combineDateAndTime(pickupDate, pickupTime);
    const returnDateTime = combineDateAndTime(returnDate, returnTime);

    const query = new URLSearchParams({
      pickupDateTime: pickupDateTime.toISOString(),
      returnDateTime: returnDateTime.toISOString(),
      pickupLocation: pickupLocation,
      returnLocation: returnLocation,
    });

    router.push(`/cars?${query.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2 justify-center">
      {/* PRISE */}
      <div className="flex flex-col items-start justify-center gap-2">
        <h1 className="text-2xl font-semibold">PRISE :</h1>
        <Label htmlFor="pickupLocation">Localisation</Label>
        <LocationCombobox
          name="pickupLocation"
          value={pickupLocation}
          onChange={setPickupLocation}
        />
        <div className="flex items-center w-full gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-left font-normal"
                name="pickupDate"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate.toLocaleDateString()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                initialFocus
                onSelect={(date) => {
                  if (date) {
                    setPickupDate(date);
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          <Input
            type="time"
            id="pickupTime"
            defaultValue={pickupTime}
            onChange={(e) => {
              setPickupTime((e.target as HTMLInputElement).value);
            }}
            className="justify-center"
          />
        </div>
      </div>

      {/* RETOUR */}
      <div className="flex flex-col items-start justify-center gap-2 mt-6">
        <h1 className="text-2xl font-semibold">RETOUR :</h1>
        <Label htmlFor="returnLocation">Localisation</Label>
        <LocationCombobox
          name="returnLocation"
          value={returnLocation}
          onChange={setReturnLocation}
        />
        <div className="flex items-center w-full gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-left font-normal"
                name="returnDate"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate.toLocaleDateString()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar mode="single" initialFocus onSelect={(date) => {
                if (date) {
                  setReturnDate(date);
                }
              }}/>
            </PopoverContent>
          </Popover>
          <Input
            type="time"
            id="returnTime"
            defaultValue={returnTime}
            onChange={(e) => {
              setReturnTime((e.target as HTMLInputElement).value);
            }}
            className="justify-center"
          />
        </div>
      </div>

      <Button
        onClick={() => handleSearch()}
        className="bg-[#F7835A] text-white w-full"
      >
        Rechercher
      </Button>
    </div>
  );
};
