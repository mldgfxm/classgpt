"use client";

import { useFormContext } from "react-hook-form";
import { PanelHeader } from "@/components/layout/panel-header";
import { GradeSelector } from "@/components/forms/grade-selector";
import { SubjectSelect } from "@/components/forms/subject-select";
import { TagInput } from "@/components/forms/tag-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GraduationCap, NotebookPen } from "lucide-react";

export function ClassInfoPanel() {
  const form = useFormContext();

  return (
    <div className="glass-panel flex flex-col h-full overflow-hidden rounded-lg border">
      <PanelHeader title="课堂信息" subtitle="填写学生和课程基本信息" />

      <ScrollArea className="flex-1">
        <div className="p-5 space-y-5">
          <div className="rounded-lg border bg-background/72 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              学生档案
            </div>
            <Label className="text-sm font-medium">学生姓名</Label>
            <Input
              placeholder="输入学生姓名"
              {...form.register("studentName")}
              className="mt-2 h-10 bg-card/85"
            />
            {form.formState.errors.studentName && (
              <p className="mt-2 text-xs text-destructive">
                {String(form.formState.errors.studentName.message || "")}
              </p>
            )}
          </div>

          <GradeSelector />
          <SubjectSelect />

          <div className="space-y-4 rounded-lg border bg-background/68 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <NotebookPen className="h-3.5 w-3.5 text-[oklch(0.58_0.13_35)]" />
              课堂素材
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">教学内容</Label>
              <Textarea
                placeholder="例：二次函数图像与性质、三角形内角和"
                {...form.register("teachingContent")}
                rows={3}
                className="resize-none bg-card/85"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">错题精讲</Label>
              <Textarea
                placeholder="例：错题分析、原因定位、同类题强化"
                {...form.register("errorAnalysis")}
                rows={3}
                className="resize-none bg-card/85"
              />
            </div>
          </div>

          <TagInput />
        </div>
      </ScrollArea>
    </div>
  );
}
