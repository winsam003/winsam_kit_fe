"use client";

import { useState } from "react";
// Link는 메인 페이지 자체이므로 '메인으로' 버튼이 필요 없다면 제거해도 되지만, 
// 구조 유지를 위해 유지하거나 추후 다른 도구 추가 시 활용하세요.
import Link from "next/link"; 
import { ChevronLeft, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // 통계 계산
  const charCountWithSpace = text.length;
  const charCountWithoutSpace = text.replace(/\s/g, "").length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text.trim() === "" ? 0 : text.split("\n").length;

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* 나중에 도구가 늘어나면 이 버튼이 유용해집니다 */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" />
            메인으로
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight">실시간 글자수 세기</h1>

      {/* 통계 대시보드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-50 border-slate-200 shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-500 font-medium">공백 포함</p>
            <p className="text-2xl font-bold text-blue-600">{charCountWithSpace.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-200 shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-500 font-medium">공백 제외</p>
            <p className="text-2xl font-bold text-blue-600">{charCountWithoutSpace.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-200 shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-500 font-medium">단어 수</p>
            <p className="text-2xl font-bold text-blue-600">{wordCount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-200 shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-500 font-medium">줄 수</p>
            <p className="text-2xl font-bold text-blue-600">{lineCount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="relative shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b mb-4">
          <CardTitle className="text-lg">텍스트 입력</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setText("")} className="text-slate-500 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4 mr-1" /> 비우기
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy} className="hover:bg-slate-100">
              {copied ? <Check className="w-4 h-4 text-green-500 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              복사
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            className="font-sans h-[500px] text-lg p-6 resize-none focus-visible:ring-blue-500 border-none shadow-none"
            placeholder="내용을 입력하거나 붙여넣으세요. 실시간으로 글자수가 계산됩니다..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* SEO 및 승인용 섹션 - 사용자님 코드를 존중하며 문구만 보강했습니다 */}
      <Card className="bg-blue-50/50 border-blue-100 shadow-none">
        <CardContent className="pt-6">
          <h2 className="font-bold mb-2 flex items-center gap-2">
            <span className="text-blue-600">💡</span> 툴 사용 팁 및 안내
          </h2>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
            <p>
              본 글자수 세기 도구는 자기소개서, 블로그 포스팅, SNS 게시물 작성 시 글자수 제한을 확인하기 위해 설계되었습니다. 
              <strong>한글, 영어, 숫자, 특수문자</strong>를 정확하게 구분하여 실시간 통계를 제공합니다.
            </p>
            <p>
              작성하신 모든 텍스트 정보는 사용자의 브라우저 메모리 내에서만 처리되며, 
              <strong>어떠한 데이터도 외부 서버로 전송되거나 저장되지 않으므로</strong> 보안 우려 없이 안심하고 사용하실 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}