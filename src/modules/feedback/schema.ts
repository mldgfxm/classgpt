import { z } from "zod";
import { GRADE_OPTIONS, SUBJECTS } from "@/lib/constants";

const gradeLevels = Object.keys(GRADE_OPTIONS) as [keyof typeof GRADE_OPTIONS];

export const feedbackFormSchema = z.object({
  studentName: z.string().min(1, "请输入学生姓名"),
  gradeLevel: z.enum(gradeLevels, "请选择学段"),
  grade: z.string().min(1, "请选择年级"),
  subject: z.enum(
    SUBJECTS as unknown as [string, ...string[]],
    "请选择学科"
  ),
  teachingContent: z.string().default(""),
  errorAnalysis: z.string().default(""),
  keywords: z.array(z.string()).default([]),
  wordCount: z.string().default("300-500"),
  assessments: z.object({
    mastery: z.string().default(""),
    engagement: z.string().default(""),
    homework: z.string().default(""),
    participation: z.string().default(""),
    habits: z.string().default(""),
    output: z.string().default(""),
    tone: z.string().default(""),
  }),
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

export const feedbackHistoryCreateSchema = feedbackFormSchema.omit({
  wordCount: true,
}).extend({
  result: z.string().min(1, "反馈内容不能为空"),
});

export type FeedbackHistoryCreateData = z.infer<typeof feedbackHistoryCreateSchema>;
