"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, RefreshCw, Type, ShieldCheck, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [isKorean, setIsKorean] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const latinSource = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];

  const koreanSource = [
    "모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다.",
    "국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다.",
    "모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 차별을 받지 아니한다.",
    "정부는 경제의 안정과 성장을 기하고 전국의 균형 있는 발전을 위하여 노력하여야 한다.",
    "문화유산의 보존·계승 및 민족문화의 창달에 노력하여야 한다.",
  ];

  const generateLorem = () => {
    const source = isKorean ? koreanSource : latinSource;
    let output = "";
    for (let i = 0; i < paragraphs; i++) {
      // 랜덤하게 문장을 조합하여 문단 생성
      const shuffled = [...source].sort(() => 0.5 - Math.random());
      output += shuffled.join(" ") + "\n\n";
    }
    setResult(output.trim());
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" /> 메인으로
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Type className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold">더미 데이터 생성기</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>문단 수: {paragraphs}개</Label>
            </div>
            <Slider value={[paragraphs]} onValueChange={(val) => setParagraphs(val[0])} max={10} min={1} step={1} />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-base">한글 입숨 사용</Label>
              <p className="text-sm text-slate-500">영어 대신 한글 문장을 생성합니다.</p>
            </div>
            <Switch checked={isKorean} onCheckedChange={setIsKorean} />
          </div>

          <Button onClick={generateLorem} className="w-full h-12 gap-2 text-lg">
            <RefreshCw className="w-5 h-5" /> 데이터 생성하기
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="relative animate-in fade-in slide-in-from-bottom-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <CardTitle className="text-sm font-medium">생성된 결과</CardTitle>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4 text-green-500 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              복사
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-serif">{result}</div>
          </CardContent>
        </Card>
      )}

      {/* --- SEO 및 정보 섹션 (로렘 입숨 전문 가이드) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700">
        {/* 1. 개념 정의 및 역사 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-serif">
              Aa
            </span>
            로렘 입숨(Lorem Ipsum)과 더미 데이터의 역할
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            <strong>로렘 입숨(Lorem Ipsum)</strong>은 출판, 그래픽 디자인, 웹 개발 분야에서 최종 결과물이 나오기 전
            레이아웃이나 폰트의 시각적 요소를 확인하기 위해 사용하는 <strong>표준 채우기용 더미 텍스트</strong>입니다.
            단순히 "가나다라"나 "ABC"를 반복하는 것보다 실제 문장과 유사한 단어 분포와 간격을 가지고 있어, 디자인의
            완성도를 객관적으로 평가하는 데 필수적인 도구입니다.
          </p>
        </div>

        {/* 2. 한글/영문 활용 사례 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-slate-400 transition-colors">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
              <BadgeCheck className="w-5 h-5 text-blue-600" />
              <h3>영문 로렘 입숨의 유래</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              현재 전 세계적으로 통용되는 영문 로렘 입숨은 기원전 45년 로마의 정치가 키케로가 쓴 '선과 악의 끝(De
              Finibus Bonorum et Malorum)'에서 유래되었습니다. 의미가 없는 것처럼 보이지만 철저히 계산된 라틴어 단어
              조합으로 구성되어 있어, 영문권 타이포그래피의 리듬감을 확인하는 데 최적화되어 있습니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-slate-400 transition-colors">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
              <BadgeCheck className="w-5 h-5 text-blue-600" />
              <h3>한글 입숨의 필요성</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              한글은 영문과 달리 글자의 밀도가 높고 복잡한 획을 가지고 있습니다. 따라서 국내 웹 서비스 개발 시에는 한글
              전용 더미 데이터가 반드시 필요합니다. WinSam Toolbox는 대한민국 헌법 등을 활용하여 한글 폰트의 가독성과
              자간, 행간을 정확히 테스트할 수 있는 텍스트를 생성합니다.
            </p>
          </div>
        </div>

        {/* 3. 디자인 활용 팁 (전문성 강조) */}
        <div className="space-y-6 bg-slate-100 p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900">UI/UX 프로토타이핑 활용 팁</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-slate-900 font-semibold">정보 왜곡 방지:</span> 의미 있는 문장을 쓰면 기획자나
                클라이언트가 디자인이 아닌 '내용'에 집중하게 됩니다. 입숨을 사용하여 디자인 자체의 균형감에 집중하도록
                유도하세요.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-slate-900 font-semibold">그리드 시스템 테스트:</span> 반응형 웹 디자인 시 텍스트
                양에 따라 레이아웃이 어떻게 변하는지(Truncate, Wrap 등) 확인하는 테스트 데이터로 활용하세요.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-slate-900 font-semibold">웹 폰트 렌더링 확인:</span> 다양한 두께(Weight)와
                크기(Size)의 폰트가 실제 문단에서 어떻게 렌더링되는지 시각적으로 검증할 수 있습니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-slate-900 font-semibold">다국어 환경 고려:</span> 한글과 영문 텍스트를 섞어서
                생성해 봄으로써 다국어 사이트의 줄바꿈 규칙이나 폰트 조화를 미리 체크하세요.
              </p>
            </div>
          </div>
        </div>

        {/* 4. 개인정보 및 보안 (통일성 유지) */}
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="space-y-2 flex-1">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" /> No Data Leak & Pure Text
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              본 도구가 생성하는 텍스트는 서버의 DB를 거치지 않고 자바스크립트 엔진을 통해 실시간으로 생성됩니다. 복사한
              데이터를 어디에 붙여넣든 어떠한 추적 코드나 악성 스크립트가 포함되지 않은{" "}
              <strong>순수 텍스트(Plain Text)</strong>임을 보장합니다.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <div className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-400 shadow-sm">
              PURE_TEXT_ONLY
            </div>
            <div className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-400 shadow-sm">
              LOCAL_GENERATION
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
