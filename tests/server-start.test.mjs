import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";

const port = 31000 + Math.floor(Math.random() * 1000);
const child = spawn(process.execPath, ["server.js"], {
  cwd: new URL("..", import.meta.url),
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"]
});

let stderr = "";
let exited = false;
child.stderr.setEncoding("utf8");
child.stderr.on("data", chunk => { stderr += chunk; });
child.once("exit", () => { exited = true; });

try {
  await Promise.race([
    once(child.stdout, "data"),
    once(child, "exit").then(([code]) => {
      throw new Error(`server exited with ${code}: ${stderr}`);
    }),
    new Promise((_, reject) => setTimeout(() => reject(new Error("server start timed out")), 3000))
  ]);

  const response = await fetch(`http://127.0.0.1:${port}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
} finally {
  if (!exited) {
    child.kill("SIGTERM");
    await once(child, "exit");
  }
}

console.log("server startup test passed");
