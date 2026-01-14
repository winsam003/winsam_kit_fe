"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Trash2,
  ArrowLeftRight,
  Info,
  ShieldCheck,
  Lock,
  BadgeCheck,
  FileText,
  Zap,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import AdfitBanner from "@/components/AdfitBanner";

export default function DiffCheckerPage() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");

  const handleClear = () => {
    if (confirm("모든 입력 내용을 초기화하시겠습니까?")) {
      setOldText("");
      setNewText("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1 text-slate-500">
            <ChevronLeft className="w-4 h-4" />
            메인으로
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <ArrowLeftRight className="w-8 h-8 text-blue-600" />
          온라인 텍스트 비교 도구 (Diff Checker)
        </h1>
        <p className="text-slate-500 text-lg">두 문서의 차이점을 실시간으로 분석하고 변경된 부분을 추적합니다.</p>
      </div>

      {/* 입력 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full" /> 원본 텍스트 (Original)
            </label>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">BEFORE</span>
          </div>
          <textarea
            className="w-full h-80 p-5 rounded-[1.5rem] border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50 shadow-inner font-mono text-sm transition-all"
            placeholder="원본 내용을 입력하세요..."
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" /> 수정된 텍스트 (Modified)
            </label>
            <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-1 rounded shadow-sm">AFTER</span>
          </div>
          <textarea
            className="w-full h-80 p-5 rounded-[1.5rem] border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50 shadow-inner font-mono text-sm transition-all"
            placeholder="수정된 내용을 입력하세요..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </div>
      </div>

      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center py-8">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>

      {/* 액션 버튼 */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleClear}
          className="rounded-full px-8 gap-2 hover:bg-rose-50 hover:text-rose-600 border-slate-200"
        >
          <Trash2 className="w-4 h-4" /> 입력창 비우기
        </Button>
      </div>

      {/* 비교 결과 영역 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" /> 실시간 비교 결과
          </h2>
          <div className="text-[11px] font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            Word-level Diff Enabled
          </div>
        </div>

        <Card className="border-slate-200 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/40 bg-white">
          <CardContent className="p-0">
            <div className="w-full max-w-full overflow-hidden min-h-[300px]">
              {oldText || newText ? (
                <ReactDiffViewer
                  oldValue={oldText}
                  newValue={newText}
                  splitView={true}
                  compareMethod={DiffMethod.WORDS}
                  leftTitle="ORIGINAL"
                  rightTitle="MODIFIED"
                  styles={
                    {
                      variables: {
                        light: {
                          diffViewerBackground: "#ffffff",
                          addedBackground: "#ecfdf5",
                          addedColor: "#065f46",
                          removedBackground: "#fef2f2",
                          removedColor: "#991b1b",
                          wordAddedBackground: "#bef264",
                          wordRemovedBackground: "#fca5a5",
                        },
                      },
                      contentText: {
                        fontSize: "13px",
                        lineHeight: "22px",
                        fontFamily: "var(--font-geist-mono), monospace",
                        wordBreak: "break-all",
                        whiteSpace: "pre-wrap",
                      },
                    } as any
                  }
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-slate-400 space-y-4">
                  <Search className="w-12 h-12 text-slate-200" />
                  <p className="font-medium">비교할 텍스트를 입력하면 분석 결과가 여기에 표시됩니다.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SEO 및 정보 섹션 (텍스트 비교 전문 가이드) --- */}
      <section className="mt-24 space-y-16 border-t border-slate-100 pt-16 text-slate-700 pb-20">
        {/* 1. 텍스트 비교 도구의 필요성 */}
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
            <FileText className="w-8 h-8 text-blue-600" />
            효율적인 코드 및 문서 검토를 위한 필수 도구
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            복잡한 프로그래밍 코드, 계약서 초안, 혹은 긴 블로그 포스팅을 수정하다 보면{" "}
            <strong>"정확히 어느 부분이 바뀌었는지"</strong>를 놓치기 쉽습니다. WinSam Diff Checker는 두 텍스트 데이터를
            행(Line)과 단어(Word) 단위로 정밀 분석하여 추가된 부분은{" "}
            <span className="text-emerald-600 font-bold">초록색</span>으로, 삭제된 부분은{" "}
            <span className="text-rose-600 font-bold">빨간색</span>으로 명확하게 시각화합니다. 버전 관리 도구 없이도
            가장 빠르고 확실하게 변경 사항을 파악할 수 있습니다.
          </p>
        </div>

        {/* 2. 주요 기능 및 활용 사례 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <BadgeCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-xl text-slate-800">코드 리뷰 및 디버깅</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              작동하던 코드가 갑자기 에러를 발생시킬 때, 이전 백업본과 현재 코드를 비교하여 미세한 구문 오류나 오타를
              찾아낼 수 있습니다. JSON, HTML, CSS 등 모든 소스 코드를 지원합니다.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <BadgeCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xl text-slate-800">문서 버전 대조</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              수정 요청이 반영된 보고서나 계약서에서 변경된 조항을 빠르게 확인해야 하는 법률, 행정 실무자들에게
              필수적입니다. 나란히 보기(Split View) 기능을 통해 문맥의 변화를 한눈에 읽으세요.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <BadgeCheck className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-xl text-slate-800">번역 및 교정 작업</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              번역가가 수정한 결과물과 원문을 대조하거나, 맞춤법 교정 전후의 차이를 분석할 때 유용합니다. 단어 단위 비교
              알고리즘이 아주 미세한 조사 변화까지 잡아냅니다.
            </p>
          </div>
        </div>

        {/* 3. 보안 정보 가이드 (보안 강조) */}
        <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                Enterprise Security Level
              </div>
              <h3 className="text-3xl font-bold leading-tight">
                당신의 소중한 데이터는
                <br />
                <span className="text-blue-400">외부로 유출되지 않습니다.</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> 서버 저장 없이 브라우저 내 처리
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> SSL 보안 암호화 환경 제공
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> 분석 즉시 메모리 데이터 파기
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> 제3자 데이터 접근 원천 차단
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                WinSam Toolbox의 텍스트 비교 도구는 클라이언트 사이드 기술을 사용하여 모든 연산이 사용자의 기기에서만
                이루어집니다. 중요한 기업 기밀 문서나 개인정보가 포함된 텍스트도 안심하고 비교하세요.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-48 h-48 bg-blue-600/10 rounded-full flex items-center justify-center border border-blue-600/20 animate-pulse">
                <Lock className="w-24 h-24 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* 하단 태그 */}
        <div className="flex flex-wrap justify-center gap-3">
          {["Diff Checker", "Text Compare", "코드 비교", "문서 대조", "온라인 비교 도구", "무료 텍스트 분석"].map(
            (tag) => (
              <span key={tag} className="text-[11px] font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
                #{tag}
              </span>
            )
          )}
        </div>
      </section>
    </div>
  );
}
