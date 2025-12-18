"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Code2, Copy, Check, Trash2, AlignLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // XML 예쁘게 정렬하는 핵심 로직
  const formatXml = () => {
    if (!input.trim()) return;
    try {
      let formatted = "";
      let indent = "";
      const tab = "  "; // 2칸 들여쓰기
      
      // 줄바꿈 및 불필요한 공백 제거 후 태그별로 분리
      const nodes = input.replace(/>\s*</g, "><").split(/(?=<)/g);

      nodes.forEach((node) => {
        if (node.startsWith("</")) {
          indent = indent.substring(tab.length);
          formatted += indent + node + "\n";
        } else if (node.startsWith("<") && !node.includes("/>") && !node.startsWith("<?") && !node.startsWith("<!")) {
          formatted += indent + node + "\n";
          if (!node.includes("</")) {
             indent += tab;
          }
        } else {
          formatted += indent + node + "\n";
        }
      });
      setOutput(formatted.trim());
    } catch (e) {
      alert("XML 형식이 올바르지 않습니다. 코드를 다시 확인해주세요.");
    }
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
          <Button variant="ghost" size="sm" className="gap-1 text-slate-500">
            <ChevronLeft className="w-4 h-4" /> 메인으로
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Code2 className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">XML 포맷터</h1>
          <p className="text-slate-500 text-sm">복잡한 XML 코드를 보기 좋게 정렬합니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 입력 섹션 */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
            <CardTitle className="text-xs font-bold uppercase text-slate-400">XML Input</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => {setInput(""); setOutput("");}} className="h-7 text-xs text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4 mr-1" /> 비우기
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Textarea
              className="h-[500px] font-mono text-sm border-0 focus-visible:ring-0 resize-none p-4"
              placeholder="여기에 XML 코드를 붙여넣으세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </CardContent>
          <div className="p-3 border-t bg-slate-50">
            <Button onClick={formatXml} className="w-full bg-orange-600 hover:bg-orange-700 shadow-md">
              <AlignLeft className="w-4 h-4 mr-2" /> XML 정렬하기 (Format)
            </Button>
          </div>
        </Card>

        {/* 출력 섹션 */}
        <Card className="shadow-sm bg-slate-50/50">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
            <CardTitle className="text-xs font-bold uppercase text-orange-600">Formatted Result</CardTitle>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output} className="h-7 text-xs bg-white">
              {copied ? <Check className="w-4 h-4 text-green-500 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              복사
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[555px] overflow-auto p-4 font-mono text-sm whitespace-pre text-slate-800 bg-white">
              {output || <span className="text-slate-300 italic">정렬 버튼을 누르면 결과가 표시됩니다.</span>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- SEO 및 승인용 섹션 --- */}
      <Card className="border-none shadow-none bg-orange-50/50 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">XML 데이터 정렬이 필요한 이유</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <p>
              XML은 데이터 전송과 설정을 위해 널리 쓰이지만, 기계가 읽기 좋게 최적화된(Minified) XML은 사람이 구조를 파악하기 매우 힘듭니다. 
              <strong>WinSam XML 포맷터</strong>는 계층 구조(Hierarchy)를 분석하여 표준 들여쓰기를 적용함으로써 가독성을 극대화합니다.
            </p>
          </div>
          <div className="space-y-3">
            <p>
              저희 도구는 브라우저 내에서 텍스트를 처리하므로, 사용자의 소중한 데이터가 외부 서버로 전송되지 않습니다. 
              API 응답, Android 프로젝트 설정, SVG 파일 분석 등 다양한 용도로 안전하게 활용해 보세요.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}