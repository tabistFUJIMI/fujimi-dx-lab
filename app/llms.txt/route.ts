import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

let cachedContent: string | null = null;

function getContent() {
  if (!cachedContent) {
    cachedContent = readFileSync(
      join(process.cwd(), "content", "llms.txt"),
      "utf-8"
    );
  }
  return cachedContent;
}

export async function GET() {
  return new Response(getContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
