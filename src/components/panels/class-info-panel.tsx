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

export function ClassInfoPanel() {
  const form = useFormContext();

  return (
    <div className="flex flex-col h-full bg-card border-r">
      <PanelHeader title="课堂信息" subtitle="填写学生和课程基本信息" />

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-5">
          {/* 学生姓名 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">学生姓名</Label>
            <Input
              placeholder="输入学生姓名"
              {...form.register("studentName")}
              className="h-10"
            />
            {form.formState.errors.studentName && (
              <p className="text-xs text-destructive">
                {String(form.formState.errors.studentName.message || "")}
              </p>
            )}
          </div>

          {/* 年级级联选择 */}
          <GradeSelector />

          {/* 学科选择 */}
          <SubjectSelect />

          {/* 教学内容 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">教学内容</Label>
            <Textarea
              placeholder="例：二次函数图像与性质、三角形内角和"
              {...form.register("teachingContent")}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* 错题精讲 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">错题精讲</Label>
            <Textarea
              placeholder="例：错题分析、原因定位、同类题强化"
              {...form.register("errorAnalysis")}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* 知识点关键词 */}
          <TagInput />
        </div>
      </ScrollArea>
    </div>
  );
}
