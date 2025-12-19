import type { Metadata } from "next";
import "./globals.css";
import ScrollButtons from "@/components/custom-ui/ScrollButtons";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: "WinSam Toolbox - 무료 온라인 툴박스 | 글자수 세기, 이미지 압축, JSON 정렬",
  description: "회원가입 없이 100% 무료로 사용하는 온라인 도구 모음. 글자수 세기, 이미지 압축, JSON 정렬, PDF 추출 등 업무와 일상에 필요한 모든 툴을 제공합니다.",
  keywords: ["온라인 툴박스", "글자수 세기", "이미지 압축", "JSON 정렬", "Base64 변환", "무료 웹 도구"],
  openGraph: {
    title: "WinSam Toolbox - 무료 온라인 툴박스",
    description: "업무 효율을 높여주는 무료 온라인 도구 모음",
    url: "https://winsam.xyz",
    siteName: "WinSam Toolbox",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8286025705631064"
          crossOrigin="anonymous"
          strategy="afterInteractive" // 페이지가 로드된 후 부드럽게 광고 스크립트 실행
        />
        <meta name="google-adsense-account" content="ca-pub-8286025705631064" />

        <meta 
          name="naver-site-verification" 
          content="8b1b18aafcee1dc9b2566d0485845c09eb102599" 
        />


      </head>
      <body className="antialiased bg-slate-50">
        <header className="p-4 border-b bg-white font-bold flex items-center justify-center gap-2">
          {/* 2. 로고 이미지 추가 */}
          <Image 
            src="/favicon.ico" 
            alt="로고" 
            width={34} 
            height={34} 
          />
          ToolBox
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>

        <footer className="p-10 border-t bg-white text-center text-sm text-gray-500">
            © 2025 WinSam Toolbox. All rights reserved.
        </footer>

        <ScrollButtons />
      </body>
    </html>
  );
}