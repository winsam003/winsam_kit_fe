"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";
import { Calendar, User, ChevronRight, BookOpen, ChevronLeft, Plus, PenLine, Trash2 } from "lucide-react";
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

  // 삭제 처리 함수
  const handleDelete = async (e: React.MouseEvent, postId: string, title: string) => {
    e.preventDefault(); // 링크 이동 방지
    e.stopPropagation(); // 클릭 이벤트가 카드로 퍼지는 것 방지

    const password = prompt(`🚨 [삭제 확인]\n"${title}" 글을 삭제하시겠습니까?\n관리자 비밀번호를 입력하세요.`);

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        alert("성공적으로 삭제되었습니다.");
        setPosts(posts.filter((p) => p.id !== postId));
      } catch (error) {
        console.log(error);
        alert("삭제 중 오류가 발생했습니다.");

      }
    } else if (password !== null) {
      alert("비밀번호가 올바르지 않습니다.");
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 네비게이션 헤더 */}
        <div className="space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1 text-slate-500 hover:text-emerald-600 transition-colors">
              <ChevronLeft className="w-4 h-4" /> 메인으로
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <BookOpen className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tighter">WinSam Insights.</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/write">
                <Button className="gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-lg rounded-xl font-bold px-5 transition-all active:scale-95">
                  <PenLine className="w-4 h-4" />
                  글쓰기
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-slate-500 font-medium leading-relaxed max-w-2xl px-1 text-sm md:text-base">
            효율적인 작업을 위한 팁과 새로운 도구 소식을 만나보세요. 사용자 여러분의 소중한 경험 공유를 환영합니다.
          </p>
        </div>

        {/* 게시글 리스트 */}
        <div className="grid gap-6">
          {posts.length > 0 ? (
            posts.map((post) => {
              const isAdmin = post.isAdmin === "Y";
              return (
                <div key={post.id} className="relative group">
                  {/* 관리자 삭제 버튼 (호버 시 노출) */}
                  <button
                    onClick={(e) => handleDelete(e, post.id, post.title)}
                    className="absolute top-6 right-6 z-20 p-2.5 bg-white/90 backdrop-blur-sm text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all border border-slate-100 hover:border-rose-200 opacity-0 group-hover:opacity-100 shadow-sm"
                    title="게시글 삭제"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <Link
                    href={`/blog/${post.slug}`}
                    className={`block rounded-[2.5rem] p-8 border transition-all duration-500 ${isAdmin
                        ? "bg-white border-emerald-100 shadow-sm shadow-emerald-50"
                        : "bg-white border-slate-100 shadow-sm"
                      } hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/60`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-4 flex-1 md:pr-10">
                        <div className="flex items-center gap-3">
                          {isAdmin && (
                            <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">
                              OFFICIAL
                            </span>
                          )}
                          <span className="text-xs font-bold text-slate-300 tracking-wider font-mono">
                            {post.createdAt?.toDate?.()?.toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h2 className="text-2xl font-extrabold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
                            {post.title}
                          </h2>
                          <p className="line-clamp-2 text-slate-500 leading-relaxed text-sm md:text-base">
                            {post.content.replace(/[#*`\\]/g, "").substring(0, 160)}...
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200 uppercase">
                            {post.nickname[0]}
                          </div>
                          <span className="text-xs font-bold text-slate-600">{post.nickname}</span>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
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
              <Link href="/admin/write">
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
          <div className="mt-24 flex flex-col items-center gap-4">
            <div className="w-16 h-[1.5px] bg-slate-200"></div>
            <p className="text-slate-300 text-xs font-bold tracking-widest uppercase">End of Insights</p>
          </div>
        )}
      </div>
    </div>
  );
}
