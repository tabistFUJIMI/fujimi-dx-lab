/**
 * Simple Markdown to HTML converter。
 * 見出し / 段落 / リスト / 順序付きリスト / テーブル / 引用 / インライン（**bold** *em* `code` [text](url)）に対応。
 *
 * column と guides で同一レンダラを使うため lib に共通化。
 */

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

export function markdownToHtml(md: string): string {
  return md
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

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

      // Table
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
          return `<table>${thead}${tbody}</table>`;
        }
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        return `<blockquote>${inline(
          trimmed.replace(/^> /gm, "")
        )}</blockquote>`;
      }

      return `<p>${inline(trimmed)}</p>`;
    })
    .join("\n");
}
