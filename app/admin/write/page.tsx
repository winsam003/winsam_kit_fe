"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Lock, Type, FileText, Send, User } from "lucide-react";

export default function AdminWritePage() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("WinSam 관리자"); // 기본값 설정
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== "4540") {
      alert("관리자 비밀번호가 틀렸습니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        nickname,
        isAdmin: "Y", // 관리자 컬럼 추가
        createdAt: serverTimestamp(),
        slug:
          title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "") +
          "-" +
          Math.random().toString(36).substring(2, 7), // 슬러그 중복 방지
      });
      alert("관리자 포스팅이 등록되었습니다!");
      setTitle("");
      setContent("");
    } catch (error) {
      alert("등록 실패!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI는 아래 UserWritePage와 유사하게 구성하되 '관리자 전용'임을 명시
  return (
    /* 기존 UI 코드와 동일하되 헤더만 "WinSam Admin Editor"로 변경 */
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Lock className="text-white w-6 h-6" />
            </div>
            Admin Editor
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2rem] shadow-xl p-8 space-y-6 border border-emerald-100"
        >
          {/* 비밀번호 입력창 (관리자 전용) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Admin Key
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          {/* 나머지 제목, 본문 입력창은 동일 */}
          <input
            type="text"
            placeholder="글 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <textarea
            rows={10}
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-5 py-5 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <button type="submit" className="w-full py-5 rounded-2xl font-bold text-white bg-emerald-600">
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
