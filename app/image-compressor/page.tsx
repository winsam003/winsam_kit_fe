"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Download, Loader2, Files, UploadCloud, Trash2, Link as LinkIcon, ChevronLeft } from "lucide-react";
import AdfitBanner from "@/components/AdfitBanner";

interface CompressedResult {
  oldName: string;
  oldSize: number;
  newFile: File;
}

export default function ImageCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<CompressedResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 처리 공통 함수
  const processFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter((file) => file.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...imageFiles]);
    setResults([]);
  };

  // 드래그 이벤트 핸들러
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleBatchCompress = async () => {
    if (files.length === 0) return;
    setLoading(true);
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };

    try {
      const compressedPromises = files.map(async (file) => {
        const compressed = await imageCompression(file, options);
        return { oldName: file.name, oldSize: file.size, newFile: compressed };
      });
      const allResults = await Promise.all(compressedPromises);
      setResults(allResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (file: File, name: string) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed_${name}`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" />
            메인으로
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">이미지 일괄 압축</h1>

      {/* 대형 드롭 존 카드 */}
      <Card
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed transition-all cursor-pointer p-12 flex flex-col items-center justify-center space-y-4 ${
          isDragging ? "border-blue-500 bg-blue-50 scale-[1.01]" : "border-slate-300 hover:border-slate-400"
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))}
        />

        <div className="bg-blue-100 p-4 rounded-full">
          <UploadCloud className="w-10 h-10 text-blue-600" />
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold">이미지를 여기에 드래그하거나 클릭하여 업로드</p>
          <p className="text-sm text-slate-500">JPG, PNG, WEBP (여러 장 가능)</p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
            현재 {files.length}개의 파일 대기 중
          </div>
        )}
      </Card>

      {files.length > 0 && results.length === 0 && (
        <div className="flex justify-center">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleBatchCompress();
            }}
            disabled={loading}
            className="w-full md:w-80 h-14 text-lg shadow-lg"
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : `${files.length}장 일괄 압축하기`}
          </Button>
        </div>
      )}

      {/* 결과 리스트 */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2 italic">
              <Files className="w-5 h-5 text-blue-600" /> Compression Results
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFiles([]);
                setResults([]);
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" /> 모두 지우기
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {results.map((res, idx) => (
              <Card key={idx} className="overflow-hidden border-none shadow-sm bg-white border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium truncate">{res.oldName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400 line-through">
                        {(res.oldSize / 1024 / 1024).toFixed(2)}MB
                      </span>
                      <span className="text-xs font-bold text-green-600">
                        {(res.newFile.size / 1024 / 1024).toFixed(2)}MB
                      </span>
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">
                        {Math.round((1 - res.newFile.size / res.oldSize) * 100)}% 절감
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(res.newFile, res.oldName);
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" /> 받기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
      <div className="mt-16 space-y-10">
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-2">
            이미지 압축이 왜 필요한가요? 🖼️
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              고화질 사진은 용량이 커서 웹사이트 로딩 속도를 늦추거나, 이메일 첨부 제한 용량을 초과하기 쉽습니다.
              <strong>이미지 일괄 압축 도구</strong>는 화질 저하를 최소화하면서 파일 크기를 최대 90%까지 줄여줍니다.
            </p>
            <p>
              특히 블로그 운영자나 웹 개발자에게 <strong>이미지 최적화</strong>는 필수입니다. 용량이 작은 이미지는 구글
              검색 엔진 최적화(SEO)에 긍정적인 영향을 주며, 사용자들에게 쾌적한 브라우징 경험을 제공합니다.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-50 border-none shadow-none">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 text-blue-600">⚡ 빠른 속도</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Web Worker 기술을 사용하여 브라우저 내에서 여러 장의 이미지를 동시에 병렬 처리합니다. 수십 장의 고용량
                사진도 단 몇 초 만에 압축이 완료됩니다.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-none shadow-none">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 text-green-600">📉 효율적인 용량</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                지능형 압축 알고리즘을 통해 사람의 눈으로 구별하기 힘든 수준에서 불필요한 메타데이터와 색상 정보를
                최적화하여 파일 크기를 획기적으로 줄입니다.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-none shadow-none">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 text-orange-600">🔐 완전한 보안</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                업로드한 이미지는 외부 서버로 전송되지 않습니다. 모든 작업이 <strong>사용자의 기기 내부</strong>에서
                이뤄지므로 소중한 사진 정보가 유출될 걱정이 전혀 없습니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="p-8 bg-blue-50/30 rounded-2xl border border-blue-100">
          <h2 className="text-xl font-bold mb-6 text-slate-800">지원하는 파일 형식 및 활용 팁</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">지원 형식</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>
                  <strong>JPG / JPEG</strong>: 사진 촬영 결과물 압축에 최적
                </li>
                <li>
                  <strong>PNG</strong>: 투명 배경이 포함된 로고나 아이콘 최적화
                </li>
                <li>
                  <strong>WEBP</strong>: 차세대 이미지 웹 표준 규격 지원
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">활용 팁</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                압축 전후의 파일 크기를 실시간으로 비교해 보세요. 절감률(% 표시)을 확인하여 저장 공간을 얼마나
                확보했는지 한눈에 파악할 수 있습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
