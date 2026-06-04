import { feedbackFormSchema } from "@/modules/feedback/schema";
import { buildSystemPrompt, buildUserPrompt } from "@/modules/feedback/prompt";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // useCompletion 将数据包装在 prompt 字段中，需解析 JSON
    let formData: unknown;
    if (typeof body.prompt === "string") {
      try {
        formData = JSON.parse(body.prompt);
      } catch {
        formData = body;
      }
    } else {
      formData = body;
    }

    const parsed = feedbackFormSchema.safeParse(formData);
    if (!parsed.success) {
      return Response.json(
        { error: "表单数据无效", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(parsed.data.wordCount);
    const userPrompt = buildUserPrompt(parsed.data);

    const baseURL = process.env.OPENAI_BASE_URL || "https://api.deepseek.com/v1";
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.AI_MODEL || "deepseek-chat";

    const resp = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("AI API error:", resp.status, errText);
      return Response.json(
        { error: "AI 服务调用失败，请检查 API Key 配置" },
        { status: 502 }
      );
    }

    // 将 DeepSeek SSE 流转换为纯文本流
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = resp.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") continue;

              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // 忽略解析错误
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Generate error:", error);
    return Response.json(
      { error: "生成失败，请重试" },
      { status: 500 }
    );
  }
}
