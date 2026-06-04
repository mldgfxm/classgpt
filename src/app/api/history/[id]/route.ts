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
    await db.delete(feedbackHistory).where(eq(feedbackHistory.id, parseInt(id)));
    return Response.json({ success: true });
  } catch (error) {
    console.error("History DELETE error:", error);
    return Response.json({ error: "删除失败" }, { status: 500 });
  }
}
