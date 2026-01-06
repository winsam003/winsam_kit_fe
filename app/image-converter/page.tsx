"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Image as ImageIcon,
  Download,
  Trash2,
  Loader2,
  ArrowRightLeft,
  Info,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdfitBanner from "@/components/AdfitBanner";

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
    const validFiles = files.filter((f) => f.type.startsWith("image/")).slice(0, 10 - images.length);

    if (images.length >= 10) {
      alert("최대 10개까지만 업로드 가능합니다.");
      return;
    }

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      status: "idle" as const,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const convertImages = async () => {
    setImages((prev) => prev.map((img) => ({ ...img, status: "processing" })));

    for (let i = 0; i < images.length; i++) {
      const current = images[i];
      try {
        const converted = await processImage(current.file, format);
        setImages((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], convertedUrl: converted, status: "completed" };
          return next;
        });

        // 자동 다운로드 실행
        const link = document.createElement("a");
        link.download = `winsam_${current.file.name.split(".")[0]}.${format}`;
        link.href = converted;
        link.click();
      } catch (err) {
        setImages((prev) => {
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
          isDragging
            ? "border-emerald-500 bg-emerald-50 scale-[1.01]"
            : "border-slate-300 hover:border-emerald-400 bg-slate-50/50"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => addFiles(Array.from(e.target.files || []))}
        />
        <ImageIcon className="w-12 h-12 mb-4 text-slate-400" />
        <p className="text-slate-600 font-medium">이미지 파일들을 여기에 끌어다 놓거나 클릭하세요</p>
        <p className="text-xs text-slate-400 mt-2">최대 10개까지 동시 처리가 가능합니다.</p>
      </Card>
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>

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
            <Button
              onClick={convertImages}
              className="w-full md:w-auto h-12 bg-emerald-600 hover:bg-emerald-700 px-10 text-lg"
            >
              {images.some((img) => img.status === "processing") ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Download className="mr-2" />
              )}
              일괄 변환 및 다운로드
            </Button>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <Card key={idx} className="relative group overflow-hidden border-slate-200">
                <img src={img.preview} alt="preview" className="w-full h-32 object-cover" />
                <div className="p-2 text-xs truncate font-medium bg-white border-t">{img.file.name}</div>
                {img.status === "completed" && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center backdrop-blur-[1px]">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 bg-white rounded-full" />
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
      {/* --- SEO 및 정보 섹션 (이미지 최적화 전문 가이드) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700">
        {/* 1. 이미지 포맷 변환의 필요성 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xs font-mono">
              IMG
            </span>
            웹 성능 최적화를 위한 이미지 포맷 변환 가이드
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            현대 웹 환경에서 이미지는 전체 페이지 용량의 60% 이상을 차지합니다. 잘못된 이미지 포맷 사용은 웹사이트 로딩
            속도를 늦추고 사용자 이탈률을 높이는 주된 원인이 됩니다.
            <strong>WinSam 이미지 변환기</strong>는 무거운 고해상도 이미지를 웹에 최적화된 차세대 포맷으로 일괄
            변환하여, 화질 저하를 최소화하면서도 서버 리소스를 획기적으로 절약할 수 있도록 돕습니다.
          </p>
        </div>

        {/* 2. 포맷별 특징 비교 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-emerald-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-emerald-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>차세대 WebP 포맷의 혁신</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Google에서 개발한 <strong>WebP</strong>는 손실 압축과 비손실 압축을 모두 지원하는 현대적 이미지
              포맷입니다. 기존 PNG 대비 약 26%, JPEG 대비 최대 34%까지 파일 크기를 줄이면서도 육안으로는 구별하기 힘든
              고화질을 유지합니다. 이는 구글 검색 엔진 최적화(SEO)의 핵심 지표인 'LCP(Largest Contentful Paint)' 점수를
              개선하는 데 결정적인 역할을 합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-emerald-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-emerald-600 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>투명도와 무손실 PNG-24</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              배경이 투명해야 하는 로고나 아이콘, 복잡한 텍스트가 포함된 이미지는 <strong>PNG 포맷</strong>이
              유리합니다. 알파 채널(Alpha Channel)을 통해 정교한 투명도를 구현하며, 여러 번 저장해도 화질이 깨지지 않는
              무손실 압축 방식을 사용합니다. 본 도구는 고용량 PNG를 웹용 WebP로 변환하여 투명도는 유지하면서 용량만
              다이어트하는 기능을 완벽하게 지원합니다.
            </p>
          </div>
        </div>

        {/* 3. 기술 상세 섹션 (구조화된 데이터용) */}
        <div className="space-y-6 bg-slate-900 text-slate-300 p-8 rounded-3xl shadow-xl border border-slate-800">
          <h3 className="text-xl font-bold text-white">WinSam Toolbox의 이미지 처리 아키텍처</h3>
          [Image of web image format comparison showing JPG vs PNG vs WebP file sizes and quality]
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">비트맵 래스터라이징:</span> 브라우저의 GPU 가속을 활용하여
                픽셀 데이터를 실시간으로 재구성합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">손실율(Quality) 최적화:</span> 웹 표준에 가장 적합한 압축
                알고리즘을 적용하여 용량과 화질의 균형을 맞춥니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">멀티 스레딩 일괄 처리:</span> 여러 개의 이미지를 동시에
                큐(Queue)에 쌓아 끊김 없이 변환 작업을 완료합니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">메타데이터 보호:</span> 변환 과정에서 이미지의 불필요한
                메타데이터를 제거하여 보안과 용량 절감을 동시에 달성합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 4. 보안 및 로컬 처리 가이드 (신뢰도 극대화) */}
        <div className="p-8 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="p-4 bg-white rounded-full border border-emerald-200 shadow-inner">
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="space-y-2 flex-1 text-center md:text-left">
              <h3 className="font-bold text-emerald-900 text-xl flex items-center gap-2 justify-center md:justify-start">
                개인정보 보호를 위한 100% 로컬 렌더링
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                사용자의 사진은 귀중한 자산이며 개인정보입니다.{" "}
                <strong>WinSam Toolbox는 업로드하신 어떠한 이미지도 서버로 전송하지 않습니다.</strong>
                브라우저의 <strong>HTML5 Canvas API</strong>와 <strong>WebAssembly</strong> 기술을 사용하여 모든 변환
                작업을 사용자의 PC 내부에서 수행합니다. 가족사진, 신분증 스캔본, 기업 보안 문서 등을 변환할 때도 유출
                걱정 없이 가장 안전하게 이용하실 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4 border-t border-emerald-100">
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase">
              No_Upload_Privacy
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase">
              Canvas_API_Processing
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase">
              Client_Side_Only
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Lucide icon helper
function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
