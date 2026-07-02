"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Code2,
  Copy,
  Check,
  Trash2,
  AlignLeft,
  BadgeCheck,
  ShieldCheck,
  Lock,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdfitBanner from "@/components/AdfitBanner";

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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
              className="h-7 text-xs text-red-400 hover:text-red-600"
            >
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
              className="h-7 text-xs bg-white"
            >
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
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
      {/* --- 상세 활용 가이드 (XML 전문 가이드) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700">
        {/* 1. XML의 정의와 중요성 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-600 text-white rounded-lg flex items-center justify-center text-base font-mono">
              {"</>"}
            </span>
            XML 데이터 정렬(Pretty Print)이 왜 필수적인가요?
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            XML(Extensible Markup Language)은 데이터를 저장하고 전달하기 위해 고안된 텍스트 기반의 마크업 언어입니다.
            기계 간의 데이터 교환을 위해 최적화된 XML은 보통 공백과 줄바꿈이 제거된 <strong>Minified(압축)</strong>{" "}
            상태로 제공되곤 합니다. 하지만 개발자가 설정을 수정하거나 API 응답 구조를 파악해야 할 때는 계층
            구조(Hierarchy)가 시각적으로 드러나는 <strong>정렬된 형태</strong>가 반드시 필요합니다.
          </p>
        </div>

        {/* 2. 상세 활용 사례 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-orange-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-orange-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>설정 파일 디버깅</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              안드로이드의 <code className="bg-orange-50 px-1 font-mono text-orange-700">AndroidManifest.xml</code>이나
              Java Spring 프레임워크의 설정 파일들은 복잡한 트리 구조를 가지고 있습니다. 표준 2칸 또는 4칸 들여쓰기를
              적용하면 노드의 부모-자식 관계를 명확히 파악하여 오타나 설정 오류를 즉시 잡아낼 수 있습니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-orange-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-orange-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>SVG 및 벡터 데이터 분석</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              최신 웹 디자인에서 필수적인 SVG 이미지 파일은 사실 XML 형식의 텍스트 데이터입니다. WinSam XML 포맷터를
              사용하면 복잡한 경로(Path) 데이터와 도형 속성들을 정교하게 확인하고 직접 수정할 수 있는 환경을 제공합니다.
            </p>
          </div>
        </div>

        {/* 3. XML vs JSON 기술 섹션 */}
        <div className="space-y-6 bg-slate-900 text-slate-300 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white">XML 구조의 기술적 특징</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">사용자 정의 태그:</span> HTML과 달리 사용자가 직접 태그
                이름을 정의할 수 있어 높은 확장성을 제공합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">데이터 계층화:</span> 모든 노드는 반드시 루트 요소를 가지며,
                엄격한 여닫는 태그 규칙을 통해 데이터의 무결성을 보장합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">속성(Attribute) 활용:</span> 요소 내부에 메타데이터를 포함할
                수 있어 JSON보다 상세한 정보 표현이 가능합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">네임스페이스 지원:</span> 서로 다른 XML 스키마 간의 태그
                충돌을 방지하는 네임스페이스 기술을 지원합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 4. 보안 강조 섹션 (업그레이드 버전) */}
        <div className="p-8 bg-orange-50/50 rounded-2xl border border-orange-100 flex flex-col md:flex-row gap-8 items-center">
          <div className="space-y-4 flex-1">
            <h3 className="font-bold text-orange-900 text-xl flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-orange-600" />
              안전한 로컬 클라이언트 사이드 변환
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              XML 정렬 로직은 웹 브라우저 메모리에서 실행되며 이 도구는 입력 코드를 변환 서버로 보내지 않습니다. API 인증
              키나 개인정보가 포함된 자료는 소속 조직의 보안 규정을 먼저 확인하세요.
            </p>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded">
                <Lock className="w-3 h-3" /> NO_API_CALL
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded">
                <EyeOff className="w-3 h-3" /> NO_LOGGING
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
