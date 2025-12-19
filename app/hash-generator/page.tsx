"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Trash2, Fingerprint, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashResult, setHashResult] = useState("");
  const [copied, setCopied] = useState(false);

  // SHA-256 해시 생성 함수 (브라우저 내장 Crypto API 사용)
  const generateSHA256 = async (text: string) => {
    if (!text) return;
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHashResult(hashHex);
  };

  // MD5는 브라우저 내장 API가 없어서 간단한 SHA-256 위주로 먼저 구현하거나 
  // 필요시 라이브러리를 써야 하지만, 우선 가장 많이 쓰이는 SHA-256을 메인으로 잡았습니다.

  const handleCopy = async () => {
    if (!hashResult) return;
    await navigator.clipboard.writeText(hashResult);
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

      <div className="flex items-center gap-3">
        <Fingerprint className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold">해시(Hash) 생성기</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">원본 텍스트 입력</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {setInput(""); setHashResult("");}} 
            className="text-slate-500 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4 mr-1" /> 비우기
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            className="h-40 font-mono"
            placeholder="해시를 생성할 텍스트를 입력하세요..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              generateSHA256(e.target.value); // 입력 즉시 실시간 생성
            }}
          />
        </CardContent>
      </Card>

      <Card className="border-blue-100 bg-blue-50/30 relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-medium text-blue-800">SHA-256 해시 결과</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy} disabled={!hashResult} className="bg-white">
            {copied ? <Check className="w-4 h-4 text-green-500 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            복사
          </Button>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white border rounded-md break-all font-mono text-sm text-blue-700 leading-relaxed shadow-sm">
            {hashResult || <span className="text-slate-400 font-sans">텍스트를 입력하면 해시값이 자동으로 생성됩니다.</span>}
          </div>
        </CardContent>
      </Card>

      {/* --- 설명글 섹션 (구글 승인용) --- */}
      <div className="mt-12 space-y-8">
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-slate-800">해시(Hash) 함수란 무엇인가요?</h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-4">
            <p>
              <strong>해시 함수</strong>는 임의의 길이를 갖는 데이터를 고정된 길이의 고유한 문자열로 변환하는 알고리즘입니다. 
              마치 사람의 지문처럼, 원본 데이터가 조금만 바뀌어도 결과값이 완전히 달라지기 때문에 데이터의 무결성을 검증하는 데 필수적으로 사용됩니다.
            </p>
            <p>
              그 중 <strong>SHA-256</strong>은 현재 가장 널리 사용되는 표준 해시 알고리즘으로, 보안성이 높고 충돌 위험이 거의 없어 
              블록체인, SSL 인증서, 데이터베이스 암호화 등 현대 보안 기술의 핵심 역할을 담당하고 있습니다.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-50 border-none shadow-none">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2 text-slate-800">단방향 암호화</h3>
              <p className="text-sm text-slate-600">
                해시는 '인코딩'과 달리 다시 원래의 텍스트로 되돌릴 수 없는 <strong>단방향</strong> 특성을 가집니다. 
                따라서 원본 데이터를 보관하지 않고도 비밀번호 일치 여부를 확인할 수 있어 안전합니다.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-50 border-none shadow-none">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2 text-slate-800">데이터 무결성 확인</h3>
              <p className="text-sm text-slate-600">
                파일을 다운로드하거나 데이터를 전송받았을 때, 제공된 해시값과 내가 계산한 해시값을 비교하면 
                전송 과정에서 데이터가 변조되었는지 즉시 파악할 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}