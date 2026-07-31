import { createServer } from "node:http";
import { appendFile, mkdir, readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".mp4": "video/mp4", ".svg": "image/svg+xml"
};

async function deliverInquiry(payload) {
  const record = { ...payload, receivedAt: new Date().toISOString() };
  await mkdir(join(root, "data"), { recursive: true });
  await appendFile(join(root, "data", "inquiries.ndjson"), `${JSON.stringify(record)}\n`);

  if (process.env.OPENCLAW_INQUIRY_WEBHOOK) {
    await fetch(process.env.OPENCLAW_INQUIRY_WEBHOOK, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.OPENCLAW_INQUIRY_TOKEN ? { authorization: `Bearer ${process.env.OPENCLAW_INQUIRY_TOKEN}` } : {})
      },
      body: JSON.stringify({
        type: "gtai.inquiry",
        destination: "whatsapp-private",
        email: process.env.INQUIRY_EMAIL || "babysharkdoludodo@gmail.com",
        inquiry: record
      })
    });
  }
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const local = normalize(join(root, requested));
  return local.startsWith(root) ? local : join(root, "index.html");
}

createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/api/inquiry") {
    let body = "";
    for await (const chunk of request) {
      body += chunk;
      if (body.length > 32_000) {
        response.writeHead(413).end();
        return;
      }
    }
    try {
      const payload = JSON.parse(body);
      if (!payload.name || !payload.company || !payload.email || !payload.request) throw new Error("Missing fields");
      await deliverInquiry(payload);
      response.writeHead(201, { "content-type": "application/json" }).end('{"ok":true}');
    } catch {
      response.writeHead(400, { "content-type": "application/json" }).end('{"ok":false}');
    }
    return;
  }

  let file = safePath(request.url || "/");
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = join(file, "index.html");
    const content = await readFile(file);
    response.writeHead(200, {
      "content-type": mime[extname(file)] || "application/octet-stream",
      "cache-control": extname(file) === ".html" ? "no-cache" : "public, max-age=86400"
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("Not found");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`GTAI v2 preview: http://127.0.0.1:${port}`);
});
