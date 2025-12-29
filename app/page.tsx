import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link";
import { Laptop, Briefcase, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 md:p-10 space-y-12 flex flex-col items-center bg-slate-50/30 min-h-screen">
      
      {/* 툴 제목 섹션 */}
      <section className="text-center space-y-3 py-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
          무료 온라인 <span className="text-blue-600">툴박스</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
          복잡한 설치 없이 브라우저에서 바로 사용하는 스마트한 도구 모음
        </p>
      </section>

      <div className="w-full max-w-5xl space-y-16">
        
        {/* 카테고리 1: 웹 개발 도구 */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Laptop className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">웹 개발 도구</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard 
              title="제이슨 데이터 정렬" 
              desc="JSON 포맷팅 및 문법 검사" 
              href="/json-formatter" 
            />
            <ToolCard 
              title="내 아이피 확인" 
              desc="내 공인 아이피 확인" 
              href="/my-ip" 
            />
            <ToolCard 
              title="HTML 테이블 빌더" 
              desc="엑셀 표를 복사해 넣으면 HTML 코드로 즉시 변환합니다" 
              href="/html-table-builder" 
            />
            <ToolCard 
              title="HTML 정렬기" 
              desc="복잡하게 꼬인 HTML 코드를 가독성 있게 정리합니다." 
              href="/html-formatter" 
            />
            <ToolCard 
              title="XML 뷰어 & 정렬기" 
              desc="XML 계층 구조 확인 및 정렬" 
              href="/xml-formatter" 
            />
            <ToolCard 
              title="Base64 변환기" 
              desc="텍스트 및 이미지 인코딩/디코딩" 
              href="/base64-converter" 
            />
            <ToolCard 
              title="해시 생성기" 
              desc="SHA-256 등 보안 해시 생성" 
              href="/hash-generator" 
            />
            <ToolCard 
              title="더미 데이터 생성" 
              desc="개발용 로렘 입숨 텍스트 생성" 
              href="/lorem-ipsum" 
            />
            <ToolCard 
              title="URL 인코더/디코더" 
              desc="URL에 포함된 특수문자와 한글을 안전하게 변환합니다" 
              href="/url-converter" 
            />
          </div>
        </section>

        {/* 카테고리 2: 직장인 & 일상 도구 */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Briefcase className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-800">직장인 & 일상 도구</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard 
              title="글자수 세기" 
              desc="자소서, 블로그 실시간 글자수 확인" 
              href="/word-counter" 
            />
            <ToolCard 
              title="이미지 압축" 
              desc="화질 저하 없이 용량 다이어트" 
              href="/image-compressor" 
            />
            <ToolCard 
              title="이미지 포맷 변환" 
              desc="JPG, PNG, WebP 등 포맷 변경" 
              href="/image-converter" 
            />
            <ToolCard 
              title="PDF 페이지 추출" 
              desc="PDF에서 특정 페이지만 별도 저장" 
              href="/pdf-viewer" 
            />
            <ToolCard 
              title="PDF 페이지 회전" 
              desc="PDF에서 페이지 회전" 
              href="/pdf-rotate" 
            />
          </div>
        </section>

      </div>

      {/* 안내 섹션 */}
      <section className="max-w-5xl w-full mt-10 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-600">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">WinSam Toolbox: 일상의 편리함을 더하는 곳</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 leading-relaxed text-sm">
          <div className="space-y-4">
            <p>
              <strong>WinSam Toolbox</strong>는 별도의 설치나 회원가입 없이 모든 도구를 <strong>100% 무료</strong>로 제공합니다. 업무와 일상에서 반복되는 번거로운 작업을 단 몇 번의 클릭으로 해결해 보세요.
            </p>
          </div>
          <div className="space-y-4 border-l border-slate-100 pl-0 md:pl-10">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">개인정보 보호 우선</h3>
            <p>
              입력하시는 모든 데이터와 이미지는 사용자의 브라우저 내에서만 처리되며, 서버로 절대 전송되지 않습니다. 보안 걱정 없이 안심하고 사용하세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// shadcn 기반 재사용 카드 컴포넌트
function ToolCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-slate-200 group flex flex-col">
      <CardHeader className="flex-1">
        <CardTitle className="group-hover:text-blue-600 transition-colors">{title}</CardTitle>
        <CardDescription className="pt-2">{desc}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link href={href}>
          <Button className="w-full bg-slate-900 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            사용하기 <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}