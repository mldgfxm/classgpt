"use client";

import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SUBJECTS } from "@/lib/constants";

export function SubjectSelect() {
  const form = useFormContext();

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">学科</Label>
      <Select
        value={form.watch("subject") || ""}
        onValueChange={(v) => form.setValue("subject", v)}
      >
        <SelectTrigger className="w-full bg-card/85">
          <SelectValue placeholder="选择学科" />
        </SelectTrigger>
        <SelectContent>
          {SUBJECTS.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {form.formState.errors.subject && (
        <p className="text-xs text-destructive">
          {form.formState.errors.subject.message as string}
        </p>
      )}
    </div>
  );
}
