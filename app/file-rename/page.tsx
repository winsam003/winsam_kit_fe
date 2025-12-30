"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone"; // 아까 설치한 도구 소환
import Link from "next/link";
import { ChevronLeft, FileEdit, Download, Plus, Trash2, RefreshCw, Info, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function FileRenameTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [prefix, setPrefix] = useState("");

  // 파일을 떨어뜨렸을 때 실행되는 함수
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  // 드롭존 기능 설정
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setFiles([]);
    setPrefix("");
  };

  const handleDownloadAll = () => {
    if (files.length === 0 || !prefix) return;
    
    files.forEach((file, index) => {
      const extension = file.name.split('.').pop();
      const fileNumber = String(index + 1).padStart(3, '0');
      const newName = `${prefix}_${fileNumber}.${extension}`;
      
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = newName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" /> 메인으로
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <FileEdit className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">파일 이름 일괄 변경</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="text-slate-500">
            <RefreshCw className="w-4 h-4 mr-2" /> 초기화
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> 1. 파일명 규칙 입력
            </label>
            <Input 
              placeholder="예: food, 여행사진" 
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="max-w-sm h-11 border-emerald-100 focus-visible:ring-emerald-500"
            />
          </div>

          {/* 드래그 앤 드롭 영역 - react-dropzone 적용 */}
          <div 
            {...getRootProps()} 
            className={`
              border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
              ${isDragActive 
                ? "border-emerald-500 bg-emerald-50 scale-[1.01]" 
                : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"}
            `}
          >
            <input {...getInputProps()} />
            <div className={`p-4 rounded-full mb-4 ${isDragActive ? "bg-emerald-500 text-white shadow-lg" : "bg-white text-slate-400 border border-slate-100"}`}>
              <Plus className={`w-8 h-8 ${isDragActive ? "animate-bounce" : ""}`} />
            </div>
            <p className="text-base font-semibold text-slate-700">
              {isDragActive ? "파일을 여기에 놓으세요!" : "파일을 끌어다 놓거나 클릭하여 선택"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 파일 리스트 부분 */}
      {files.length > 0 && (
        <Card className="border-slate-200 shadow-xl">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="font-bold text-slate-700">파일 목록 ({files.length}개)</span>
              <Button onClick={handleDownloadAll} disabled={!prefix} className="bg-emerald-600 hover:bg-emerald-700">
                <Download className="w-4 h-4 mr-2" /> 일괄 변경 및 다운로드
              </Button>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-slate-400 line-through truncate">{file.name}</span>
                    <span className="text-sm font-mono font-bold text-emerald-600 truncate">
                      {prefix ? `${prefix}_${String(idx + 1).padStart(3, '0')}.${file.name.split('.').pop()}` : '규칙을 입력하세요'}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(idx)} className="text-slate-300 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 애드센스용 텍스트 섹션 */}
      <section className="mt-12 pt-12 border-t grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2"><Info className="text-emerald-600" /> 파일 이름 정리가 중요한 이유</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            블로그나 웹사이트 운영 시 이미지를 <code>IMG_1234.jpg</code>처럼 올리면 검색 엔진이 내용을 파악하기 어렵습니다. 
            주제에 맞는 키워드로 이름을 바꿔주면 검색 결과에 더 잘 노출될 수 있습니다.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2"><ShieldCheck className="text-emerald-600" /> 철저한 보안 유지</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            저희 도구는 파일을 서버로 전송하지 않습니다. 모든 작업이 브라우저 안에서만 처리되므로 개인적인 사진이나 중요한 문서도 안심하고 정리하세요.
          </p>
        </div>
      </section>
    </div>
  );
}