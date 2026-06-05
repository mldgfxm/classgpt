import { db } from "@/lib/db";
import { feedbackHistory } from "@/lib/db/schema";
import { feedbackHistoryCreateSchema } from "@/modules/feedback/schema";
import { desc } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
  try {
    const entries = await db
      .select()
      .from(feedbackHistory)
      .orderBy(desc(feedbackHistory.createdAt))
      .limit(50);

    return Response.json({ entries });
  } catch (error) {
    console.error("History GET error:", error);
    return Response.json({ error: "获取历史记录失败" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = feedbackHistoryCreateSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "历史记录数据无效", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const entry = await db
      .insert(feedbackHistory)
      .values({
        studentName: data.studentName,
        gradeLevel: data.gradeLevel,
        grade: data.grade,
        subject: data.subject,
        teachingContent: data.teachingContent,
        errorAnalysis: data.errorAnalysis,
        keywords: JSON.stringify(data.keywords),
        assessments: JSON.stringify(data.assessments),
        result: data.result,
      })
      .returning();

    return Response.json(entry[0], { status: 201 });
  } catch (error) {
    console.error("History POST error:", error);
    return Response.json({ error: "保存失败" }, { status: 500 });
  }
}
