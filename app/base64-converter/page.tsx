"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Trash2, ArrowLeftRight, BadgeCheck, Lock, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdfitBanner from "@/components/AdfitBanner";

export default function Base64Converter() {
  const [textInput, setTextInput] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [copied, setCopied] = useState(false);

  // 텍스트 -> Base64 변환
  const encodeBase64 = () => {
    try {
      const encoded = btoa(
        encodeURIComponent(textInput).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)))
      );
      setBase64Output(encoded);
    } catch (e) {
      alert("변환 중 오류가 발생했습니다.");
    }
  };

  // Base64 -> 텍스트 변환
  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(
        Array.prototype.map.call(atob(textInput), (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
      );
      setBase64Output(decoded);
    } catch (e) {
      alert("올바른 Base64 형식이 아닙니다.");
    }
  };

  const handleCopy = async () => {
    if (!base64Output) return;
    await navigator.clipboard.writeText(base64Output);
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

      <h1 className="text-3xl font-bold">Base64 인코더 / 디코더</h1>

      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="encode">텍스트 ➔ Base64</TabsTrigger>
          <TabsTrigger value="decode">Base64 ➔ 텍스트</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">입력 데이터</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTextInput("");
                setBase64Output("");
              }}
              className="text-slate-500 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4 mr-1" /> 비우기
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              className="h-40 font-mono"
              placeholder="여기에 텍스트를 입력하세요..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />

            <TabsContent value="encode" className="mt-0">
              <Button onClick={encodeBase64} className="w-full gap-2">
                <ArrowLeftRight className="w-4 h-4" /> 인코딩 (Encode)
              </Button>
            </TabsContent>

            <TabsContent value="decode" className="mt-0">
              <Button onClick={decodeBase64} variant="secondary" className="w-full gap-2">
                <ArrowLeftRight className="w-4 h-4" /> 디코딩 (Decode)
              </Button>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
      <Card className="bg-slate-50 relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-600">결과값</CardTitle>
          <Button variant="outline" size="sm" onClick={handleCopy} disabled={!base64Output}>
            {copied ? <Check className="w-4 h-4 text-green-500 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            복사
          </Button>
        </CardHeader>
        <CardContent>
          <div className="min-h-[100px] p-4 bg-white border rounded-md break-all font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {base64Output || <span className="text-slate-400 font-sans">변환 결과가 여기에 표시됩니다.</span>}
          </div>
        </CardContent>
      </Card>

      {/* --- 설명글 섹션 (사용자 안내) --- */}
      {/* --- 상세 활용 가이드 (Base64 전문 가이드) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700">
        {/* 1. Base64의 정의와 원리 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-mono">
              64
            </span>
            Base64 인코딩이란 무엇이며 왜 사용하나요?
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            <strong>Base64(베이스 육십사)</strong>는 8비트 이진 데이터(Binary Data)를 ASCII 문자 집합에 속하는 64개의
            안전한 문자만 사용하여 표현하는 인코딩 방식입니다. 웹이나 이메일 환경에서는 텍스트가 아닌 바이너리
            데이터(이미지, 실행 파일 등)를 그대로 전송할 경우 시스템 간의 해석 차이로 데이터가 깨지는 문제가 발생할 수
            있습니다. Base64는 이러한 데이터를 텍스트로 표현할 수 있게 합니다. 다만 변조 여부를 확인하려면 별도의 해시
            검증이 필요합니다.
          </p>
        </div>

        {/* 2. 기술 상세 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-blue-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>데이터 안정성 확보</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              네트워크 프로토콜 중 일부는 제어 문자를 포함한 바이너리 데이터를 처리할 때 예기치 않은 동작을 일으킵니다.
              Base64는 이를 영문 대소문자, 숫자, <code className="bg-slate-100 px-1">+</code>,{" "}
              <code className="bg-slate-100 px-1">/</code> 기호로만 치환하여 어떤 시스템에서도 안전하게 통신할 수 있게
              합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-blue-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>Data URI Scheme 활용</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              웹 개발 시 작은 아이콘이나 이미지를 별도의 파일 요청 없이 HTML이나 CSS 내부에 직접 삽입할 때 사용됩니다.
              <code className="bg-slate-100 px-1">data:image/png;base64,...</code> 형식을 사용하면 HTTP 요청 횟수를 줄여
              초기 렌더링 속도를 개선하는 데 도움을 줍니다.
            </p>
          </div>
        </div>

        {/* 3. Base64 작동 원리 (이미지 태그 활용 지점) */}
        <div className="space-y-6 bg-slate-900 text-slate-300 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white">Base64 인코딩의 기술적 메커니즘</h3>
          [Image of Base64 encoding process diagram showing 8-bit binary to 6-bit index conversion]
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">6비트 단위 분할:</span> 8비트(1바이트)씩 처리되는 데이터를
                6비트씩 끊어서 64진법 숫자로 매핑합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">패딩(Padding) 처리:</span> 데이터 길이가 3바이트 배수가 아닐
                경우 끝에 <code className="text-blue-400">=</code> 문자를 붙여 길이를 맞춥니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">용량 증가 현상:</span> 6비트로 변환하는 과정에서 원본
                데이터보다 약 33% 정도 용량이 커지는 특징이 있습니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">URL Safe 변환:</span> URL 파라미터로 사용할 때는{" "}
                <code className="text-blue-400">+</code>와 <code className="text-blue-400">/</code>를 각각{" "}
                <code className="text-blue-400">-</code>와 <code className="text-blue-400">_</code>로 변환하여
                사용하기도 합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 4. 보안 강조 (매우 길게) */}
        <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
          <h3 className="font-bold text-blue-900 text-xl flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            개발자를 위한 무결성 및 보안 고지
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-sm text-slate-600 leading-relaxed">
              Base64는 암호화(Encryption)가 아닌 <strong>인코딩(Encoding)</strong>입니다. 누구나 디코딩 도구를 통해
              원본을 볼 수 있으므로 비밀번호와 같은 민감한 정보를 저장하는 용도로 사용해서는 안 됩니다. WinSam Tools는
              이러한 특성을 고려하여, 사용자가 변환하는 <strong>API 토큰, 인증 헤더 값, 소스코드</strong> 등이 서버에
              로그로 남지 않도록 설계되었습니다.
            </p>
            <div className="bg-white p-4 rounded-xl border border-blue-100 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                <Lock className="w-4 h-4" /> Client-Side Logic Only
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                입력 내용의 인코딩과 디코딩은 브라우저의 자바스크립트 엔진에서 처리되며 별도 변환 서버로 보내지 않습니다.
                페이지 로드가 끝난 뒤에는 변환 과정 자체에 네트워크 연결이 필요하지 않습니다.
              </p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">
              <EyeOff className="w-3 h-3" /> NO_SERVER_SIDE_LOGS
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">
              <BadgeCheck className="w-3 h-3" /> SECURITY_AUDIT_READY
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
