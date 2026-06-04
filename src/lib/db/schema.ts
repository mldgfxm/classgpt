import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const feedbackHistory = sqliteTable("feedback_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // 学生信息
  studentName: text("student_name").notNull(),
  gradeLevel: text("grade_level").notNull(), // "小学" | "初中" | "高中"
  grade: text("grade").notNull(), // "三年级", "初二", etc.
  subject: text("subject").notNull(),

  // 教学内容
  teachingContent: text("teaching_content").notNull().default(""),
  errorAnalysis: text("error_analysis").notNull().default(""),

  // 知识点关键词 (JSON array string)
  keywords: text("keywords").notNull().default("[]"),

  // 课堂表现评估 (JSON object string)
  assessments: text("assessments").notNull().default("{}"),

  // AI 生成结果
  result: text("result").notNull(),

  // 时间戳
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").notNull().default(sql`(current_timestamp)`),
});
