import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { isPublishedPost } from "@/lib/published-posts";

interface Post {
  id: string;
  title: string;
  nickname: string;
  createdAt?: Timestamp;
  slug: string;
  content: string;
  isAdmin?: string;
}

export const revalidate = 3600;

async function getPublishedPosts(): Promise<Post[]> {
  try {
    const snapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")));
    return snapshot.docs
      .map((document) => ({ id: document.id, ...document.data() }) as Post)
      .filter((post) => isPublishedPost(post) && post.title && post.slug && post.content);
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
}

function summary(markdown: string) {
  return markdown.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`~\[\]()!-]/g, " ").replace(/\s+/g, " ").trim();
}

export default async function BlogListPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold tracking-tight">메인으로</span>
            </Button>
          </Link>
        </div>

        <header className="mb-12 px-2">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">
            웹 도구 활용 가이드<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
            직접 만든 도구의 사용법, 동작 원리, 실제 업무에서 확인한 활용 방법을 기록합니다.
          </p>
        </header>

        <div className="grid gap-6">
          {posts.length > 0 ? posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-[2.5rem] p-8 border bg-white border-emerald-100 shadow-sm shadow-emerald-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg tracking-widest">
                      WINSAM EDITORIAL
                    </span>
                    {post.createdAt && (
                      <time className="text-xs font-bold text-slate-400" dateTime={post.createdAt.toDate().toISOString()}>
                        {post.createdAt.toDate().toLocaleDateString("ko-KR")}
                      </time>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="line-clamp-2 text-slate-500 leading-relaxed text-sm">{summary(post.content).slice(0, 180)}</p>
                  </div>
                  <p className="text-xs font-semibold text-slate-400">작성자: {post.nickname || "WinSam 운영자"}</p>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          )) : (
            <div className="py-24 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-200">
              <BookOpen className="w-10 h-10 text-slate-300 mb-5" />
              <h2 className="text-xl font-bold text-slate-800">공개된 가이드가 없습니다.</h2>
              <p className="text-slate-400 mt-2">검토를 마친 운영자 작성 글만 이곳에 표시됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
