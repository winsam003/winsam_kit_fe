"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Trash2, ArrowLeftRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Base64Converter() {
  const [textInput, setTextInput] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [copied, setCopied] = useState(false);

  // 텍스트 -> Base64 변환
  const encodeBase64 = () => {
    try {
      const encoded = btoa(encodeURIComponent(textInput).replace(/%([0-9A-F]{2})/g, (match, p1) => 
        String.fromCharCode(parseInt(p1, 16))
      ));
      setBase64Output(encoded);
    } catch (e) {
      alert("변환 중 오류가 발생했습니다.");
    }
  };

  // Base64 -> 텍스트 변환
  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(Array.prototype.map.call(atob(textInput), (c) => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
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
            <Button variant="ghost" size="sm" onClick={() => {setTextInput(""); setBase64Output("");}} className="text-slate-500 hover:text-red-500">
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

      {/* --- 설명글 섹션 (구글 승인용) --- */}
      <div className="mt-12 space-y-8">
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-slate-800">Base64 변환이란 무엇인가요?</h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-3">
            <p>
              <strong>Base64</strong>는 8비트 이진 데이터를 문자 코드에 영향을 받지 않는 공통 64개 ASCII 문자로 바꾸는 인코딩 방식입니다. 
              주로 이메일 첨부 파일 전송, HTML 내부 이미지 삽입, API 통신 시 바이너리 데이터를 안전하게 주고받기 위해 사용됩니다.
            </p>
            <p>
              인코딩(Encoding)은 일반 텍스트를 Base64 코드로 바꾸는 작업이며, 디코딩(Decoding)은 반대로 Base64 코드를 사람이 읽을 수 있는 원래의 텍스트로 되돌리는 작업입니다.
            </p>
          </div>
        </section>

        <Card className="bg-blue-50/50 border-none shadow-none">
          <CardContent className="pt-6">
            <h3 className="font-bold mb-2">🔒 로컬 환경 데이터 처리 안내</h3>
            <p className="text-sm text-slate-600">
              입력하신 모든 민감 정보는 서버로 전송되지 않고 브라우저에서 즉시 처리됩니다. 
              비밀번호나 API 토큰 등을 변환할 때도 외부 유출 걱정 없이 안전하게 활용하실 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}