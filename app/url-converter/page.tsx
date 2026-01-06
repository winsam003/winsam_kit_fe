"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Link2, Copy, Check, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import AdfitBanner from "@/components/AdfitBanner";

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
              <Button
                onClick={handleDecode}
                variant="outline"
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                디코딩 (Decode)
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* --- [중단 광고 영역] --- */}
        <div className="flex justify-center my-6">
          <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
        </div>
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
      {/* --- SEO 및 승인용 전문 가이드 섹션 --- */}
      <div className="mt-12 space-y-10 border-t pt-10 text-slate-700">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            URL 인코딩(Percent-Encoding)이란 무엇인가요?
          </h2>
          <p className="leading-relaxed">
            URL 인코딩은 인터넷 주소(URL)에 사용할 수 없는 문자를 안전한 전송을 위해 특수한 형식으로 변환하는
            과정입니다. 공식 명칭은 <strong>퍼센트 인코딩(Percent-encoding)</strong>입니다. URL 표준(RFC 3986)에 따르면,
            URL은 오직 영문자, 숫자, 그리고 몇몇 특수기호만 포함할 수 있도록 설계되었습니다. 이 범위를 벗어나는{" "}
            <strong>한글, 공백, 특수문자(! @ # $ % 등)</strong>를 웹 브라우저가 이해할 수 있도록 변환하는 것이 이 도구의
            핵심 목적입니다.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-slate-50 p-6 rounded-2xl space-y-3 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">왜 인코딩을 해야 하나요?</h3>
            <ul className="text-sm space-y-2 list-disc pl-4 text-slate-600">
              <li>
                <strong>데이터 손실 방지:</strong> URL에서 '&'나 '='는 파라미터를 구분하는 예약어입니다. 데이터 값
                자체에 이 문자가 포함되면 서버가 데이터를 잘못 해석할 수 있습니다.
              </li>
              <li>
                <strong>한글 깨짐 방지:</strong> 한글은 ASCII 표준이 아니기 때문에 인코딩을 거치지 않으면 서버 전송
                과정에서 글자가 깨지거나 오류를 발생시킵니다.
              </li>
              <li>
                <strong>보안 및 무결성:</strong> 특수 문자를 안전하게 처리하여 웹 애플리케이션의 예기치 않은 동작을
                방지합니다.
              </li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-2xl space-y-3 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900">주요 변환 사례 (RFC 3986 기준)</h3>
            <div className="text-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="py-2">문자</th>
                    <th className="py-2">인코딩 결과</th>
                  </tr>
                </thead>
                <tbody className="text-blue-800">
                  <tr>
                    <td className="py-1">공백 (Space)</td>
                    <td className="py-1">%20</td>
                  </tr>
                  <tr>
                    <td className="py-1">! (Exclamation)</td>
                    <td className="py-1">%21</td>
                  </tr>
                  <tr>
                    <td className="py-1"># (Hash)</td>
                    <td className="py-1">%23</td>
                  </tr>
                  <tr>
                    <td className="py-1">& (Ampersand)</td>
                    <td className="py-1">%26</td>
                  </tr>
                  <tr>
                    <td className="py-1">가 (한글 예시)</td>
                    <td className="py-1">%EA%B0%80</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">WinSam URL 인코더의 특징</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-center">
            <div className="p-4 border rounded-xl shadow-sm">
              <div className="font-bold mb-1 text-blue-600">UTF-8 기반</div>
              <p className="text-slate-500">
                최신 웹 표준인 UTF-8 방식을 사용하여 전 세계 모든 언어를 안전하게 변환합니다.
              </p>
            </div>
            <div className="p-4 border rounded-xl shadow-sm">
              <div className="font-bold mb-1 text-blue-600">개인정보 보호</div>
              <p className="text-slate-500">
                입력한 데이터는 서버로 전송되지 않고 브라우저 내에서 즉시 처리되어 안전합니다.
              </p>
            </div>
            <div className="p-4 border rounded-xl shadow-sm">
              <div className="font-bold mb-1 text-blue-600">양방향 변환</div>
              <p className="text-slate-500">
                복잡한 % 코드를 다시 읽기 쉬운 문자로 돌려주는 디코딩 기능을 완벽하게 지원합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
          <h2 className="text-lg font-bold text-amber-900 mb-3">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-bold text-amber-800">Q: encodeURI와 encodeURIComponent의 차이는 무엇인가요?</h4>
              <p className="text-amber-700">
                encodeURI는 전체 URL(http://...)을 보존하면서 변환하고, encodeURIComponent는 파라미터 내의 특수문자까지
                모두 변환합니다. 저희 도구는 데이터의 안전한 전달을 위해 더 강력한 <strong>encodeURIComponent</strong>{" "}
                방식을 사용합니다.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-800">Q: 변환된 결과가 너무 길어요.</h4>
              <p className="text-amber-700">
                한글이나 특수문자는 바이트 단위로 쪼개져 % 문자로 변환되기 때문에 원래 길이보다 3~4배 길어지는 것이
                정상입니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
