import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getChangedFilesInPullRequest(
  owner: string,
  repo: string,
  pullNumber: number
) {
  const { data } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber,
  });

  return data
    .filter((file) => !!file.patch)
    .map((file) => ({
      filename: file.filename,
      status: file.status,
      patch: file.patch!,
    }));
}

export async function commentOnPullRequest(
  owner: string,
  repo: string,
  prNumber: number,
  body: string
) {
  const truncated =
    body.length > 60000
      ? body.slice(0, 59900) + "\n\n_후략됨: 내용이 너무 깁니다._"
      : body;

  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: truncated,
  });
}
