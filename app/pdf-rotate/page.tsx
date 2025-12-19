"use client";

import { useState } from "react";
import Link from "next/link";
import { PDFDocument, degrees } from "pdf-lib";
import { ChevronLeft, RotateCw, FileDown, Trash2, FileText, AlertCircle, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PdfRotate() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 파일 처리 로직 (공통)
  const processFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("PDF 파일만 업로드 가능합니다.");
      return;
    }
    setPdfFile(file);
    setRotation(0);
  };

  // 일반 업로드 버튼 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // 드래그 앤 드롭 핸들러
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const rotateAndDownload = async () => {
    if (!pdfFile) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotation));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rotated_${pdfFile.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("PDF 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1 text-slate-500">
            <ChevronLeft className="w-4 h-4" /> 메인으로
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-lg">
          <RotateCw className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">PDF 회전기</h1>
          <p className="text-slate-500 text-sm">페이지를 정방향으로 돌려 다시 저장합니다.</p>
        </div>
      </div>

      <Card 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`border-2 border-dashed transition-all ${
          isDragging ? "border-red-500 bg-red-50" : "border-slate-200"
        } ${pdfFile ? "border-solid" : ""}`}
      >
        <CardContent className="p-10 flex flex-col items-center justify-center min-h-[400px]">
          {!pdfFile ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-red-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <UploadCloud className={`w-10 h-10 ${isDragging ? "text-red-500 animate-bounce" : "text-red-400"}`} />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-700">PDF 파일을 여기에 드롭하세요</p>
                <p className="text-sm text-slate-400 mt-1 mb-6">또는 아래 버튼을 눌러 파일을 선택하세요</p>
                <label className="cursor-pointer bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95 inline-block">
                  파일 찾기
                  <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-sm truncate">{pdfFile.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setPdfFile(null)} className="hover:bg-red-50 hover:text-red-600 rounded-full">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col items-center gap-8 py-4">
                {/* 회전 미리보기 카드 */}
                <div 
                  className="w-48 h-64 bg-white border-4 border-slate-100 rounded-xl shadow-2xl flex items-center justify-center transition-transform duration-500 ease-in-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-slate-200 mx-auto" />
                    <div className="mt-2 w-12 h-1.5 bg-slate-100 rounded-full mx-auto" />
                    <div className="mt-1 w-8 h-1.5 bg-slate-50 rounded-full mx-auto" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button variant="outline" size="lg" onClick={() => setRotation((prev) => (prev + 90) % 360)} className="h-12 border-slate-200">
                    <RotateCw className="w-4 h-4 mr-2" /> 90° 회전
                  </Button>
                  <Button 
                    size="lg"
                    className="h-12 bg-red-600 hover:bg-red-700"
                    onClick={rotateAndDownload}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "처리 중..." : "저장 및 다운로드"}
                    <FileDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- 상세 설명 섹션 --- */}
      <div className="mt-12 space-y-10 text-slate-600 pb-20">
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">PDF 페이지 회전이 필요한 순간</h2>
          <p className="leading-relaxed">
            사무 업무를 보다 보면 스캐너의 방향 설정 오류나 모바일 기기에서의 촬영 방향 차이로 인해 <strong>PDF 문서가 거꾸로 되어 있거나 옆으로 누워 있는 경우</strong>를 자주 접하게 됩니다. 특히 관공서 제출용 서류나 법적 증빙 자료의 경우, 가독성을 위해 반드시 정방향으로 교정해야 합니다. WinSam PDF 회전기는 별도의 무거운 뷰어나 유료 편집 프로그램 없이도 클릭 몇 번으로 문서를 완벽하게 교정해 줍니다.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-3 p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs">1</span>
              모든 페이지 일괄 회전
            </h3>
            <p className="text-sm leading-relaxed">
              파일 내의 모든 페이지를 동일한 각도로 회전시킵니다. 수십 장의 보고서가 모두 옆으로 누워있을 때 일일이 수정할 필요 없이 단 한 번의 클릭으로 전체 문서를 바로잡을 수 있어 업무 시간을 획기적으로 단축합니다.
            </p>
          </section>

          <section className="space-y-3 p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs">2</span>
              초고속 로컬 프로세싱
            </h3>
            <p className="text-sm leading-relaxed">
              클라우드 기반 서비스와 달리 파일을 서버로 전송하고 다시 다운로드하는 대기 시간이 없습니다. 웹 브라우저의 자체 연산 능력을 활용하여 파일을 드롭하는 즉시 회전 처리가 완료되므로 대용량 파일도 끊김 없이 작업 가능합니다.
            </p>
          </section>
        </div>

        

        <section className="space-y-4 border-t pt-10">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">보안과 개인정보 보호</h2>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <p className="text-sm leading-relaxed mb-4">
              많은 온라인 PDF 도구들이 파일을 서버에 업로드하도록 요구합니다. 이 과정에서 중요한 계약서, 개인 식별 정보, 기업 비밀 등이 외부 서버에 임시로 저장될 위험이 있습니다.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-500">
              <li className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm italic">
                ✅ No Server Uploads
              </li>
              <li className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm italic">
                ✅ 100% Client-side Logic
              </li>
              <li className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm italic">
                ✅ Privacy Guaranteed
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-700">Q. 회전 후 PDF 화질이 떨어지나요?</h4>
              <p className="text-sm">아니요. PDF의 렌더링 레이어 정보를 직접 수정하는 방식이므로, 원본의 화질이나 텍스트 정보(OCR)를 전혀 손상시키지 않고 방향만 변경합니다.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-700">Q. 암호가 걸린 PDF도 가능한가요?</h4>
              <p className="text-sm">현재 보안상의 이유로 암호가 걸리지 않은 표준 PDF 파일만 지원합니다. 암호를 먼저 해제하신 후 이용해 주세요.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}