"use client";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { combineDateAndTime } from "@/lib/utils";
import { Card } from "../ui/card";
import { LocationDateTimeInput } from "./LocationDateTimeInput";

const schema = z
  .object({
    locationPick: z.string().min(2, "Localisation de prise requise"),
    locationReturn: z.string().min(2, "Localisation de retour requise"),
    pickupDate: z.date({ required_error: "Date de prise du véhicule requise" }),
    returnDate: z.date({ required_error: "date de retour du véhicule requise" }),
    startTime: z.string().min(1, "Heure de prise du véhicule requise"),
    endTime: z.string().min(1, "Heure de retour du véhicule requise"),
  })
  .refine((data) => data.pickupDate <= data.returnDate, {
    message: "La date de fin doit être postérieure à la date de début",
    path: ["returnDate"],
  });

type Value = z.infer<typeof schema>;

export const SearchForm = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Value>({
    resolver: zodResolver(schema),
  });

  const locationPick = watch("locationPick");
  useEffect(() => {
    const currentReturn = watch("locationReturn");
    if (locationPick && !currentReturn) {
      setValue("locationReturn", locationPick);
    }
  }, [locationPick, setValue, watch]);

  const onSubmit = (data: Value) => {
    const pickupDateTime= combineDateAndTime(data.pickupDate, data.startTime);
    const returnDateTime = combineDateAndTime(data.returnDate, data.endTime);

    const query = new URLSearchParams({
      pickupDateTime: pickupDateTime.toISOString(),
      returnDateTime: returnDateTime.toISOString(),
      pickupLocation: data.locationPick,
      returnLocation: data.locationReturn,
    });

    router.push(`/cars?${query.toString()}`);
  };

  const onError = (errors: FieldErrors<Value>) => {
    const message = Object.values(errors).find((e) => e?.message)?.message;

    if (message) {
      toast.error(message);
    }
  };

  return (
    <Card className="bg-[#FFF5E5]/70">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex lg:flex-row flex-col lg:justify-around p-4 lg:items-center justify-center gap-2"
      >
        <LocationDateTimeInput
          label="Prise du véhicule"
          locationName="locationPick"
          dateName="pickupDate"
          timeName="startTime"
          control={control}
          register={register}
          errors={errors}
        />

        <LocationDateTimeInput
          label="Retour du véhicule"
          locationName="locationReturn"
          dateName="returnDate"
          timeName="endTime"
          control={control}
          register={register}
          errors={errors}
        />

        <Button
          type="submit"
          className="bg-[#F7835A] text-white text-lg px-5 py-10"
        >
          Trouver une voiture
        </Button>
      </form>
    </Card>
  );
};
