import { exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const batPath = path.join(__dirname, "../../start-mcp.bat");

exec(`start "" "${batPath}"`, (error) => {
  if (error) {
    console.error("❌ .bat 실행 실패:", error);
  } else {
    console.log("✅ .bat 실행 성공");
  }
});
