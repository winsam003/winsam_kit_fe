"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, RefreshCw, Type } from "lucide-react";
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
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ];

  const koreanSource = [
    "모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다.",
    "국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다.",
    "모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 차별을 받지 아니한다.",
    "정부는 경제의 안정과 성장을 기하고 전국의 균형 있는 발전을 위하여 노력하여야 한다.",
    "문화유산의 보존·계승 및 민족문화의 창달에 노력하여야 한다."
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
            <Slider
              value={[paragraphs]}
              onValueChange={(val) => setParagraphs(val[0])}
              max={10}
              min={1}
              step={1}
            />
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
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-serif">
              {result}
            </div>
          </CardContent>
        </Card>
      )}

      {/* --- 설명글 섹션 (구글 승인용) --- */}
      <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800">로렘 입숨(Lorem Ipsum)이란?</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          로렘 입숨은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 시각적 요소를 보여줄 때 사용하는 <strong>표준 채우기 텍스트</strong>입니다. 
          내용에 집중하기보다 전체적인 디자인의 구성을 확인하기 위해 의미 없는 문장을 배치하는 용도로 쓰입니다.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          한글 입숨은 한글 폰트의 가독성과 레이아웃을 확인하기 위해 대한민국 헌법 등의 문장을 활용하여 제작되었습니다. 
          사용자의 프로젝트 성격에 맞춰 영어와 한글 중 선택하여 활용해 보세요.
        </p>
      </section>
    </div>
  );
}