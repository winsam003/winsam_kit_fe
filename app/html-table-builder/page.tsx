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
    html = html.replace(/<table/g, '<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; font-family: sans-serif;"');
    html = html.replace(/<th/g, '<th style="border: 1px solid #ddd; padding: 12px; background-color: #f8f9fa; font-weight: bold; text-align: left;"');
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
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed transition-all ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-slate-200"}`}
      >
        <CardContent className="p-10 flex flex-col items-center justify-center min-h-[200px]">
          <UploadCloud className={`w-12 h-12 mb-4 ${isDragging ? "text-emerald-500 animate-bounce" : "text-slate-300"}`} />
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
              <Button onClick={handleCopy} className="absolute top-4 right-4 h-8 text-xs bg-emerald-600 hover:bg-emerald-700">
                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                코드 복사
              </Button>
              <pre className="text-emerald-400 font-mono text-xs overflow-auto max-h-[500px]">
                {htmlCode}
              </pre>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* --- SEO 및 승인용 섹션 --- */}
      <section className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">왜 파일을 직접 업로드해야 하나요?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
          <p>
            일반적인 복사-붙여넣기는 텍스트 데이터만 전달하며, 셀 병합(rowspan, colspan)과 같은 복잡한 구조 정보를 포함하지 못합니다. 
            <strong>WinSam HTML 빌더</strong>는 엑셀 파일을 바이너리 수준에서 분석하여 병합된 셀 구조를 완벽하게 재현하는 HTML 코드를 생성합니다.
          </p>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 italic">💡 사용 팁</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>네이버 블로그, 티스토리 등 외부 편집기에 표를 넣을 때 유용합니다.</li>
              <li>반응형 웹 디자인을 위해 <code>width: 100%</code> 스타일이 자동 적용됩니다.</li>
              <li>파일은 서버에 저장되지 않고 브라우저에서 즉시 변환 후 파기됩니다.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}