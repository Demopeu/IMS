import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function mergeDiffs(files: { filename: string; patch: string }[]) {
  return files
    .map((file) => `--- ${file.filename} ---\n${file.patch}`)
    .join("\n\n");
}

export function buildReviewPrompt(diff: string) {
  const templatePath = path.resolve(__dirname, "../../prompts/review.txt");
  const template = fs.readFileSync(templatePath, "utf-8");
  return template.replace("{{diff}}", diff);
}

export function saveReviewLog(file: string, diff: string, review: string) {
  const logDir = path.resolve(__dirname, "../../logs");
  const logFile = path.join(logDir, "mcp-review.log");

  // 로그 디렉토리가 없으면 생성
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const entry = {
    timestamp: new Date().toISOString(),
    file,
    diff,
    review,
  };

  const line = JSON.stringify(entry, null, 2) + ",\n";

  fs.appendFileSync(logFile, line, "utf-8");
}
