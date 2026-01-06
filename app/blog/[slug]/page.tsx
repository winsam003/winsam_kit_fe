"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, User, ArrowLeft, Share2, Clock } from "lucide-react";
import Link from "next/link";
import AdfitBanner from "@/components/AdfitBanner";

interface Post {
  title: string;
  nickname: string;
  content: string;
  createdAt: any;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // slug가 일치하는 문서 하나를 가져옴
        const q = query(collection(db, "posts"), where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setPost(querySnapshot.docs[0].data() as Post);
        } else {
          // 글을 못 찾으면 목록으로 돌려보냄
          router.push("/blog");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full border-4 border-t-emerald-600 animate-spin"></div>
          <p className="text-slate-400 font-medium">콘텐츠를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 상단 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">목록으로</span>
          </Link>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          ></button>
        </div>
      </nav>

      {/* 포스트 헤더 */}
      <header className="max-w-3xl mx-auto pt-16 px-6">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-6 mt-8 text-slate-400 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs">
              {post.nickname[0]}
            </div>
            <span className="text-slate-700 font-semibold">{post.nickname}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Calendar className="w-4 h-4" />
            {post.createdAt?.toDate
              ? post.createdAt.toDate().toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // 오전/오후 표시
                })
              : "날짜 정보 없음"}
          </div>
        </div>
      </header>

      {/* 포스트 본문 */}
      <main className="max-w-3xl mx-auto px-6 pt-12">
        <div
          className="prose prose-slate prose-lg max-w-none 
    prose-headings:font-black prose-headings:text-slate-900 
    prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
    prose-ul:list-disc prose-ul:pl-6
    prose-p:text-slate-600 prose-p:leading-relaxed"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 태그가 파싱되었을 때 스타일이 안 먹는 경우를 대비한 직접 지정
              h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 border-b pb-2" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-8 mb-4" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
            }}
          >
            {post.content
              // 1. 실제 줄바꿈 문자로 치환
              .split("\\n")
              .join("\n")
              // 2. 제목(#) 기호가 문장 중간에 붙어있으면 강제로 줄바꿈과 공백 추가
              .replace(/(#+)([^#\s])/g, "\n\n$1 $2")
              // 3. 문장 중간에 숨은 ## 처리
              .replace(/([^\n])(##+)/g, "$1\n\n$2")
              // 4. 리스트 기호(*) 처리
              .replace(/([^\n])(\* )/g, "$1\n$2")}
          </ReactMarkdown>
        </div>
      </main>
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
      <footer className="max-w-3xl mx-auto px-6 mt-20">
        <div className="p-10 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
          <h3 className="text-lg md:text-xl font-medium text-slate-700 italic leading-relaxed">
            "Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple."
          </h3>
          <p className="text-sm text-slate-400 mt-4 font-bold tracking-widest uppercase">— Steve Jobs</p>
        </div>
      </footer>
    </div>
  );
}
