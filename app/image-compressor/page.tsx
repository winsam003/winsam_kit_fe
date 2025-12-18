"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"; 
import { Download, Loader2, Files, UploadCloud, Trash2, Link as LinkIcon, ChevronLeft } from "lucide-react";

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
    const imageFiles = newFiles.filter(file => file.type.startsWith("image/"));
    setFiles(prev => [...prev, ...imageFiles]);
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
            onClick={(e) => { e.stopPropagation(); handleBatchCompress(); }} 
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
            <Button variant="ghost" size="sm" onClick={() => {setFiles([]); setResults([]);}}>
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
                      <span className="text-xs text-slate-400 line-through">{(res.oldSize / 1024 / 1024).toFixed(2)}MB</span>
                      <span className="text-xs font-bold text-green-600">{(res.newFile.size / 1024 / 1024).toFixed(2)}MB</span>
                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">
                        {Math.round((1 - res.newFile.size / res.oldSize) * 100)}% 절감
                      </span>
                    </div>
                  </div>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); downloadImage(res.newFile, res.oldName); }}>
                    <Download className="w-4 h-4 mr-1" /> 받기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}