import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { collection, getDocs, limit, query, Timestamp, where } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import AdfitBanner from "@/components/AdfitBanner";
import { db } from "@/lib/firebase";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

interface Post {
  title: string;
  nickname: string;
  content: string;
  createdAt?: Timestamp;
}

const getPost = cache(async (slug: string): Promise<Post | null> => {
  const postQuery = query(collection(db, "posts"), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(postQuery);
  return snapshot.empty ? null : (snapshot.docs[0].data() as Post);
});

function plainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~\[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMarkdown(content: string) {
  return content
    .split("\\n")
    .join("\n")
    .replace(/(#+)([^#\s])/g, "\n\n$1 $2")
    .replace(/([^\n])(##+)/g, "$1\n\n$2")
    .replace(/([^\n])(\* )/g, "$1\n$2");
}

function firstHeading(content: string) {
  const heading = normalizeMarkdown(content)
    .split("\n")
    .find((line) => /^#\s+/.test(line.trim()));
  return heading?.replace(/^#\s+/, "").replace(/[*_`~]/g, "").trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "게시글을 찾을 수 없습니다", robots: { index: false, follow: false } };

  const description = plainText(post.content).slice(0, 155);
  const title = firstHeading(post.content) || post.title;
  const path = `/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "article",
      publishedTime: post.createdAt?.toDate().toISOString(),
      authors: [post.nickname],
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const publishedAt = post.createdAt?.toDate();
  const title = firstHeading(post.content) || post.title;
  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description: plainText(post.content).slice(0, 155),
    articleBody: plainText(post.content),
    url,
    mainEntityOfPage: url,
    datePublished: publishedAt?.toISOString(),
    dateModified: publishedAt?.toISOString(),
    author: { "@type": "Person", name: post.nickname },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    inLanguage: "ko-KR",
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData).replace(/</g, "\\u003c") }}
      />
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">목록으로</span>
          </Link>
        </div>
      </nav>

      <header className="max-w-3xl mx-auto pt-16 px-6">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">{title}</h1>
        <div className="flex flex-wrap items-center gap-6 mt-8 text-slate-400 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs">
              {post.nickname[0]}
            </div>
            <span className="text-slate-700 font-semibold">{post.nickname}</span>
          </div>
          <time className="flex items-center gap-1.5 text-sm" dateTime={publishedAt?.toISOString()}>
            <Calendar className="w-4 h-4" />
            {publishedAt
              ? publishedAt.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
              : "날짜 정보 없음"}
          </time>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 pt-12">
        <article className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-ul:list-disc prose-ul:pl-6 prose-p:text-slate-600 prose-p:leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ h1: ({ children }) => <h2>{children}</h2> }}
          >
            {normalizeMarkdown(post.content)}
          </ReactMarkdown>
        </article>
      </div>

      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
      <footer className="max-w-3xl mx-auto px-6 mt-20">
        <div className="p-10 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
          <p className="text-lg md:text-xl font-medium text-slate-700 italic leading-relaxed">
            Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple.
          </p>
          <p className="text-sm text-slate-400 mt-4 font-bold tracking-widest uppercase">— Steve Jobs</p>
        </div>
      </footer>
    </div>
  );
}
