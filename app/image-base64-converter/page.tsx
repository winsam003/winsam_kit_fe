"use client";

import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Copy,
  Check,
  Trash2,
  ImageIcon,
  Download,
  Upload,
  ShieldCheck,
  FileCode,
  Zap,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdfitBanner from "@/components/AdfitBanner";

export default function ImageBase64Converter() {
  const [base64String, setBase64String] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. 이미지 파일을 Base64로 변환
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64String(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Base64 텍스트를 입력받아 이미지로 미리보기
  const handleBase64InputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBase64String(value);

    // 유효한 Data URI 형식인지 간단히 체크 후 미리보기 업데이트
    if (value.startsWith("data:image/")) {
      setImagePreview(value);
    } else {
      setImagePreview(null);
    }
  };

  const handleCopy = async () => {
    if (!base64String) return;
    await navigator.clipboard.writeText(base64String);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setBase64String("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 이미지 다운로드 기능 (Base64 -> File)
  const downloadImage = () => {
    if (!imagePreview) return;
    const link = document.createElement("a");
    link.href = imagePreview;
    link.download = `winsam-converted-image-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" />
            메인으로
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">이미지 ↔ Base64 변환기</h1>
        <p className="text-slate-500">이미지를 코드로 변환하거나, Base64 코드를 다시 이미지 파일로 복원합니다.</p>
      </div>

      <Tabs defaultValue="img-to-b64" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="img-to-b64">이미지 ➔ Base64</TabsTrigger>
          <TabsTrigger value="b64-to-img">Base64 ➔ 이미지</TabsTrigger>
        </TabsList>

        {/* --- Case 1: 이미지 -> Base64 --- */}
        <TabsContent value="img-to-b64" className="space-y-6">
          <Card className="border-dashed border-2 border-slate-200 hover:border-blue-400 transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">이미지 파일을 선택하거나 여기에 드래그하세요</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF, WebP 지원</p>
              </div>
              <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                파일 선택하기
              </Button>
            </CardContent>
          </Card>

          {base64String && (
            <Card className="bg-slate-50 border-none shadow-inner">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-blue-600 flex items-center gap-2">
                  <FileCode className="w-4 h-4" /> 변환된 Base64 코드
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    코드 복사
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearAll} className="text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  value={base64String}
                  className="h-48 font-mono text-[11px] bg-white border-slate-200 leading-relaxed break-all"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* --- Case 2: Base64 -> 이미지 --- */}
        <TabsContent value="b64-to-img" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-700">Base64 문자열 입력</CardTitle>
              <CardDescription>data:image/... 로 시작하는 전체 코드를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="h-48 font-mono text-xs"
                placeholder="data:image/png;base64,..."
                value={base64String}
                onChange={handleBase64InputChange}
              />
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-slate-400">
                  <Trash2 className="w-4 h-4 mr-2" /> 초기화
                </Button>
              </div>
            </CardContent>
          </Card>

          {imagePreview && (
            <Card className="overflow-hidden border-2 border-blue-100">
              <CardHeader className="bg-blue-50/50 flex flex-row items-center justify-between border-b">
                <CardTitle className="text-sm font-bold text-blue-800 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> 이미지 미리보기
                </CardTitle>
                <Button size="sm" onClick={downloadImage} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4" /> 파일로 저장
                </Button>
              </CardHeader>
              <CardContent className="flex justify-center p-8 bg-white">
                <img
                  src={imagePreview}
                  alt="Base64 Preview"
                  className="max-w-full max-h-[400px] rounded shadow-lg object-contain border"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* --- 광고 영역 --- */}
      <div className="flex justify-center my-12">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>

      {/* --- 상세 활용 가이드 --- */}
      <section className="mt-20 space-y-12 border-t pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">HTTP 요청 최적화</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              작은 아이콘이나 로딩 바 이미지를 Base64로 인코딩하여 HTML/CSS에 내장하면, 추가적인 HTTP 요청 없이 페이지를
              렌더링할 수 있어 속도 향상에 도움이 됩니다.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">100% 로컬 처리</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              사용자의 이미지는 서버로 업로드되지 않습니다. 브라우저의 <code>FileReader API</code>를 사용하여 모든 변환
              과정이 사용자 기기 내에서만 이루어지므로 개인정보가 보호됩니다.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">보안 및 무결성</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Base64 데이터는 텍스트 기반 시스템에서 바이너리 이미지가 깨지는 것을 방지합니다. 전자 서명이나 보안
              인증서와 연동된 이미지를 전송할 때 유용합니다.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-slate-300">
          <h2 className="text-2xl font-bold text-white mb-6">이미지 Base64 변환 원리</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm mt-8">
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Data URI Scheme</h4>
              <p>
                변환된 코드는 <code>data:[mediatype];base64,[data]</code> 형식을 따릅니다. 이를 브라우저 주소창에 넣거나{" "}
                <code>&lt;img src="..."&gt;</code> 태그에 직접 사용할 수 있습니다.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold">주의사항</h4>
              <p>
                Base64로 인코딩하면 원본 이미지 파일보다 용량이 <strong>약 33% 증가</strong>합니다. 대용량 사진보다는
                10KB 미만의 작은 에셋 처리에 권장됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
