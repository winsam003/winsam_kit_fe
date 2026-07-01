import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface SitemapPost {
  slug?: string;
  createdAt?: Timestamp;
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" };
    return entities[character];
  });
}

export async function GET() {
  const snapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")));
  const urls = snapshot.docs
    .map((document) => document.data() as SitemapPost)
    .filter((post): post is SitemapPost & { slug: string } => Boolean(post.slug))
    .map((post) => {
      const loc = escapeXml(`${SITE_URL}/blog/${post.slug}`);
      const lastmod = post.createdAt?.toDate().toISOString();
      return `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
