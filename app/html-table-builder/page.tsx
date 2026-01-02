"use client";

import { useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { ChevronLeft, Table as TableIcon, Copy, Check, Trash2, FileCode, UploadCloud, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HtmlTableBuilder() {
  const [htmlCode, setHtmlCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const processExcelFile = async (file: File) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // SheetJS의 sheet_to_html 기능을 사용하여 병합(merge) 정보가 포함된 HTML 생성
    let html = XLSX.utils.sheet_to_html(worksheet, { editable: false });

    // 기본 생성된 HTML에 스타일 입히기 (정규표현식으로 스타일 치환)
    html = html.replace(
      /<table/g,
      '<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif;"'
    );
    html = html.replace(
      /<th/g,
      '<th style="border: 1px solid #ddd; padding: 12px; background-color: #f8f9fa; font-weight: bold; text-align: left;"'
    );
    html = html.replace(/<td/g, '<td style="border: 1px solid #ddd; padding: 10px; text-align: left;"');

    setHtmlCode(html);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processExcelFile(file);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(htmlCode);
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
        <div className="p-2 bg-emerald-100 rounded-lg">
          <TableIcon className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HTML 테이블 빌더 PRO</h1>
          <p className="text-slate-500 text-sm italic">병합된 셀(Merge Cells)까지 완벽하게 변환합니다.</p>
        </div>
      </div>

      <Card
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed transition-all ${
          isDragging ? "border-emerald-500 bg-emerald-50" : "border-slate-200"
        }`}
      >
        <CardContent className="p-10 flex flex-col items-center justify-center min-h-[200px]">
          <UploadCloud
            className={`w-12 h-12 mb-4 ${isDragging ? "text-emerald-500 animate-bounce" : "text-slate-300"}`}
          />
          <p className="text-lg font-medium">엑셀 파일을 여기에 드래그하세요</p>
          <input
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            id="excel-upload"
            onChange={(e) => e.target.files?.[0] && processExcelFile(e.target.files[0])}
          />
          <label htmlFor="excel-upload">
            <Button variant="outline" className="mt-4 cursor-pointer" asChild>
              <span>파일 선택하기</span>
            </Button>
          </label>
        </CardContent>
      </Card>

      {htmlCode && (
        <Tabs defaultValue="preview" className="w-full animate-in fade-in slide-in-from-bottom-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="preview">미리보기 (Preview)</TabsTrigger>
            <TabsTrigger value="code">HTML 코드 (Code)</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card className="p-6 overflow-auto bg-white border-2">
              <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <Card className="bg-slate-900 p-6 relative">
              <Button
                onClick={handleCopy}
                className="absolute top-4 right-4 h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
              >
                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                코드 복사
              </Button>
              <pre className="text-emerald-400 font-mono text-xs overflow-auto max-h-[500px]">{htmlCode}</pre>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* --- SEO 및 정보 섹션 (HTML 테이블 빌더 전용) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700">
        {/* 1. 핵심 가치 제안 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-base font-mono">
              <TableIcon className="w-5 h-5" />
            </span>
            엑셀 데이터를 HTML 테이블로 변환해야 하는 이유
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            웹사이트에 표(Table)를 삽입할 때, 수십 개의 `tr`과 `td` 태그를 일일이 코딩하는 것은 매우 비효율적입니다.
            특히 <strong>엑셀의 셀 병합(Colspan, Rowspan)</strong> 정보가 포함된 복잡한 표는 수작업 시 오류가 발생하기
            쉽습니다. WinSam HTML 테이블 빌더는 엑셀 파일을 분석하여 구조화된 HTML 코드로 즉시 변환해 줍니다.
          </p>
        </div>

        {/* 2. 상세 지식 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-emerald-300 transition-colors">
            <h3 className="font-bold text-emerald-600 text-lg">완벽한 셀 병합 지원</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              단순한 텍스트 복사를 넘어, SheetJS 엔진을 통해 엑셀 내부의 병합 데이터를 정밀하게 계산합니다. 복잡한
              보고서나 시간표 형식의 엑셀 데이터도 웹 브라우저에서 동일한 구조로 렌더링될 수 있도록 최적화된 코드를
              생성합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-emerald-300 transition-colors">
            <h3 className="font-bold text-emerald-600 text-lg">반응형 스타일 기본 적용</h3>
            <p className="text-sm leading-relaxed text-slate-500">
              변환된 HTML 코드는 인라인 스타일(Inline CSS)을 포함하고 있어, 별도의 CSS 파일 설정 없이도 티스토리,
              워드프레스, 네이버 블로그 등에 복사하여 즉시 깔끔한 디자인의 표를 노출할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 3. 활용 팁 섹션 */}
        <div className="space-y-6 bg-slate-900 text-slate-300 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white">웹 퍼블리싱 생산성 높이기</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">데이터 시각화:</span> 수천 행의 엑셀 데이터를 몇 초 만에 HTML
                코드로 변환하여 웹 리포트를 작성하세요.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">이메일 템플릿:</span> HTML 메일 본문에 표를 넣어야 할 때
                엑셀로 디자인하고 변환하면 코딩 시간을 단축할 수 있습니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">웹 접근성 준수:</span> 표준 `table` 태그를 사용하여 스크린
                리더 등 웹 접근성 가이드라인을 자연스럽게 준수합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">깨끗한 소스코드:</span> 불필요한 태그 중첩을 제거하고
                최적화된 HTML 결과물만을 제공합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 보안 안내 섹션 */}
        <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="space-y-2 flex-1">
            <h3 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" /> 서버 저장 없는 100% 로컬 처리
            </h3>
            <p className="text-sm text-emerald-800/70 leading-relaxed">
              업로드하신 엑셀 파일은 서버로 전송되지 않습니다. 모든 파싱 과정은 브라우저 내에서{" "}
              <strong>JavaScript(SheetJS)</strong> 라이브러리를 통해 수행됩니다. 회사의 중요한 기밀 문서나 숫자가 포함된
              엑셀 파일도 유출 우려 없이 안전하게 변환하여 사용하실 수 있습니다.
            </p>
          </div>
          <div className="flex gap-2 shrink-0 text-[10px] font-mono">
            <div className="px-4 py-2 bg-white rounded-lg border border-emerald-200 text-emerald-600 shadow-sm uppercase">
              Excel_to_Html_Engine
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-emerald-200 text-emerald-600 shadow-sm uppercase">
              No_Data_Leak
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
