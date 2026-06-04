export const GRADE_OPTIONS = {
  "小学": ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"],
  "初中": ["初一", "初二", "初三"],
  "高中": ["高一", "高二", "高三"],
} as const;

export type GradeLevel = keyof typeof GRADE_OPTIONS;
export type Grade = (typeof GRADE_OPTIONS)[GradeLevel][number];

export const SUBJECTS = [
  "语文", "数学", "英语", "物理", "化学",
  "生物", "政治", "历史", "地理",
] as const;

export type Subject = (typeof SUBJECTS)[number];

export const ASSESSMENT_GROUPS = [
  {
    name: "mastery" as const,
    label: "掌握情况",
    options: ["掌握扎实", "基本掌握", "需要巩固"],
  },
  {
    name: "engagement" as const,
    label: "课堂状态",
    options: ["专注积极", "状态稳定", "偶尔分神"],
  },
  {
    name: "homework" as const,
    label: "作业情况",
    options: ["完成较好", "部分错误", "需督促"],
  },
  {
    name: "participation" as const,
    label: "课堂参与",
    options: ["主动回答", "跟随思路", "需要带动"],
  },
  {
    name: "habits" as const,
    label: "学习习惯",
    options: ["步骤规范", "细节需稳", "审题偏慢"],
  },
  {
    name: "output" as const,
    label: "课堂产出",
    options: ["能独立完成", "提示后完成", "需课后巩固"],
  },
  {
    name: "tone" as const,
    label: "反馈语气",
    options: ["鼓励温和", "客观具体", "严格提醒", "简洁版"],
  },
] as const;

export type AssessmentName = (typeof ASSESSMENT_GROUPS)[number]["name"];

export const WORD_COUNT_OPTIONS = [
  { value: "150-250", label: "简短 (150-250字)" },
  { value: "300-500", label: "适中 (300-500字)" },
  { value: "500-800", label: "详细 (500-800字)" },
  { value: "800-1200", label: "超详细 (800-1200字)" },
] as const;
