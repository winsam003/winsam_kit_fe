"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, FileText, Download, Trash2, Loader2, Scissors, Info, ShieldCheck, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PDFDocument } from "pdf-lib";
import AdfitBanner from "@/components/AdfitBanner";

export default function PdfSplitter() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageRange, setPageRange] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 드래그 앤 드롭 핸들러
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("PDF 파일만 업로드 가능합니다.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const parsePageRange = (rangeStr: string, maxPage: number) => {
    const pages = new Set<number>();
    const parts = rangeStr.split(",").map((p) => p.trim());

    parts.forEach((part) => {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        for (let i = start; i <= end; i++) {
          if (i > 0 && i <= maxPage) pages.add(i - 1);
        }
      } else {
        const p = Number(part);
        if (p > 0 && p <= maxPage) pages.add(p - 1);
      }
    });
    return Array.from(pages).sort((a, b) => a - b);
  };

  const extractPages = async () => {
    if (!pdfFile || !pageRange) {
      alert("추출할 페이지 범위를 입력해주세요!");
      return;
    }
    setLoading(true);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer);
      const maxPage = srcDoc.getPageCount();
      const targetPages = parsePageRange(pageRange, maxPage);

      if (targetPages.length === 0) {
        alert("입력하신 범위가 유효하지 않습니다. (예: 1, 3, 5-10)");
        return;
      }

      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(srcDoc, targetPages);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `winsam_extracted_${pdfFile.name}`;
      link.click();
    } catch (error) {
      console.error(error);
      alert("PDF 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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

      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-lg">
          <Scissors className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold">PDF 특정 페이지 추출기</h1>
      </div>

      {/* 드래그 앤 드롭 지원 카드 */}
      <Card
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !pdfFile && fileInputRef.current?.click()}
        className={`border-2 border-dashed transition-all p-12 flex flex-col items-center justify-center min-h-[300px] ${
          isDragging
            ? "border-red-500 bg-red-50 scale-[1.02]"
            : pdfFile
            ? "border-red-200 bg-white cursor-default"
            : "border-slate-300 hover:border-red-400 cursor-pointer bg-slate-50/50"
        }`}
      >
        <input type="file" accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        <FileText className={`w-16 h-16 mb-4 ${pdfFile ? "text-red-500" : "text-slate-400"}`} />
        {pdfFile ? (
          <div className="text-center space-y-4">
            <div className="space-y-1">
              <p className="font-bold text-xl text-slate-800">{pdfFile.name}</p>
              <p className="text-sm text-slate-500">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setPdfFile(null);
              }}
              className="text-red-500 border-red-100 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" /> 다른 파일 선택
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-slate-700">PDF 파일을 여기에 끌어다 놓으세요</p>
            <p className="text-sm text-slate-500">또는 클릭하여 파일 선택</p>
          </div>
        )}
      </Card>
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
      {pdfFile && (
        <Card className="p-6 border-red-100 bg-red-50/30 animate-in zoom-in-95 duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-800 font-semibold">
              <Info className="w-4 h-4" />
              <span>추출할 범위를 입력 (예: 1, 3, 5-10)</span>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="페이지 번호를 입력하세요..."
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                className="bg-white border-red-200 focus-visible:ring-red-500 text-lg h-12"
              />
              <Button
                onClick={extractPages}
                disabled={loading || !pageRange}
                className="bg-red-600 hover:bg-red-700 h-12 px-8 shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2 w-5 h-5" />}
                PDF 저장
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* --- 설명글 섹션 (구글 애드센스 승인용 전문 텍스트) --- */}
      <div className="mt-16 space-y-12 pb-20">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">온라인 PDF 페이지 추출 도구 활용 가이드</h2>
          <p className="text-slate-600 leading-relaxed">
            수백 페이지에 달하는 대용량 PDF 파일에서 필요한 부분만 골라내는 작업은 생각보다 번거롭습니다. WinSam의{" "}
            <strong>PDF 추출기</strong>를 사용하면 별도의 소프트웨어 설치 없이 웹 브라우저에서 즉시 원하는 페이지만
            분리하여 새로운 문서로 만들 수 있습니다. 보고서의 특정 챕터만 공유하거나, 학습 자료에서 필요한 문제 페이지만
            따로 저장하고 싶을 때 유용합니다.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="text-red-600 bg-red-50 w-12 h-12 flex items-center justify-center rounded-full">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">강력한 개인정보 보호</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              업로드된 문서는 서버로 전송되지 않습니다. 모든 편집 과정이 사용자의 웹 브라우저 내에서
              <strong>로컬 방식</strong>으로 진행되어 기밀 문서나 개인 정보가 담긴 파일도 안심하고 처리할 수 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-blue-600 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-full">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">초고속 엔진</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              최적화된 PDF 라이브러리를 사용하여 대용량 파일도 끊김 없이 빠르게 분석합니다. 복잡한 페이지 구성도 수초
              내에 재구성하여 다운로드 가능한 상태로 만들어 드립니다.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-green-600 bg-green-50 w-12 h-12 flex items-center justify-center rounded-full">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">원본 화질 유지</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              페이지를 다시 렌더링하지 않고 원본의 객체를 그대로 복사하기 때문에 텍스트 품질, 이미지 해상도, 포함된 링크
              등이 원본과 동일하게 유지됩니다.
            </p>
          </div>
        </div>

        <section className="bg-slate-900 text-slate-100 p-8 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Info className="w-5 h-5 text-red-400" />
            페이지 범위 입력 팁
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>
                <strong>특정 페이지:</strong> "1, 3, 5"를 입력하여 1번, 3번, 5번 페이지만 추출
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>
                <strong>연속 범위:</strong> "10-20"을 입력하여 10번부터 20번까지 모두 추출
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>
                <strong>혼합 사용:</strong> "2, 5, 10-15"와 같이 섞어서 입력 가능
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>
                <strong>순서 재배치:</strong> 입력한 순서대로 PDF 페이지가 재구성됩니다.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
