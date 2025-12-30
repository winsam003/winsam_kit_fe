"use client";

import { useState, dragEvent } from "react";
import Link from "next/link";
import { ChevronLeft, FileEdit, Download, Plus, Trash2, RefreshCw, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function FileRenameTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [prefix, setPrefix] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // 드래그 이벤트 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

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
      {/* 헤더 섹션 */}
      <div className="space-y-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" /> 메인으로
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <FileEdit className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">파일 이름 일괄 변경 도구</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="text-slate-500">
            <RefreshCw className="w-4 h-4 mr-2" /> 전체 초기화
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* 입력 및 드롭존 */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">1. 새로운 파일명 규칙 설정</label>
              <div className="flex items-center gap-3">
                <Input 
                  placeholder="예: 상품이미지, 여행_사진" 
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="max-w-xs border-emerald-200 focus:ring-emerald-500"
                />
                <span className="text-slate-400 font-mono text-sm">_001.ext</span>
              </div>
              <p className="text-xs text-slate-500">지정한 이름 뒤에 _001, _002 순으로 번호가 붙습니다.</p>
            </div>

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all
                ${isDragging 
                  ? "border-emerald-500 bg-emerald-50 scale-[1.02] shadow-md" 
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"}
              `}
            >
              <input 
                type="file" 
                multiple 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className={`p-4 rounded-full mb-4 ${isDragging ? "bg-emerald-200 text-emerald-700" : "bg-white text-slate-400 shadow-sm"}`}>
                <Plus className={`w-8 h-8 ${isDragging ? "animate-bounce" : ""}`} />
              </div>
              <p className="text-sm font-semibold text-slate-600">
                {isDragging ? "여기에 파일을 놓으세요!" : "파일을 선택하거나 드래그하여 추가"}
              </p>
              <p className="text-xs text-slate-400 mt-2">한글 파일, 이미지, 문서 등 모든 파일 지원</p>
            </div>
          </CardContent>
        </Card>

        {/* 리스트 및 다운로드 */}
        {files.length > 0 && (
          <Card className="border-slate-200 shadow-lg ring-1 ring-emerald-500/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold text-slate-700">대기 중인 파일 {files.length}개</span>
                </div>
                <Button 
                  onClick={handleDownloadAll} 
                  disabled={!prefix}
                  className="bg-emerald-600 hover:bg-emerald-700 shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" /> 이름 바꿔서 다운로드
                </Button>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg hover:border-emerald-200 transition-colors">
                    <div className="flex flex-col overflow-hidden mr-4">
                      <span className="text-xs text-slate-400 truncate italic">{file.name}</span>
                      <span className="text-sm font-mono font-bold text-emerald-600 truncate">
                        {prefix ? `${prefix}_${String(idx + 1).padStart(3, '0')}.${file.name.split('.').pop()}` : '이름을 입력해주세요'}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(idx)}
                      className="text-slate-300 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* --- 애드센스용 설명 섹션 시작 --- */}
      <hr className="border-slate-200" />
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600" /> 
            파일 이름 일괄 변경기가 왜 필요한가요?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            블로그 운영자나 직장인들은 수많은 사진과 문서를 다룹니다. 카메라로 찍은 <code className="bg-slate-100 px-1 rounded">IMG_4829.jpg</code> 같은 의미 없는 파일명을 그대로 사용하면 나중에 파일을 찾기 어렵고, SEO(검색 엔진 최적화) 측면에서도 불리합니다.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            본 도구를 사용하면 수십 개의 파일을 단 몇 초 만에 <strong>일관된 규칙(예: 상품명_001)</strong>으로 정리할 수 있어 업무 효율을 극대화할 수 있습니다.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 
            주요 특징 및 사용 방법
          </h2>
          <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
            <li><strong>드래그 앤 드롭 지원:</strong> 파일을 마우스로 끌어서 편리하게 추가할 수 있습니다.</li>
            <li><strong>개인정보 보호:</strong> 모든 작업은 사용자의 브라우저 내에서 처리되며, 파일이 서버로 전송되지 않아 안전합니다.</li>
            <li><strong>확장자 자동 유지:</strong> 파일의 포맷(JPG, PNG, PDF 등)을 자동으로 인식하여 유지합니다.</li>
            <li><strong>빠른 속도:</strong> 별도의 설치 없이 웹에서 즉시 실행됩니다.</li>
          </ul>
        </div>
      </section>

      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-3">자주 묻는 질문 (FAQ)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-700">Q. 파일이 서버에 저장되나요?</h4>
            <p className="text-sm text-slate-500 mt-1">A. 아니요. 본 서비스는 클라이언트 사이드 기술을 사용하여 사용자의 컴퓨터 안에서만 작동합니다. 따라서 보안이 중요한 문서도 안심하고 정리할 수 있습니다.</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700">Q. 다운로드가 여러 번 뜨는데 정상인가요?</h4>
            <p className="text-sm text-slate-500 mt-1">A. 네, 현재 버전은 각 파일에 대해 개별 다운로드를 요청합니다. 브라우저 설정에 따라 '다운로드 위치 확인' 팝업이 뜰 수 있으니, '항상 허용'을 선택하시면 더 편리합니다.</p>
          </div>
        </div>
      </section>
      {/* --- 애드센스용 설명 섹션 끝 --- */}
    </div>
  );
}