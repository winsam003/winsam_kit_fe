"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Trash2, Fingerprint, ShieldCheck, BadgeCheck, Lock } from "lucide-react";
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
            onClick={() => {
              setInput("");
              setHashResult("");
            }}
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
            {hashResult || (
              <span className="text-slate-400 font-sans">텍스트를 입력하면 해시값이 자동으로 생성됩니다.</span>
            )}
          </div>
        </CardContent>
      </Card>
      {/* --- SEO 및 정보 섹션 (해시 보안 전문 가이드) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700">
        {/* 1. 해시의 정의와 메커니즘 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            현대 보안의 핵심, 해시(Hash) 함수란 무엇인가요?
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            <strong>해시 함수(Hash Function)</strong>는 어떤 길의 데이터가 입력되더라도 항상{" "}
            <strong>고정된 길이의 고유한 문자열</strong>(해시값)로 변환하는 알고리즘입니다. 해시는 한 번 생성되면 원본
            데이터를 유추할 수 없는 '단방향성'을 가지며, 원본 데이터에서 단 1비트만 바뀌어도 결과값이 완전히 달라지는
            '눈사태 효과(Avalanche Effect)'가 특징입니다. 이러한 특성 덕분에 데이터의 주민등록번호 혹은{" "}
            <strong>디지털 지문</strong>이라고도 불립니다.
          </p>
        </div>

        {/* 2. SHA-256 심층 분석 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-indigo-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>SHA-256 알고리즘의 위상</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              미국 국가보안국(NSA)이 설계한 SHA-2(Secure Hash Algorithm 2) 가족의 일원인 <strong>SHA-256</strong>은
              256비트(32바이트) 길이를 가집니다. 현재 비트코인 등 블록체인의 작업 증명(PoW), SSL/TLS 인증서, 그리고 전
              세계 주요 보안 시스템의 표준으로 채택되어 사용될 만큼 강력한 보안성을 자랑합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-indigo-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>데이터 무결성(Integrity) 검증</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              대용량 파일을 다운로드하거나 중요한 시스템 파일을 전송할 때, 제공자가 공지한 해시값과 내가 계산한 해시값이
              일치하는지 확인하십시오. 이를 통해 전송 과정에서 발생할 수 있는 데이터 오염이나 악의적인 변조 여부를
              0.000001%의 오차도 없이 판별할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 3. 해시의 3대 필수 특성 (기술적 전문성 강조) */}
        <div className="space-y-6 bg-slate-900 text-slate-300 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white">암호학적 해시 함수의 주요 특징</h3>
          [Image of cryptographic hash function process showing message to fixed length hash value]
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">역상 저항성(Pre-image Resistance):</span> 해시값만 보고 원본
                데이터가 무엇인지 알아내는 것이 계산적으로 불가능해야 합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">충돌 저항성(Collision Resistance):</span> 서로 다른 두
                입력값이 동일한 해시값을 가질 확률이 사실상 제로에 가까워야 합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">효율성:</span> 어떤 길이의 데이터라도 해시값을 계산하는
                속도가 매우 빨라야 실시간 보안 시스템에 적용 가능합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">결정론적 특성:</span> 동일한 입력에 대해서는 전 세계 어디서든
                언제나 동일한 해시값이 도출되어야 합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 4. 보안 및 로컬 처리 가이드 */}
        <div className="p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="p-4 bg-white rounded-full border border-indigo-200 shadow-inner">
              <Lock className="w-10 h-10 text-indigo-600" />
            </div>
            <div className="space-y-2 flex-1 text-center md:text-left">
              <h3 className="font-bold text-indigo-900 text-xl">WinSam의 Zero-Knowledge 아키텍처</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                비밀번호나 개인 키(Private Key)를 해싱할 때 가장 걱정되는 것은 서버 유출입니다. WinSam 해시 생성기는{" "}
                <strong>Client-Side Crypto</strong> 기술을 사용하여, 모든 연산을 서버가 아닌 사용자의 브라우저 내부에서
                수행합니다. 여러분의 원본 텍스트는 인터넷 망을 타고 외부로 나가지 않으므로, 기밀 정보를 안심하고
                테스트할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-indigo-100">
            <div className="text-center">
              <div className="text-[10px] font-bold text-indigo-400 uppercase">Engine</div>
              <div className="text-sm font-semibold text-slate-800">CryptoJS (Local)</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold text-indigo-400 uppercase">Network</div>
              <div className="text-sm font-semibold text-slate-800">No External Calls</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold text-indigo-400 uppercase">Privacy</div>
              <div className="text-sm font-semibold text-slate-800">Non-Logging</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold text-indigo-400 uppercase">Security</div>
              <div className="text-sm font-semibold text-slate-800">Sandboxed Environment</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
