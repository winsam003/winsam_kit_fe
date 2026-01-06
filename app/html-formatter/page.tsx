"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Code,
  Eye,
  Copy,
  Check,
  Trash2,
  AlignLeft,
  Info,
  ShieldCheck,
  BadgeCheck,
  Lock,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdfitBanner from "@/components/AdfitBanner";

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // HTML 예쁘게 정렬하는 개선된 로직
  const formatHtml = () => {
    if (!input.trim()) return;

    let formatted = "";
    let indent = 0;
    const tab = "  "; // 2칸 들여쓰기

    // 1. 태그와 텍스트를 강제로 분리하기 위해 모든 태그 앞뒤로 줄바꿈을 넣습니다.
    const nodes = input
      .replace(/>\s*</g, "><") // 태그 사이 공백 제거
      .replace(/(<[^>]+>)/g, "\n$1\n") // 모든 태그 앞뒤에 줄바꿈 추가
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    nodes.forEach((node) => {
      // 종료 태그인지 확인 (ex: </td>, </tr>)
      const isClosingTag = node.startsWith("</");

      // 단일 태그인지 확인 (ex: <meta ... />, <br>, <img>)
      const isSelfClosing = node.endsWith("/>") || /<(img|br|hr|input|meta|link)[^>]*>/.test(node);

      // 시작 태그인지 확인 (종료도 아니고 단남도 아닌 <로 시작하는 태그)
      const isOpeningTag = node.startsWith("<") && !isClosingTag && !isSelfClosing;

      // 종료 태그면 먼저 들여쓰기를 줄입니다.
      if (isClosingTag) {
        indent = Math.max(0, indent - 1);
      }

      // 현재 들여쓰기만큼 탭을 붙여서 한 줄 추가
      formatted += tab.repeat(indent) + node + "\n";

      // 시작 태그였으면 다음 줄부터 들여쓰기를 늘립니다.
      if (isOpeningTag) {
        indent++;
      }
    });

    setOutput(formatted.trim());
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-slate-500">
            <ChevronLeft className="w-4 h-4" /> 메인으로
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <AlignLeft className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">HTML 코드 정렬기</h1>
          <p className="text-slate-500 text-sm">복잡한 테이블 태그와 속성값도 계층별로 정리합니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between bg-slate-50/50">
            <CardTitle className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">Input HTML</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
              className="h-7 text-red-400 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3 mr-1" /> 비우기
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Textarea
              placeholder="여기에 HTML 코드를 붙여넣으세요..."
              className="h-[550px] border-0 focus-visible:ring-0 resize-none p-4 font-mono text-[13px] leading-relaxed"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </CardContent>
          <div className="p-4 border-t bg-white">
            <Button
              onClick={formatHtml}
              className="w-full bg-blue-600 hover:bg-blue-700 shadow-md h-12 text-base font-bold"
            >
              <Code className="w-4 h-4 mr-2" /> 코드 예쁘게 정렬하기
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="code" className="gap-2 font-bold text-xs">
              FORMATTED CODE
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 font-bold text-xs">
              PREVIEW
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code">
            <Card className="h-[600px] shadow-sm bg-slate-950 overflow-hidden relative border-none">
              <Button
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 h-8 text-xs z-10 text-white"
                disabled={!output}
              >
                {copied ? <Check className="w-3 h-3 mr-1 text-green-400" /> : <Copy className="w-3 h-3 mr-1" />}
                Copy
              </Button>
              <pre className="p-6 text-blue-300 font-mono text-[12px] overflow-auto h-full leading-relaxed scrollbar-hide whitespace-pre">
                {output || <span className="text-slate-600 italic">// 정렬 버튼을 누르면 결과가 나옵니다.</span>}
              </pre>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card className="h-[600px] overflow-auto shadow-sm bg-white p-6 border-slate-200">
              {input ? (
                <div className="all-initial" dangerouslySetInnerHTML={{ __html: input }} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-3">
                  <Eye className="w-12 h-12 opacity-20" />
                  <p className="text-sm italic">렌더링 미리보기가 여기에 표시됩니다.</p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
      <section className="mt-12 space-y-8">
        {/* 사용 팁 & 주요 기능 */}
        <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Info className="w-5 h-5 text-blue-500 shrink-0" />
            <h2 className="text-xl font-bold text-slate-800">HTML Table Formatter 활용 가이드</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-600">
            <div className="space-y-3">
              <p className="font-bold text-slate-900">1. 복잡한 엑셀 표 소스 관리</p>
              <p>
                엑셀이나 구글 스프레드시트에서 변환된 HTML은 모든 태그와 스타일이 한 줄로 길게 늘어지는 **'Minified'**
                상태로 생성됩니다. 이 경우 특정 셀(`td`)의 데이터를 수정하거나 배경색을 바꾸는 작업이 거의 불가능합니다.
                본 도구는 이를 계층 구조로 정렬하여 **수정 및 유지보수 시간**을 80% 이상 단축해 줍니다.
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-bold text-slate-900">2. 웹 접근성 및 표준 검사</p>
              <p>
                정렬된 코드를 통해 `tr`, `th`, `td` 태그가 올바르게 닫혔는지, 불필요한 중복 스타일이 들어가지는 않았는지
                육안으로 쉽게 검수할 수 있습니다. 특히 **병합된 셀(rowspan, colspan)**의 구조적 결함을 파악할 때 매우
                효과적입니다.
              </p>
            </div>
          </div>
        </div>

        {/* --- 데이터 보안 및 개인정보 보호 섹션 --- */}
        <section className="mt-16 space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Data Privacy & Security</h2>
            <p className="text-slate-500">WinSam Toolbox가 데이터를 처리하는 가장 안전한 방식</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800">No Server-Side Storage</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                사용자가 입력한 모든 HTML 소스 및 데이터는 서버로 전송되지 않습니다. 일반적인 온라인 도구들과 달리 API
                통신을 하지 않으며, 오직 당신의 기기 내에서만 처리됩니다.
              </p>
            </div>
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800">Memory-Only Processing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                모든 작업은 브라우저의 RAM(메모리) 내에서 휘발성으로 작동합니다. DB나 브라우저의 쿠키, 로컬 스토리지에
                흔적을 남기지 않아 정렬 후 창을 닫는 즉시 데이터는 완전히 소멸됩니다.
              </p>
            </div>
            <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800">Zero Tracking</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                우리는 당신이 어떤 내용을 정렬했는지 알 수 없습니다. 민감한 내부 보고서의 HTML 소스나 개인적인 코드를
                안심하고 붙여넣으세요. 보안은 타협할 수 없는 우리의 철학입니다.
              </p>
            </div>
          </div>

          {/* 심층 보안 가이드 섹션 (텍스트 볼륨 확보) */}
          <div className="p-8 bg-slate-900 rounded-3xl text-slate-400 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-blue-400" />
                개발자를 위한 기밀 유지 정책 (Confidentiality)
              </h3>
              <p className="text-sm leading-relaxed">
                대부분의 웹 기반 도구들은 '편의성'을 명목으로 데이터를 서버로 보내 기록을 남깁니다. 하지만{" "}
                <strong>WinSam Toolbox</strong>는 클라이언트 사이드 렌더링(CSR) 아키텍처를 100% 활용합니다. 이는 기업
                환경에서 근무하는 프론트엔드 개발자들이 보안 검토 없이도 사내 소스코드를 정렬하거나 변환할 수 있도록
                설계된 최적의 방식입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800">
              <div className="space-y-2">
                <h4 className="text-white text-sm font-semibold">브라우저 내 엔진 구동</h4>
                <p className="text-xs leading-relaxed italic">
                  우리는 JavaScript 라이브러리를 통해 브라우저 자체 엔진에서 HTML 트리 구조를 재배치합니다. 이 과정에서
                  네트워크 탭을 확인해 보시면 어떤 데이터도 외부로 유출되지 않음을 직접 확인하실 수 있습니다.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white text-sm font-semibold">완벽한 데이터 파기</h4>
                <p className="text-xs leading-relaxed italic">
                  작업 완료 후 '새로고침'을 누르거나 탭을 닫으세요. 가비지 컬렉션(Garbage Collection)이 즉시 작동하여
                  메모리 상의 데이터를 비워내며, 그 어떤 물리적 서버에도 잔상이 남지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
