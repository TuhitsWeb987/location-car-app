"use client";
import { z } from "zod";
import { Section } from "./Section";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Calendar } from "@/components/ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Calendar1Icon,
  CalendarIcon,
  Headset,
  MapPin,
  RotateCcw,
  Ticket,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    location: z.string().min(2, "Localisation requise"),
    startDate: z.date({ required_error: "Date de prise du véhicule requise" }),
    endDate: z.date({ required_error: "date de retour du véhicule requise" }),
    startTime: z.string().min(1, "Heure de prise du véhicule requise"),
    endTime: z.string().min(1, "Heure de retour du véhicule requise"),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "La date de fin doit être postérieure à la date de début",
    path: ["endDate"],
  });

type Value = z.infer<typeof schema>;

export const HeroSection = () => {
  const features = [
    {
      icon: <Ticket className=" w-15 h-15 rotate-135 text-[#F7835A]" />,
      title: "Tarifs locaux",
    },
    {
      icon: <Calendar1Icon className=" w-15 h-15 text-[#F7835A]" />,
      title: "Réservation facile",
    },
    {
      icon: <Headset className=" w-15 h-15 text-[#F7835A]" />,
      title: "Assistance locale",
    },
    {
      icon: <RotateCcw className=" w-15 h-15 text-[#F7835A] " />,
      title: "Annulation gratuite",
    },
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Value>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Value) => {
    console.log("recherche");
  };
  return (
    <Section className="w-full h-full bg-[url('/banniere_image.png')] bg-cover bg-center bg-blend-overlay">
      <div className="mb-10 flex flex-col gap-7 justify-center md:px-20">
        <h1 className="text-5xl font-bold text-[#F7835A] px-10 md:py-8 py-5 md:text-left text-center">
          LOCATION DE VOITURES <br /> EN POLYNESIE <br /> FRANCAISE
        </h1>

        <div className="md:px-10 px-5">
          <Card className="bg-[#FFF5E5]/70">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex lg:flex-row flex-col lg:justify-around p-4 lg:items-center justify-center gap-2"
            >
              <div className="flex flex-col">
                <h1 className="text-lg">Prise du véhicule</h1>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pr-3 text-gray-400">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <Input
                    id="location"
                    placeholder="Ex: Aéroport de Faa'a"
                    {...register("location")}
                    className="px-6 bg-white"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 items-center mt-2">
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "text-left font-normal",
                              !field.value && "text-muted-foreground"
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
                  {errors.startDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.startDate.message}
                    </p>
                  )}

                  <Input
                    type="time"
                    id="startTime"
                    {...register("startTime")}
                    className="bg-white justify-center"
                  />
                  {errors.startTime && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg">Remise du véhicule</h1>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pr-3 text-gray-400">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <Input
                    id="location"
                    placeholder="Ex: Aéroport de Faa'a"
                    {...register("location")}
                    className="px-6 bg-white"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "text-left font-normal",
                              !field.value && "text-muted-foreground"
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
                  {errors.endDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.endDate.message}
                    </p>
                  )}

                  <Input
                    type="time"
                    id="endTime"
                    {...register("startTime")}
                    className="bg-white justify-center"
                  />
                  {errors.endTime && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.endTime.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="bg-[#F7835A] text-white text-lg px-5 py-10"
              >
                Trouver une voiture
              </Button>
            </form>
          </Card>
        </div>

        <div className="px-10 grid grid-cols-1 min-sm:grid-cols-2 md:grid-cols-4 justify-around gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-[#A0E9E0]/60 shadow-sm ">
              <CardContent className="flex flex-col items-center justify-center text-center gap-2">
                <div className="text-2xl">{feature.icon}</div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};
