"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Link2, Copy, Check, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function UrlConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // URL 인코딩 (특수문자 -> %형태)
  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (e) {
      alert("인코딩 중 오류가 발생했습니다.");
    }
  };

  // URL 디코딩 (%형태 -> 특수문자)
  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      alert("올바르지 않은 URL 형식입니다.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Link2 className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">URL 인코딩/디코딩</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RefreshCw className="w-4 h-4 mr-2" /> 초기화
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* 입력 섹션 */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <label className="text-sm font-semibold text-slate-700">변환할 텍스트 입력 (!@#$% 등 포함)</label>
            <Textarea 
              placeholder="여기에 텍스트나 URL을 입력하세요..." 
              className="min-h-[150px] font-mono text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleEncode} className="flex-1 bg-blue-600 hover:bg-blue-700">
                인코딩 (Encode)
              </Button>
              <Button onClick={handleDecode} variant="outline" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50">
                디코딩 (Decode)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 결과 섹션 */}
        <Card className="border-slate-200 shadow-sm bg-slate-50/50">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">변환 결과</label>
              <Button 
                onClick={handleCopy} 
                variant="ghost" 
                size="sm" 
                disabled={!output}
                className="text-blue-600 hover:text-blue-700"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                결과 복사
              </Button>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-md min-h-[100px] break-all font-mono text-sm">
              {output || <span className="text-slate-400 italic">결과가 여기에 표시됩니다.</span>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 정보 섹션 */}
      <section className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
        <div className="space-y-2">
          <h2 className="text-md font-bold text-amber-900">왜 인코딩이 필요한가요?</h2>
          <p className="text-sm text-amber-800 leading-relaxed">
            URL은 ASCII 문자 집합만 사용할 수 있습니다. 따라서 <strong>! @ # $ % & + =</strong> 같은 특수문자나 한글은 네트워크를 통해 안전하게 전달하기 위해 16진수 형태(예: %21)로 변환해야 합니다.
          </p>
        </div>
      </section>
    </div>
  );
}