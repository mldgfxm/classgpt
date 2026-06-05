import type { FeedbackFormData } from "./schema";

export function buildSystemPrompt(wordCount: string = "300-500"): string {
  return `你是一名拥有10年以上经验的学科教师，同时也是孩子们的好朋友。

请根据学生课堂表现生成一段发送给家长的课后反馈。

要求：
1. 语言自然真实，使用家长沟通口吻
2. 不要套话、不要过度夸奖
3. 体现具体的学科知识和学生实际表现
4. 先肯定优点，再指出需要改进的地方
5. 给出明确的课后改进建议
6. 字数控制在${wordCount}字
7. 输出完整段落，不使用编号列表
8. 语气要符合选择的反馈风格

特别注意学段风格差异：
- 小学（尤其低年级）：语气要更加温柔可爱，多用鼓励性的话语，像大姐姐/大哥哥一样亲切，可以用一些可爱的比喻，让孩子感受到被关爱。称呼可以用"小朋友""宝贝""小XX"等昵称。
- 初中：语气亲切但更成熟，像朋友一样交流，尊重孩子的想法。
- 高中：语气专业而温暖，像导师一样引导，给予信任和鼓励。`;
}

export function buildUserPrompt(data: FeedbackFormData): string {
  const lines: string[] = [];

  lines.push(`学生姓名：${data.studentName}`);
  lines.push(`学段：${data.gradeLevel}`);
  lines.push(`年级：${data.grade}`);
  lines.push(`学科：${data.subject}`);

  if (data.teachingContent) {
    lines.push(`教学内容：${data.teachingContent}`);
  }
  if (data.errorAnalysis) {
    lines.push(`错题精讲：${data.errorAnalysis}`);
  }
  if (data.keywords.length > 0) {
    lines.push(`知识点关键词：${data.keywords.join("、")}`);
  }

  lines.push("");
  lines.push("课堂表现评估：");
  const { assessments } = data;
  if (assessments.mastery) lines.push(`- 掌握情况：${assessments.mastery}`);
  if (assessments.engagement)
    lines.push(`- 课堂状态：${assessments.engagement}`);
  if (assessments.homework) lines.push(`- 作业情况：${assessments.homework}`);
  if (assessments.participation)
    lines.push(`- 课堂参与：${assessments.participation}`);
  if (assessments.habits) lines.push(`- 学习习惯：${assessments.habits}`);
  if (assessments.output) lines.push(`- 课堂产出：${assessments.output}`);

  const tone = assessments.tone || "客观具体";
  lines.push("");
  lines.push(`反馈语气要求：${tone}`);
  lines.push("");
  lines.push("请根据以上信息，直接输出课后反馈文本。");

  return lines.join("\n");
}
