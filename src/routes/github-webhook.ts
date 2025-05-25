import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  getChangedFilesInPullRequest,
  commentOnPullRequest,
} from "../services/github.service.js";
import {
  buildReviewPrompt,
  mergeDiffs,
  saveReviewLog,
} from "../services/review.service.js";
import { generateReviewWithLLM } from "../services/ai.service.js";

export default async function githubWebhookRoute(server: FastifyInstance) {
  server.post(
    "/webhook",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const event = request.headers["x-github-event"];
      const payload = request.body as any;

      if (event === "pull_request") {
        const action = payload.action;
        const prNumber = payload.pull_request.number;
        const [owner, repo] = payload.repository.full_name.split("/");

        if (action === "opened" || action === "synchronize") {
          const files = await getChangedFilesInPullRequest(
            owner,
            repo,
            prNumber
          );

          if (!files.length) {
            console.log("⚠️ 변경된 파일 없음");
            return reply.send({ ok: true });
          }

          const mergedDiff = mergeDiffs(files);
          const prompt = buildReviewPrompt(mergedDiff);

          console.log("🤖 LLaMA 3에게 리뷰 요청 중...");
          const review = await generateReviewWithLLM(prompt);

          const commentBody = `### 🤖 MCP 코드 리뷰\n\n${review}`;
          await commentOnPullRequest(owner, repo, prNumber, commentBody);

          console.log("✅ 리뷰 완료");

          // 리뷰 로그 저장
          saveReviewLog(files[0].filename, mergedDiff, review);

          console.log("✅ 리뷰 로그 저장");
        }
      }

      return reply.status(200).send({ ok: true });
    }
  );
}
