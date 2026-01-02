"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, limit, startAfter, QueryDocumentSnapshot } from "firebase/firestore";
import Link from "next/link";
import { Calendar, User, ChevronRight, BookOpen, ChevronLeft, Plus, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  nickname: string;
  createdAt: any;
  slug: string;
  content: string;
  isAdmin?: string;
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const POSTS_PER_PAGE = 5;

  // 처음 데이터를 가져오는 함수
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(POSTS_PER_PAGE));
      const querySnapshot = await getDocs(q);

      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(fetchedPosts);

      if (querySnapshot.docs.length < POSTS_PER_PAGE) {
        setHasMore(false);
      } else {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // '더 보기' 버튼 클릭 시 실행되는 함수
  const fetchMorePosts = async () => {
    if (!lastVisible || isMoreLoading) return;

    setIsMoreLoading(true);
    try {
      const nextQ = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(POSTS_PER_PAGE)
      );

      const querySnapshot = await getDocs(nextQ);

      if (querySnapshot.empty) {
        setHasMore(false);
      } else {
        const morePosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setPosts((prev) => [...prev, ...morePosts]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        if (querySnapshot.docs.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setIsMoreLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 상단 네비게이션 액션 바 */}
        <div className="mb-10 flex justify-between items-center bg-white/60 p-3 rounded-2xl backdrop-blur-md border border-white shadow-sm sticky top-6 z-50">
          <Link href="/">
            <Button
              variant="ghost"
              className="group gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-tight">메인으로</span>
            </Button>
          </Link>

          <Link href="/write">
            <Button className="gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200 rounded-xl font-bold px-5">
              <PenLine className="w-4 h-4" />
              글쓰기
            </Button>
          </Link>
        </div>

        {/* 페이지 헤더 */}
        <div className="mb-12 px-2">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">
            WinSam Insights<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
            효율적인 작업을 위한 팁과 새로운 도구 소식을 만나보세요. 사용자 여러분의 소중한 경험 공유를 환영합니다.
          </p>
        </div>

        {/* 게시글 리스트 */}
        <div className="grid gap-6">
          {posts.length > 0 ? (
            posts.map((post) => {
              const isAdmin = post.isAdmin === "Y";
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group block rounded-[2.5rem] p-8 border transition-all duration-500 ${
                    isAdmin
                      ? "bg-white border-emerald-100 shadow-sm shadow-emerald-50"
                      : "bg-white border-slate-100 shadow-sm"
                  } hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/60`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        {isAdmin && (
                          <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">
                            OFFICIAL
                          </span>
                        )}
                        <span className="text-xs font-bold text-slate-300 tracking-wider font-mono">
                          {post.createdAt?.toDate?.()?.toLocaleDateString("ko-KR")}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl font-extrabold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="line-clamp-2 text-slate-500 leading-relaxed text-sm">
                          {post.content.replace(/[#*`]/g, "").substring(0, 150)}...
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 text-slate-400">
                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {post.nickname[0]}
                        </div>
                        <span className="text-xs font-semibold">{post.nickname}</span>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            /* 게시글이 없을 때 */
            <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">첫 번째 인사이트를 기다리고 있어요</h3>
              <p className="text-slate-400 text-center mb-8 leading-relaxed px-6">
                아직 등록된 게시글이 없습니다.
                <br />
                당신의 유용한 팁을 가장 먼저 공유해보세요!
              </p>
              <Link href="/write">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-7 rounded-2xl font-black shadow-xl shadow-emerald-100 transition-all active:scale-95 text-lg">
                  지금 바로 작성하기
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* 더 보기 버튼 섹션 */}
        {hasMore && (
          <div className="mt-16 text-center">
            <Button
              onClick={fetchMorePosts}
              disabled={isMoreLoading}
              variant="outline"
              className="px-10 py-7 rounded-2xl border-slate-200 text-slate-600 hover:bg-white hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm bg-white font-bold text-lg group"
            >
              {isMoreLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>로드 중...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  더 많은 이야기 불러오기 <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </span>
              )}
            </Button>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="mt-20 flex flex-col items-center gap-4">
            <div className="w-12 h-1px bg-slate-200"></div>
            <p className="text-slate-400 text-sm font-medium tracking-tighter">모든 인사이트를 다 확인하셨습니다! 🙌</p>
          </div>
        )}
      </div>
    </div>
  );
}
