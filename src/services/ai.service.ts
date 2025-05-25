import { buildReviewPrompt } from "./review.service";

export async function generateReviewWithLLM(prompt: string): Promise<string> {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  return data.response || "⚠️ 리뷰 생성 실패";
}
