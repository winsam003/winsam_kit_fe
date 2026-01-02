"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, limit, startAfter, QueryDocumentSnapshot } from "firebase/firestore";
import Link from "next/link";
import {
  Calendar,
  User,
  ChevronRight,
  BookOpen,
  ChevronLeft,
  CheckCircle2,
  Megaphone,
  Plus,
  PenLine,
} from "lucide-react";
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
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null); // 마지막으로 불러온 문서 저장
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부

  const POSTS_PER_PAGE = 5; // 한 번에 불러올 글 개수

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

      // 마지막 문서 저장
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
        startAfter(lastVisible), // 저장해둔 마지막 문서 다음부터 가져옴
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
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 네비게이션 & 헤더 생략 (기존 코드와 동일) */}
        <div className="mb-8 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1 text-slate-500 hover:text-emerald-600">
              <ChevronLeft className="w-4 h-4" /> 메인으로
            </Button>
          </Link>

          {/* 방문자용 글쓰기 버튼 추가 */}
          <Link href="/write">
            <Button
              size="sm"
              className="gap-1.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 shadow-sm rounded-xl"
            >
              <PenLine className="w-4 h-4" /> 글쓰기
            </Button>
          </Link>
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
                  className={`group block rounded-[2rem] p-8 border transition-all duration-300 ${
                    isAdmin ? "bg-emerald-50/50 border-emerald-100 shadow-sm" : "bg-white border-slate-100 shadow-sm"
                  } hover:-translate-y-1`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-slate-800">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
                            OFFICIAL
                          </span>
                        )}
                        <h2 className="text-2xl font-bold leading-snug">{post.title}</h2>
                      </div>
                      <p className="line-clamp-1 text-slate-500">
                        {post.content.replace(/[#*`]/g, "").substring(0, 100)}...
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </Link>
              );
            })
          ) : (
            /* 게시글이 없을 때 표시되는 섹션 */
            <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">아직 공유된 인사이트가 없네요.</h3>
              <p className="text-slate-400 text-center mb-8">
                WinSam Toolbox의 첫 번째 주인공이 되어보세요!
                <br />
                유용한 도구 팁이나 의견을 자유롭게 남길 수 있습니다.
              </p>
              <Link href="/write">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95">
                  첫 글 작성하러 가기
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* 더 보기 버튼 섹션 */}
        {hasMore && (
          <div className="mt-12 text-center">
            <Button
              onClick={fetchMorePosts}
              disabled={isMoreLoading}
              variant="outline"
              className="px-8 py-6 rounded-2xl border-slate-200 text-slate-600 hover:bg-white hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm bg-white"
            >
              {isMoreLoading ? (
                <span className="animate-pulse">불러오는 중...</span>
              ) : (
                <span className="flex items-center gap-2 font-bold">
                  더 많은 인사이트 보기 <Plus className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="mt-12 text-center text-slate-400 text-sm">모든 글을 다 읽으셨습니다! 🙌</p>
        )}
      </div>
    </div>
  );
}
