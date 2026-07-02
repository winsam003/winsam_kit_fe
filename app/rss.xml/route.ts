import { collection, getDocs, limit, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { isPublishedPost } from "@/lib/published-posts";

export const dynamic = "force-dynamic";

interface FeedPost {
  title?: string;
  slug?: string;
  content?: string;
  nickname?: string;
  createdAt?: Timestamp;
  isAdmin?: string;
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" };
    return entities[character];
  });
}

function cdata(value: string) {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]><![CDATA[>")}]]>`;
}

export async function GET() {
  const snapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(50)));
  const items = snapshot.docs
    .map((document) => document.data() as FeedPost)
    .filter(
      (post): post is FeedPost & { title: string; slug: string; content: string } =>
        isPublishedPost(post) && Boolean(post.title && post.slug && post.content),
    )
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(url)}</link><guid isPermaLink="true">${escapeXml(url)}</guid><description>${cdata(post.content)}</description>${post.nickname ? `<dc:creator>${escapeXml(post.nickname)}</dc:creator>` : ""}${post.createdAt ? `<pubDate>${post.createdAt.toDate().toUTCString()}</pubDate>` : ""}</item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>${SITE_NAME}</title><link>${SITE_URL}/blog</link><description>웹 도구 활용 가이드와 생산성 팁</description><language>ko-KR</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
