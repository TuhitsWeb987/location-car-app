"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Ticket, Calendar1Icon, Headset, RotateCcw } from "lucide-react";

const features = [
  {
    icon: <Ticket className="w-15 h-15 rotate-135 text-[#F7835A]" />,
    title: "Tarifs locaux",
  },
  {
    icon: <Calendar1Icon className="w-15 h-15 text-[#F7835A]" />,
    title: "Réservation facile",
  },
  {
    icon: <Headset className="w-15 h-15 text-[#F7835A]" />,
    title: "Assistance locale",
  },
  {
    icon: <RotateCcw className="w-15 h-15 text-[#F7835A]" />,
    title: "Annulation gratuite",
  },
];

export const FeaturesGrid = () => {
  return (
    <div className="px-10 grid grid-cols-1 min-sm:grid-cols-2 md:grid-cols-4 justify-around gap-4">
      {features.map((feature, index) => (
        <Card key={index} className="bg-[#A0E9E0]/60 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center text-center gap-2">
            <div className="text-2xl">{feature.icon}</div>
            <h3 className="text-lg font-medium">{feature.title}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
