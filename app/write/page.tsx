"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Type, FileText, Send, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim() || !title.trim() || !content.trim()) {
      alert("모든 빈칸을 채워주세요!");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        nickname,
        isAdmin: "N", // 관리자 아님
        createdAt: serverTimestamp(),
        slug:
          title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "") +
          "-" +
          Math.random().toString(36).substring(2, 7),
      });
      alert("글이 성공적으로 등록되었습니다!");
      router.push("/blog"); // 등록 후 목록으로 이동
    } catch (error) {
      console.error(error);
      alert("등록 실패!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 상단 이동 버튼 */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-1 text-slate-500">
              <ChevronLeft className="w-4 h-4" /> 목록으로
            </Button>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <User className="text-white w-6 h-6" />
            </div>
            Community Write
          </h1>
          <p className="text-slate-500 mt-2">여러분의 소중한 의견을 남겨주세요.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2rem] shadow-xl p-8 space-y-6 border border-slate-100"
        >
          {/* 닉네임 입력창 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <User className="w-3 h-3" /> Nickname
            </label>
            <input
              type="text"
              placeholder="사용하실 닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
            />
          </div>

          {/* 제목 입력창 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <Type className="w-3 h-3" /> Title
            </label>
            <input
              type="text"
              placeholder="글 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 font-bold"
            />
          </div>

          {/* 본문 입력창 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Content (Markdown)
            </label>
            <textarea
              rows={12}
              placeholder="마크다운 형식을 지원합니다..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-5 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 resize-none font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
              ${isSubmitting ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "등록 중..." : "게시글 등록하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
