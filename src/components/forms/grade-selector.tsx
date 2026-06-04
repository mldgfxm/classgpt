"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { GRADE_OPTIONS, type GradeLevel } from "@/lib/constants";

export function GradeSelector() {
  const form = useFormContext();
  const gradeLevel = useWatch({ name: "gradeLevel" }) as GradeLevel | undefined;

  // 学段变化时重置年级
  useEffect(() => {
    form.setValue("grade", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeLevel]);

  const availableGrades = gradeLevel ? GRADE_OPTIONS[gradeLevel] : [];

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">学段 / 年级</Label>
      <div className="flex gap-2">
        <Select
          value={gradeLevel || ""}
          onValueChange={(v) => form.setValue("gradeLevel", v)}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="选择学段" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(GRADE_OPTIONS).map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={form.watch("grade") || ""}
          onValueChange={(v) => form.setValue("grade", v)}
          disabled={!gradeLevel}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="选择年级" />
          </SelectTrigger>
          <SelectContent>
            {availableGrades.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {form.formState.errors.gradeLevel && (
        <p className="text-xs text-destructive">
          {form.formState.errors.gradeLevel.message as string}
        </p>
      )}
      {form.formState.errors.grade && (
        <p className="text-xs text-destructive">
          {form.formState.errors.grade.message as string}
        </p>
      )}
    </div>
  );
}
