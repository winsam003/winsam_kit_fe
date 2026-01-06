"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone"; // 아까 설치한 도구 소환
import Link from "next/link";
import {
  ChevronLeft,
  FileEdit,
  Download,
  Plus,
  Trash2,
  RefreshCw,
  Info,
  CheckCircle2,
  ShieldCheck,
  Zap,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdfitBanner from "@/components/AdfitBanner";

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
      const extension = file.name.split(".").pop();
      const fileNumber = String(index + 1).padStart(3, "0");
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
              ${
                isDragActive
                  ? "border-emerald-500 bg-emerald-50 scale-[1.01]"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
              }
            `}
          >
            <input {...getInputProps()} />
            <div
              className={`p-4 rounded-full mb-4 ${
                isDragActive ? "bg-emerald-500 text-white shadow-lg" : "bg-white text-slate-400 border border-slate-100"
              }`}
            >
              <Plus className={`w-8 h-8 ${isDragActive ? "animate-bounce" : ""}`} />
            </div>
            <p className="text-base font-semibold text-slate-700">
              {isDragActive ? "파일을 여기에 놓으세요!" : "파일을 끌어다 놓거나 클릭하여 선택"}
            </p>
          </div>
        </CardContent>
      </Card>
      {/* --- [중단 광고 영역] --- */}
      <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div>
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
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-slate-400 line-through truncate">{file.name}</span>
                    <span className="text-sm font-mono font-bold text-emerald-600 truncate">
                      {prefix
                        ? `${prefix}_${String(idx + 1).padStart(3, "0")}.${file.name.split(".").pop()}`
                        : "규칙을 입력하세요"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(idx)}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* --- SEO 및 정보 섹션 (파일 관리 및 SEO 전문 가이드) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700 font-sans">
        {/* 1. 파일 네이밍과 SEO의 상관관계 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Info className="w-8 h-8 text-emerald-600" />
            검색 엔진 최적화(SEO)를 위한 파일 네이밍 전략
          </h2>
          <p className="leading-relaxed text-lg text-slate-600">
            대부분의 사람들은 디지털 카메라나 스마트폰에서 생성된 <code>IMG_5432.jpg</code>와 같은 무의미한 파일 이름을
            그대로 사용합니다. 하지만 검색 엔진 로봇은 이미지의 시각적 내용뿐만 아니라{" "}
            <strong>파일 이름(Filename)</strong>을 통해 콘텐츠의 주제를 파악합니다. 주제에 맞는 키워드를 포함하여 파일
            이름을 일괄 변경하는 것은 구글 이미지 검색 노출 순위를 결정짓는 핵심적인{" "}
            <strong>온페이지 SEO(On-Page SEO)</strong> 기법 중 하나입니다.
          </p>
        </div>

        {/* 2. 상세 정보 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-emerald-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-emerald-700 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>데이터 가독성 및 관리 효율성</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              수백 장의 프로젝트 사진이나 문서 파일을 관리할 때, 규칙적인 접두사(Prefix)와 번호(Suffix)를 부여하면
              원하는 파일을 찾는 시간을 획기적으로 단축할 수 있습니다. WinSam 일괄 변경 도구는 날짜, 프로젝트명, 순번
              등을 조합하여 수만 개의 파일을 체계적인 디지털 자산으로 탈바꿈시켜 드립니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-emerald-300 transition-colors">
            <div className="flex items-center gap-2 font-bold text-emerald-700 text-lg">
              <BadgeCheck className="w-5 h-5" />
              <h3>웹 접근성 및 표준 준수</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              스크린 리더(Screen Reader)를 사용하는 시각 장애인 사용자들에게 의미 있는 파일 이름은 이미지의 내용을
              이해하는 보조 수단이 됩니다. Alt 태그와 더불어 논리적인 파일 이름을 사용하는 것은 보편적인 웹 접근성(Web
              Accessibility) 가이드라인을 준수하는 전문적인 개발자의 기본 소양입니다.
            </p>
          </div>
        </div>

        {/* 3. 파일 이름 작성 가이드 (전문성 강조) */}
        <div className="space-y-6 bg-slate-900 text-slate-300 p-8 rounded-3xl shadow-xl border border-slate-800">
          <h3 className="text-xl font-bold text-white">구글이 권장하는 파일 이름 작성 팁</h3>
          [Image of SEO friendly file naming conventions showing hyphens vs underscores and keyword placement]
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">하이픈(-) 사용 권장:</span> 구글 봇은 밑줄(_)보다 하이픈을
                단어 구분자로 더 잘 인식합니다. (예: <code>blue-ocean.jpg</code>)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">핵심 키워드 전면 배치:</span> 가장 중요한 단어를 파일 이름의
                앞부분에 배치하여 검색 엔진에 명확한 신호를 전달하세요.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">특수 문자 및 공백 지양:</span> 웹 URL에서 문제를 일으킬 수
                있는 공백이나 특수 문자를 제거하고 영문과 숫자를 조합하여 작성하십시오.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
              <p>
                <span className="text-white font-semibold">확장자 일관성:</span> 대문자 확장자(.JPG)보다는
                소문자(.jpg)를 사용하는 것이 서버 환경 간의 호환성을 유지하는 데 유리합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 4. 철저한 보안 가이드 (신뢰도 향상) */}
        <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="p-4 bg-white rounded-full border border-emerald-200 shadow-inner">
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="space-y-2 flex-1 text-center md:text-left">
              <h3 className="font-bold text-emerald-900 text-xl">서버 전송 없는 로컬 파일 시스템 처리</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                파일 이름을 변경하기 위해 개인의 소중한 사진이나 문서를 서버로 업로드하는 것은 매우 위험합니다.{" "}
                <strong>WinSam Toolbox</strong>는 브라우저의 <strong>File System API</strong> 및{" "}
                <strong>Blob 객체</strong> 기술을 사용하여 모든 작업을 사용자의 PC 내부에서 수행합니다. 파일은 단
                1바이트도 인터넷 망을 통해 전송되지 않으며, 원격 서버에 저장되지도 않습니다. 보안이 생명인 기업 문서나
                개인 소장용 사진도 100% 안전하게 처리할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4 border-t border-emerald-100">
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase">
              No_Cloud_Processing
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase">
              Pure_Client_Side
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full uppercase">
              Privacy_Audited
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
