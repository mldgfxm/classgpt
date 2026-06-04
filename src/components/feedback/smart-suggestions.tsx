"use client";

import { type FeedbackFormData } from "@/modules/feedback/schema";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface SmartSuggestionsProps {
  formData: FeedbackFormData;
}

export function SmartSuggestions({ formData }: SmartSuggestionsProps) {
  const items: string[] = [];

  if (formData.studentName) items.push(`学生：${formData.studentName}`);
  if (formData.gradeLevel && formData.grade)
    items.push(`${formData.gradeLevel}${formData.grade}`);
  if (formData.subject) items.push(`学科：${formData.subject}`);
  if (formData.teachingContent)
    items.push(`教学内容：${formData.teachingContent}`);
  if (formData.keywords.length > 0)
    items.push(`知识点：${formData.keywords.join("、")}`);

  const { assessments } = formData;
  const assessmentLabels: string[] = [];
  if (assessments.mastery) assessmentLabels.push(`掌握：${assessments.mastery}`);
  if (assessments.engagement) assessmentLabels.push(`状态：${assessments.engagement}`);
  if (assessments.homework) assessmentLabels.push(`作业：${assessments.homework}`);
  if (assessments.participation) assessmentLabels.push(`参与：${assessments.participation}`);
  if (assessments.tone) assessmentLabels.push(`语气：${assessments.tone}`);

  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border bg-card p-3 space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Lightbulb className="h-3.5 w-3.5" />
        本次反馈生成依据
      </div>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <Badge key={item} variant="secondary" className="text-xs">
            {item}
          </Badge>
        ))}
        {assessmentLabels.map((label) => (
          <Badge key={label} variant="outline" className="text-xs">
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
