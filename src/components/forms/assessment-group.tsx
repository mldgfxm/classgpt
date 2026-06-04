"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ButtonGroup } from "./button-group";

interface AssessmentGroupProps {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export function AssessmentGroup({
  label,
  options,
  value,
  onChange,
}: AssessmentGroupProps) {
  return (
    <div className="space-y-2.5">
      <Label className="text-sm font-medium">{label}</Label>
      <ButtonGroup options={options} value={value} onChange={onChange} />
      <Separator className="mt-3" />
    </div>
  );
}
