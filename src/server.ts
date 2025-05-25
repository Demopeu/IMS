import Fastify from "fastify";
import githubWebhookRoute from "./routes/github-webhook";

const server = Fastify({
  logger: true,
});

server.register(githubWebhookRoute);

server.get("/", async (request, reply) => {
  return { message: "MCP 서버 작동 중!" };
});

const start = async () => {
  try {
    await server.listen({ port: 80 });
    console.log("✅ MCP 서버가 작동 중");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
