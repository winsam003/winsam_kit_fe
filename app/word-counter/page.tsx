"use client";

import { useState } from "react";
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
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" />
            메인으로
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold">실시간 글자수 세기</h1>

      {/* 통계 대시보드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-50">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-500 font-medium">공백 포함</p>
            <p className="text-2xl font-bold text-blue-600">{charCountWithSpace}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-500 font-medium">공백 제외</p>
            <p className="text-2xl font-bold text-blue-600">{charCountWithoutSpace}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-500 font-medium">단어 수</p>
            <p className="text-2xl font-bold text-blue-600">{wordCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-500 font-medium">줄 수</p>
            <p className="text-2xl font-bold text-blue-600">{lineCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>텍스트 입력</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setText("")} className="text-slate-500 hover:text-red-500">
              <Trash2 className="w-4 h-4 mr-1" /> 비우기
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4 text-green-500 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              복사
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            className="font-sans h-[500px] text-lg p-6 resize-none focus-visible:ring-blue-500"
            placeholder="내용을 입력하거나 붙여넣으세요. 실시간으로 글자수가 계산됩니다..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* SEO용 설명 문구 - 나중에 광고 승인 받을 때 중요함 */}
      <Card className="bg-blue-50/50 border-none shadow-none">
        <CardContent className="pt-6">
          <h2 className="font-bold mb-2">💡 팁</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            자기소개서나 블로그 포스팅 시 글자수 제한을 확인하기 좋습니다. 
            작성하신 내용은 브라우저 외부로 전송되지 않으니 안심하고 사용하세요.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}