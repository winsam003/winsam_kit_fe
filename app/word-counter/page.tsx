"use client";

import { useState } from "react";
// Link는 메인 페이지 자체이므로 '메인으로' 버튼이 필요 없다면 제거해도 되지만,
// 구조 유지를 위해 유지하거나 추후 다른 도구 추가 시 활용하세요.
import Link from "next/link";
import { ChevronLeft, Trash2, Copy, Check, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdfitBanner from "@/components/AdfitBanner";

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
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
      <Card className="relative shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b mb-4">
          <CardTitle className="text-lg">텍스트 입력</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setText("")}
              className="text-slate-500 hover:text-red-500 transition-colors"
            >
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

      {/* --- 상세 활용 가이드 (글자수 세기 전문 가이드) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700">
        {/* 1. 글자수 세기의 중요성 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-mono">
              123
            </span>
            정확한 글자수 확인이 필요한 이유
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            현대 사회의 디지털 글쓰기에서 <strong>글자수 제한</strong>은 어디에나 존재합니다. 대입 및 취업을 위한
            자기소개서, 포털 사이트의 블로그 포스팅, 그리고 SNS 마케팅 문구에 이르기까지 정해진 분량 내에서 메시지를
            전달하는 것은 신뢰도와 가독성의 핵심입니다. WinSam 글자수 세기는 단순히 숫자를 나열하는 것을 넘어,
            플랫폼별로 상이한 계산 기준을 완벽하게 충족할 수 있도록 정밀한 데이터를 제공합니다.
          </p>
        </div>

        {/* 2. 상세 계산 기준 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-blue-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>공백 포함 vs 공백 제외</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              국내 주요 기업의 자기소개서 시스템은 대부분 <strong>공백을 포함한 글자수</strong>를 기준으로 삼습니다.
              공백 또한 문장의 리듬과 호흡을 결정하는 요소로 보기 때문입니다. 반면, 블로그 SEO나 학술 문서에서는 순수
              정보량을 측정하기 위해 공백을 제외한 글자수를 중시하기도 합니다. 본 도구는 두 가지 지표를 실시간으로 모두
              보여주어 혼동을 방지합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-blue-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>글자수와 바이트(Byte)의 차이</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              가장 많이 혼란을 겪는 부분이 바이트 계산입니다. 일반적으로 한글은{" "}
              <strong>2바이트(EUC-KR) 또는 3바이트(UTF-8)</strong>를 차지하며, 영어와 숫자는 1바이트를 차지합니다.
              공공기관이나 일부 구형 시스템은 글자수가 아닌 바이트를 기준으로 제한을 두는 경우가 많으므로, 제출 전
              반드시 바이트 수치를 확인해야 합니다.
            </p>
          </div>
        </div>

        {/* 3. 플랫폼별 가이드 (구체적 활용 안내) */}
        <div className="space-y-6 bg-slate-900 text-slate-300 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white">플랫폼별 최적 글자수 가이드</h3>
          [Image of character count limitations for different social media platforms like Twitter, Instagram, and Blog
          posts]
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">자기소개서:</span> 보통 500자~1,000자 내외로 요구됩니다. 제한
                수량의 90% 이상을 채우되, 마지막 문장이 잘리지 않도록 주의해야 합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">네이버 블로그/SEO:</span> 정보성 글의 경우 최소 1,000자에서
                2,000자 사이를 유지할 때 검색 노출 확률이 높아지는 경향이 있습니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">인스타그램:</span> 캡션은 최대 2,200자까지 가능하지만,
                가독성을 위해 핵심 내용은 앞의 125자 이내에 배치하는 것이 전략적입니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">유튜브 설명란:</span> 최대 5,000자까지 허용되며, 주요
                키워드와 타임스탬프를 포함하여 작성하는 것이 SEO에 유리합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 4. 보안 및 로컬 처리 강조 (기밀 유지) */}
        <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="p-4 bg-white rounded-full border border-blue-200 shadow-inner">
              <Lock className="w-10 h-10 text-blue-600" />
            </div>
            <div className="space-y-2 flex-1 text-center md:text-left">
              <h3 className="font-bold text-blue-900 text-xl flex items-center gap-2 justify-center md:justify-start">
                <ShieldCheck className="w-6 h-6" /> 개인정보 및 기밀 유지를 위한 로컬 처리
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                자기소개서나 기밀 문서의 초안을 온라인 도구에 붙여넣는 것은 보안상 위험할 수 있습니다. WinSam 글자수
                세기는 <strong>모든 텍스트 데이터를 서버로 전송하지 않습니다.</strong>
                분석 작업은 사용자의 웹 브라우저 내에서 처리되며 이 도구가 입력 텍스트를 DB나 로컬 스토리지에 저장하지
                않습니다. 민감한 문서는 소속 조직의 보안 규정을 확인한 뒤 사용하세요.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4 border-t border-blue-100">
            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full uppercase">
              No_Server_Log
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full uppercase">
              Pure_JS_Counting
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full uppercase">
              Zero_External_API
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
