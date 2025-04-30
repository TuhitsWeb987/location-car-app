"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  options: { id: string; label: string }[];
  selected: string[] | undefined;
  onToggle: (value: string) => void;
};

export const CheckboxGroup = ({
  label,
  options,
  selected,
  onToggle,
}: Props) => {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <Label className="font-bold text-lg">{label}</Label>
      {options.map(({ id, label }) => (
        <div className="flex items-center gap-2" key={id}>
          <Checkbox
            id={id}
            checked={selected?.includes(id)}
            onCheckedChange={() => onToggle(id)}
          />
          <Label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
        </div>
      ))}
    </div>
  );
};
