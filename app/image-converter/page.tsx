"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, Image as ImageIcon, Download, Trash2, Loader2, ArrowRightLeft, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ImageData {
  file: File;
  preview: string;
  convertedUrl?: string;
  status: "idle" | "processing" | "completed" | "error";
}

export default function ImageConverter() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [format, setFormat] = useState("webp");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 드래그 앤 드롭 처리
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const addFiles = (files: File[]) => {
    const validFiles = files.filter(f => f.type.startsWith("image/")).slice(0, 10 - images.length);
    
    if (images.length >= 10) {
      alert("최대 10개까지만 업로드 가능합니다.");
      return;
    }

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: "idle" as const
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const convertImages = async () => {
    setImages(prev => prev.map(img => ({ ...img, status: "processing" })));

    for (let i = 0; i < images.length; i++) {
      const current = images[i];
      try {
        const converted = await processImage(current.file, format);
        setImages(prev => {
          const next = [...prev];
          next[i] = { ...next[i], convertedUrl: converted, status: "completed" };
          return next;
        });
        
        // 자동 다운로드 실행
        const link = document.createElement("a");
        link.download = `winsam_${current.file.name.split('.')[0]}.${format}`;
        link.href = converted;
        link.click();
      } catch (err) {
        setImages(prev => {
          const next = [...prev];
          next[i] = { ...next[i], status: "error" };
          return next;
        });
      }
    }
  };

  const processImage = (file: File, targetFormat: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL(`image/${targetFormat}`));
      };
      img.onerror = reject;
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" /> 메인으로
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <ArrowRightLeft className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold">대량 이미지 포맷 변환기</h1>
        </div>
        <span className="text-sm font-medium text-slate-500">{images.length} / 10개 선택됨</span>
      </div>

      <Card 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed transition-all p-12 flex flex-col items-center justify-center min-h-[200px] cursor-pointer ${
          isDragging ? "border-emerald-500 bg-emerald-50 scale-[1.01]" : "border-slate-300 hover:border-emerald-400 bg-slate-50/50"
        }`}
      >
        <input type="file" accept="image/*" multiple className="hidden" ref={fileInputRef} onChange={(e) => addFiles(Array.from(e.target.files || []))} />
        <ImageIcon className="w-12 h-12 mb-4 text-slate-400" />
        <p className="text-slate-600 font-medium">이미지 파일들을 여기에 끌어다 놓거나 클릭하세요</p>
        <p className="text-xs text-slate-400 mt-2">최대 10개까지 동시 처리가 가능합니다.</p>
      </Card>

      {images.length > 0 && (
        <div className="space-y-4">
          <Card className="p-4 bg-emerald-50 border-emerald-100 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-bold text-emerald-900">출력 포맷 설정</p>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="bg-white border-emerald-200">
                  <SelectValue placeholder="포맷 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webp">WebP (고압축 웹 표준)</SelectItem>
                  <SelectItem value="png">PNG (무손실 투명 지원)</SelectItem>
                  <SelectItem value="jpeg">JPG (사진 최적화)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={convertImages} className="w-full md:w-auto h-12 bg-emerald-600 hover:bg-emerald-700 px-10 text-lg">
              {images.some(img => img.status === "processing") ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2" />}
              일괄 변환 및 다운로드
            </Button>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <Card key={idx} className="relative group overflow-hidden border-slate-200">
                <img src={img.preview} alt="preview" className="w-full h-32 object-cover" />
                <div className="p-2 text-xs truncate font-medium bg-white border-t">
                  {img.file.name}
                </div>
                {img.status === "completed" && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center backdrop-blur-[1px]">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 bg-white rounded-full" />
                  </div>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* --- 구글 애드센스 승인용 전문 설명글 --- */}
      <div className="mt-20 space-y-12 pb-10 border-t pt-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">효율적인 웹 관리를 위한 대량 이미지 포맷 변환기</h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            웹사이트의 성능 최적화에서 가장 중요한 요소는 이미지 파일의 용량 관리입니다. WinSam Toolbox의 <strong>이미지 포맷 변환기</strong>는 여러 장의 이미지를 동시에 업로드하여 차세대 포맷인 <strong>WebP</strong>부터 표준 형식인 PNG, JPG까지 자유롭게 일괄 변환할 수 있도록 설계되었습니다. 번거로운 개별 작업 없이 최대 10개의 파일을 배열 형태로 한 번에 처리하여 작업 시간을 획기적으로 단축시켜 드립니다.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-600" />
              차세대 포맷 WebP의 강력한 장점
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              구글(Google)이 제안하는 WebP 포맷은 기존 JPEG 및 PNG 포맷 대비 화질 손실을 최소화하면서도 <strong>파일 크기를 약 26%에서 34%까지 줄여줍니다.</strong> 이는 웹사이트 로딩 속도를 개선하여 사용자 경험을 향상시킬 뿐만 아니라, 구글 검색 엔진 최적화(SEO)에도 필수적인 요소로 자리잡고 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              완벽한 로컬 보안 처리 방식
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              저희 도구는 사용자의 이미지를 서버로 전송하지 않습니다. 모든 변환 로직은 사용자의 웹 브라우저 내에서 <strong>Canvas API</strong>를 통해 실시간으로 처리됩니다. 민감한 사진이나 기업용 자료가 외부 서버에 기록되거나 유출될 걱정 없이 안전하게 활용하실 수 있는 가장 보안성이 높은 방식입니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

// Lucide icon helper
function ShieldCheck(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
  )
}