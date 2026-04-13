// Fetch via VPS proxy (Japan IP) for better connectivity to Japanese sites
// Falls back to direct fetch if proxy is unavailable

const PROXY_URL = process.env.FETCH_PROXY_URL || "http://220.158.21.231:3100/fetch";
const PROXY_SECRET = process.env.FETCH_PROXY_SECRET || "fjdxlab-proxy-2026";

interface ProxyFetchResult {
  status: number;
  headers: Record<string, string>;
  body: string;
}

export async function proxyFetch(
  url: string,
  options?: { method?: string; timeout?: number }
): Promise<{ ok: boolean; status: number; text: string }> {
  const method = options?.method || "GET";
  const timeout = options?.timeout || 10000;

  // Try proxy first
  try {
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PROXY_SECRET}`,
      },
      body: JSON.stringify({ url, method, timeout }),
      signal: AbortSignal.timeout(timeout + 5000), // proxy timeout + network overhead
    });

    if (res.ok) {
      const data: ProxyFetchResult = await res.json();
      return {
        ok: data.status >= 200 && data.status < 400,
        status: data.status,
        text: data.body,
      };
    }
  } catch {
    // Proxy failed — fall through to direct fetch
  }

  // Fallback to direct fetch
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "User-Agent": "AITaisakuChecker/1.0 (FUJIMI DX Lab)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ja,en;q=0.9",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(timeout),
    });

    const text = await res.text();
    return {
      ok: res.ok,
      status: res.status,
      text: text.length > 5_000_000 ? text.slice(0, 5_000_000) : text,
    };
  } catch {
    return { ok: false, status: 0, text: "" };
  }
}
