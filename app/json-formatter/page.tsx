"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Trash2, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdfitBanner from "@/components/AdfitBanner";
import { getJsonHighlightLines } from "@/lib/json-highlight";

const groupColors = [
  "border-blue-400 bg-blue-50 text-blue-800",
  "border-violet-400 bg-violet-50 text-violet-800",
  "border-emerald-400 bg-emerald-50 text-emerald-800",
  "border-amber-400 bg-amber-50 text-amber-800",
  "border-rose-400 bg-rose-50 text-rose-800",
  "border-cyan-400 bg-cyan-50 text-cyan-800",
  "border-fuchsia-400 bg-fuchsia-50 text-fuchsia-800",
  "border-lime-400 bg-lime-50 text-lime-800",
];

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };
    try {
      return { output: JSON.stringify(JSON.parse(input), null, 2), error: "" };
    } catch {
      return { output: "", error: "올바른 JSON 형식이 아닙니다." };
    }
  }, [input]);
  const highlightedLines = useMemo(() => (output ? getJsonHighlightLines(output) : []), [output]);

  // 크게보기(전체화면) 상태 관리
  const [isInputFull, setIsInputFull] = useState(false);
  const [isOutputFull, setIsOutputFull] = useState(false);

  // --- [ESC 키 입력 감지 로직] ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsInputFull(false);
        setIsOutputFull(false);
      }
    };

    if (isInputFull || isOutputFull) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInputFull, isOutputFull]);
  // ------------------------------------

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" />
            메인으로
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold">JSON 데이터 정렬기</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* --- Input 영역 --- */}
        <Card
          className={
            isInputFull ? "fixed inset-4 z-50 flex flex-col bg-white shadow-2xl border-2 border-primary" : "relative"
          }
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <CardTitle>Input</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsInputFull(!isInputFull)}
                className="h-7 px-2 text-xs gap-1"
              >
                {isInputFull ? (
                  <>
                    <Minimize2 className="w-3 h-3" /> 작게보기
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3 h-3" /> 크게보기
                  </>
                )}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInput("")}
              className="text-slate-500 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4 mr-1" /> 비우기
            </Button>
          </CardHeader>
          <CardContent className={isInputFull ? "flex-1 p-4 pt-0" : ""}>
            <Textarea
              className={`font-mono resize-none overflow-y-auto p-4 ${
                isInputFull ? "w-full h-[calc(100vh-120px)]" : "h-[600px]"
              }`}
              placeholder="여기에 JSON을 붙여넣으세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* --- Output 영역 --- */}
        <Card
          className={
            isOutputFull ? "fixed inset-4 z-50 flex flex-col bg-white shadow-2xl border-2 border-primary" : "relative"
          }
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <CardTitle>Output</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOutputFull(!isOutputFull)}
                className="h-7 px-2 text-xs gap-1"
              >
                {isOutputFull ? (
                  <>
                    <Minimize2 className="w-3 h-3" /> 작게보기
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3 h-3" /> 크게보기
                  </>
                )}
              </Button>
            </div>
            {output && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex gap-2 items-center transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "복사됨!" : "복사하기"}
              </Button>
            )}
          </CardHeader>
          <CardContent className={isOutputFull ? "flex-1 p-4 pt-0" : ""}>
            <pre
              aria-label="정렬된 JSON 결과"
              tabIndex={0}
              className={`font-mono rounded-md border bg-slate-50 overflow-auto p-4 text-sm leading-6 text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isOutputFull ? "w-full h-[calc(100vh-120px)]" : "h-[600px]"
              }`}
            ><code className="block min-w-max">{highlightedLines.map((line, index) => {
              const indent = line.text.length - line.text.trimStart().length;
              return (
                <span
                  key={index}
                  className={`block border-l-2 px-2 ${line.color === undefined ? "border-transparent" : groupColors[line.color % groupColors.length]}`}
                >
                  {line.keyLength ? <>{line.text.slice(0, indent)}<span className="font-semibold">{line.text.slice(indent, indent + line.keyLength)}</span>{line.text.slice(indent + line.keyLength)}</> : line.text}
                  {index < highlightedLines.length - 1 ? "\n" : ""}
                </span>
              );
            })}</code></pre>
            <p className="mt-2 text-xs text-slate-500">객체·배열 및 DTO별로 색상을 구분합니다. 복사하면 순수 JSON으로 복사됩니다.</p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center font-medium">
          {error}
        </div>
      )}

      {/* 💡 버튼이 있던 자리는 빈 패딩이나 간격으로 처리하여 깔끔하게 정리했습니다. */}
      <div className="pt-4" />

      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>

      {/* 설명 및 FAQ 영역 */}
      <div className="mt-12 space-y-8">
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">JSON 데이터 정렬기란 무엇인가요?</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              <strong>JSON(JavaScript Object Notation)</strong>은 데이터를 저장하고 전송할 때 가장 많이 사용되는 가벼운
              형식입니다. 하지만 서버에서 받아온 데이터나 로그 파일의 JSON은 종종 한 줄로 길게 늘어져 있어 사람이 읽기
              매우 어렵습니다.
            </p>
            <p>
              본 도구는 그렇게 읽기 힘든 &apos;민감한&apos; 데이터를 <strong>Pretty Print</strong> 형식으로 변환하여, 데이터
              구조를 한눈에 파악할 수 있도록 돕습니다. 개발자, 데이터 분석가, 그리고 API 테스트를 진행하는 모든 분들에게
              필수적인 도구입니다.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-50 border-none shadow-none">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">✅ 주요 기능</h3>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
                <li>복잡한 JSON 데이터를 2칸 들여쓰기 표준으로 정렬</li>
                <li>실시간 문법 오류 검사 및 에러 메시지 제공</li>
                <li>원클릭 결과값 클립보드 복사 기능</li>
                <li>대용량 텍스트 처리를 위한 최적화된 스크롤 뷰</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-blue-50/50 border-none shadow-none">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">🔒 보안 안내</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                입력하신 모든 데이터는 <strong>사용자의 브라우저 내에서 실시간으로 처리</strong>됩니다. 서버로 데이터를
                전송하거나 외부에 기록을 남기지 않으므로, API 키나 개인정보가 포함된 중요한 JSON 데이터도 안심하고
                정렬하실 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="p-8">
          <h2 className="text-xl font-bold mb-4 text-slate-800">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-700">Q: 올바른 형식인데 왜 에러가 나나요?</h4>
              <p className="text-sm text-slate-600">
                A: JSON은 작은따옴표(&apos;) 대신 반드시 큰따옴표(&quot;)를 사용해야 하며, 마지막 요소 뒤에 콤마(,)가 찍혀있지
                않은지 확인해 보세요.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700">Q: 데이터 크기 제한이 있나요?</h4>
              <p className="text-sm text-slate-600">
                A: 브라우저의 성능에 따라 수 메가바이트(MB) 수준의 대용량 데이터도 즉시 처리가 가능합니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
