/**
 * Simple Markdown to HTML converter。
 * 見出し / 段落 / リスト / 順序付きリスト / テーブル / 引用 /
 * 水平線 / コードブロック / 画像 / コールアウト /
 * インライン（**bold** *em* `code` [text](url) ![alt](url)）
 *
 * column と guides で同一レンダラを使うため lib に共通化。
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inline(text: string): string {
  return (
    text
      // 画像は先に処理（リンク [text](url) より前）
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1" loading="lazy" class="rounded-2xl my-6 w-full border border-neutral-200" />'
      )
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )
  );
}

export function markdownToHtml(md: string): string {
  return md
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // Raw HTML ブロック (note.com風リッチ記事用)
      // <div class="col-*"> 等のカスタムコンポーネントクラスで始まる場合は
      // マークダウン処理をスキップしてそのまま出力する
      if (/^<(div|section|figure|aside|article|header|footer|nav)\b/i.test(trimmed)) {
        return trimmed;
      }

      // 水平線（--- / *** / ___ を単独行で）
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        return '<hr class="my-10 border-0 border-t border-neutral-200" />';
      }

      // コードブロック（```lang ... ``` または ``` ... ```）
      const codeBlockMatch = trimmed.match(/^```(\w+)?\s*\n([\s\S]*?)\n```$/);
      if (codeBlockMatch) {
        const [, , code] = codeBlockMatch;
        return `<pre class="bg-neutral-900 text-neutral-100 p-4 rounded-xl overflow-x-auto text-sm my-5 not-prose"><code>${escapeHtml(code)}</code></pre>`;
      }

      // Headings
      if (trimmed.startsWith("### ")) return `<h3>${inline(trimmed.slice(4))}</h3>`;
      if (trimmed.startsWith("## ")) return `<h2>${inline(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith("# ")) return `<h1>${inline(trimmed.slice(2))}</h1>`;

      // Unordered list
      if (trimmed.match(/^[-*] /m)) {
        const items = trimmed.split("\n").filter((l) => l.match(/^[-*] /));
        return `<ul>${items
          .map((l) => `<li>${inline(l.replace(/^[-*] /, ""))}</li>`)
          .join("")}</ul>`;
      }

      // Ordered list
      if (trimmed.match(/^\d+\. /m)) {
        const items = trimmed.split("\n").filter((l) => l.match(/^\d+\. /));
        return `<ol>${items
          .map((l) => `<li>${inline(l.replace(/^\d+\. /, ""))}</li>`)
          .join("")}</ol>`;
      }

      // Table（モバイルでも横スクロールできるようラッパを付ける）
      if (trimmed.includes("|") && trimmed.includes("---")) {
        const rows = trimmed
          .split("\n")
          .filter((l) => l.includes("|") && !l.match(/^\|[\s-|]+\|$/));
        if (rows.length >= 1) {
          const headerCells = rows[0]
            .split("|")
            .filter(Boolean)
            .map((c) => c.trim());
          const bodyRows = rows.slice(1);
          const thead = `<thead><tr>${headerCells
            .map((c) => `<th>${inline(c)}</th>`)
            .join("")}</tr></thead>`;
          const tbody =
            bodyRows.length > 0
              ? `<tbody>${bodyRows
                  .map(
                    (r) =>
                      `<tr>${r
                        .split("|")
                        .filter(Boolean)
                        .map((c) => `<td>${inline(c.trim())}</td>`)
                        .join("")}</tr>`
                  )
                  .join("")}</tbody>`
              : "";
          return `<div class="my-6 -mx-4 sm:mx-0 overflow-x-auto not-prose"><table class="min-w-full text-sm border border-neutral-200 rounded-xl overflow-hidden"><thead class="bg-neutral-50">${thead.replace("<thead>", "").replace("</thead>", "")}</thead><tbody class="bg-white">${tbody.replace("<tbody>", "").replace("</tbody>", "")}</tbody></table></div>`;
        }
      }

      // Callout — :::info / :::warning / :::success / :::tip
      const calloutMatch = trimmed.match(/^:::(info|warning|success|tip)\s*\n([\s\S]+?)\n:::$/);
      if (calloutMatch) {
        const [, variant, body] = calloutMatch;
        const styles: Record<
          string,
          { bg: string; border: string; icon: string; label: string }
        > = {
          info: { bg: "bg-blue-50", border: "border-blue-400", icon: "💡", label: "ポイント" },
          warning: { bg: "bg-amber-50", border: "border-amber-400", icon: "⚠️", label: "注意" },
          success: { bg: "bg-emerald-50", border: "border-emerald-400", icon: "✅", label: "うまくいったサイン" },
          tip: { bg: "bg-violet-50", border: "border-violet-400", icon: "💬", label: "ひとこと" },
        };
        const s = styles[variant];
        return `<div class="${s.bg} border-l-4 ${s.border} px-5 py-4 my-6 rounded-r-xl not-prose"><div class="flex items-start gap-3"><span class="text-xl leading-none pt-0.5">${s.icon}</span><div class="flex-1"><div class="text-xs font-bold text-neutral-700 mb-1.5 tracking-wide">${s.label}</div><div class="text-sm text-neutral-700 leading-relaxed">${inline(body)}</div></div></div></div>`;
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        return `<blockquote>${inline(trimmed.replace(/^> /gm, ""))}</blockquote>`;
      }

      // 単独画像（1行で !alt(url) のみ）は段落ラッパーなしでそのまま
      if (/^!\[[^\]]*\]\([^)]+\)$/.test(trimmed)) {
        return inline(trimmed);
      }

      return `<p>${inline(trimmed)}</p>`;
    })
    .join("\n");
}
