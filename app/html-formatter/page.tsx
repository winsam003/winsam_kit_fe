"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Code, Eye, Copy, Check, Trash2, AlignLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      .map(line => line.trim())
      .filter(line => line !== "");

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
            <Button variant="ghost" size="sm" onClick={() => {setInput(""); setOutput("");}} className="h-7 text-red-400 hover:bg-red-50">
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
            <Button onClick={formatHtml} className="w-full bg-blue-600 hover:bg-blue-700 shadow-md h-12 text-base font-bold">
              <Code className="w-4 h-4 mr-2" /> 코드 예쁘게 정렬하기
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="code" className="gap-2 font-bold text-xs">FORMATTED CODE</TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 font-bold text-xs">PREVIEW</TabsTrigger>
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
                엑셀이나 구글 스프레드시트에서 변환된 HTML은 모든 태그와 스타일이 한 줄로 길게 늘어지는 **'Minified'** 상태로 생성됩니다. 
                이 경우 특정 셀(`td`)의 데이터를 수정하거나 배경색을 바꾸는 작업이 거의 불가능합니다. 본 도구는 이를 계층 구조로 정렬하여 
                **수정 및 유지보수 시간**을 80% 이상 단축해 줍니다.
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-bold text-slate-900">2. 웹 접근성 및 표준 검사</p>
              <p>
                정렬된 코드를 통해 `tr`, `th`, `td` 태그가 올바르게 닫혔는지, 불필요한 중복 스타일이 들어가지는 않았는지 
                육안으로 쉽게 검수할 수 있습니다. 특히 **병합된 셀(rowspan, colspan)**의 구조적 결함을 파악할 때 매우 효과적입니다.
              </p>
            </div>
          </div>
        </div>

        {/* 보안 및 로컬 처리 강조 (중요) */}
        <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="space-y-2 flex-1">
            <h3 className="font-bold text-blue-900 text-lg flex items-center gap-2">
              <Check className="w-5 h-5" /> 100% 안전한 로컬 브라우저 처리
            </h3>
            <p className="text-sm text-blue-800/70">
              입력하신 HTML 소스코드는 **외부 서버로 단 1바이트도 전송되지 않습니다.** 모든 정렬 로직은 사용자의 브라우저 메모리 내에서 
              즉시 수행되며, 페이지를 새로고침하면 모든 데이터가 파기됩니다. 기업의 민감한 내부 보고서나 기밀 문서의 소스코드도 
              보안 걱정 없이 안심하고 관리하세요.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <div className="px-4 py-2 bg-white rounded-lg border border-blue-200 text-[11px] font-mono text-blue-600 shadow-sm">
              NO_SERVER_TRANSFER
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-blue-200 text-[11px] font-mono text-blue-600 shadow-sm">
              LOCAL_STORAGE_FREE
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}