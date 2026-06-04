import { db } from "@/lib/db";
import { feedbackHistory } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

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

    const entry = await db
      .insert(feedbackHistory)
      .values({
        studentName: body.studentName,
        gradeLevel: body.gradeLevel,
        grade: body.grade,
        subject: body.subject,
        teachingContent: body.teachingContent || "",
        errorAnalysis: body.errorAnalysis || "",
        keywords: JSON.stringify(body.keywords || []),
        assessments: JSON.stringify(body.assessments || {}),
        result: body.result,
      })
      .returning();

    return Response.json(entry[0], { status: 201 });
  } catch (error) {
    console.error("History POST error:", error);
    return Response.json({ error: "保存失败" }, { status: 500 });
  }
}
