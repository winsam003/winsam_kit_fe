"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Lock, Type, FileText, Send, User, ChevronLeft, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminWritePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("WinSam 관리자");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      alert("관리자 비밀번호가 틀렸습니다.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        nickname,
        isAdmin: "Y",
        status: "draft",
        createdAt: serverTimestamp(),
        slug:
          title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "") // 특수문자 제거
            .replace(/[\s_-]+/g, "-") // 공백/언더바를 하이픈으로
            .replace(/^-+|-+$/g, "") + // 앞뒤 하이픈 제거
          "-" +
          Math.random().toString(36).substring(2, 7),
      });
      alert("초안이 저장되었습니다. 내용 검토 후 공개 승인 목록에 추가해야 외부에 노출됩니다.");
      router.push("/admin/blog"); // 등록 후 관리 목록으로 이동
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 실패!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* 뒤로가기 버튼 영역 */}
        <div className="flex justify-start">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm" className="gap-1 text-slate-500 hover:text-emerald-600 transition-colors">
              <ChevronLeft className="w-4 h-4" /> 관리 목록으로
            </Button>
          </Link>
        </div>

        {/* 헤더 섹션 */}
        <div className="mb-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
              <Lock className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Admin Editor.</h1>
          </div>
          <p className="text-slate-400 font-medium">관리자 전용 공식 인사이트 작성 공간입니다.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 md:p-12 space-y-8 border border-white"
        >
          {/* 비밀번호 입력창 */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-500" /> Admin Access Key
            </label>
            <input
              type="password"
              placeholder="관리자 암호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 focus:bg-white transition-all outline-none font-mono"
              required
            />
          </div>

          <div className="space-y-6">
            {/* 제목 입력 */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Title</label>
              <input
                type="text"
                placeholder="인사이트의 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 focus:bg-white transition-all outline-none text-lg font-bold"
                required
              />
            </div>

            {/* 본문 입력 */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Content (Markdown)
              </label>
              <textarea
                rows={12}
                placeholder="마크다운 문법을 사용하여 내용을 작성하세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-6 py-6 bg-slate-50 border-2 border-transparent rounded-3xl focus:border-emerald-500 focus:bg-white transition-all outline-none resize-none leading-relaxed"
                required
              />
            </div>
          </div>

          {/* 등록 버튼 */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-8 rounded-[1.5rem] font-black text-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>업로드 중...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                <span>공식 포스트 등록</span>
              </div>
            )}
          </Button>
        </form>

        <p className="text-center text-slate-300 text-xs font-medium">
          저장된 글은 자동 공개되지 않습니다. 검토 후 공개 승인 목록에 slug를 추가해야 외부에 노출됩니다.
        </p>
      </div>
    </div>
  );
}
