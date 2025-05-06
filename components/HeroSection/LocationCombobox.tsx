"use client";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useLocationStore } from "@/lib/stores/locationStore";

type Props = {
  control?: Control<any>;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const LocationCombobox = ({
  control,
  name,
  placeholder = "Choisir un lieu",
  value,
  onChange,
}: Props) => {
  const locations = useLocationStore((s) => s.locations);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const location = locations.find((loc) => loc.id === value);
    if (location) {
      setInputValue(location.name);
    }
  }, [locations, value]);

  const renderCombobox = (
    currentValue: string,
    handleSelect: (v: string) => void
  ) => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-start bg-white w-full",
            !currentValue && "text-muted-foreground"
          )}
        >
          <MapPin className="mr-2 h-4 w-4 text-gray-400" />
          {currentValue || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            {locations.length === 0 && (
              <CommandEmpty>Aucun lieu trouvé</CommandEmpty>
            )}
            {locations.map((loc) => (
              <CommandItem
                key={loc.id}
                value={loc.id}
                onSelect={() => {
                  handleSelect(loc.id);
                  setOpen(false);
                }}
              >
                {loc.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  if (!control) {
    return renderCombobox(inputValue, (newVal) => {
      setInputValue(newVal);
      onChange?.(newVal);
    });
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) =>
        renderCombobox(
          locations.find((loc) => loc.id === field.value)?.name || "",
          field.onChange
        )
      }
    />
  );
};
