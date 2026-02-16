import { FIELDNOTES } from "@/data/fieldnotes";

const SITE_URL = "https://www.dariolink.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRFC822(dateStr: string): string {
  return new Date(`${dateStr}T08:00:00+08:00`).toUTCString();
}

export function GET() {
  const sorted = [...FIELDNOTES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const items = sorted
    .map((note) => {
      const link = `${SITE_URL}/fieldnotes/${note.slug}`;
      const categories = note.tags
        .map((t) => `        <category>${escapeXml(t)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(note.tldr)}</description>
      <pubDate>${toRFC822(note.date)}</pubDate>
      <guid isPermaLink="true">${link}</guid>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>章东丞 × 晏 — Fieldnotes</title>
    <description>一个人类和他的 AI 的田野笔记。研究、思考、项目动态。</description>
    <link>${SITE_URL}</link>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${toRFC822(sorted[0].date)}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
