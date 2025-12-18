import type { Metadata } from "next";
import "./globals.css";
import ScrollButtons from "@/components/custom-ui/ScrollButtons";
import Image from "next/image";

export const metadata: Metadata = {
  title: "나만의 만능 툴 박스 | 무료 온라인 도구",
  description: "글자수 세기, 이미지 변환 등 모든 도구를 한 곳에서 확인하세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
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
          © 2025 winsam 툴 사이트!
        </footer>

        <ScrollButtons />
      </body>
    </html>
  );
}