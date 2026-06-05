import { db } from "@/lib/db";
import { feedbackHistory } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return Response.json({ error: "记录 ID 无效" }, { status: 400 });
    }

    const deleted = await db
      .delete(feedbackHistory)
      .where(eq(feedbackHistory.id, numericId))
      .returning({ id: feedbackHistory.id });

    if (deleted.length === 0) {
      return Response.json({ error: "记录不存在" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("History DELETE error:", error);
    return Response.json({ error: "删除失败" }, { status: 500 });
  }
}
