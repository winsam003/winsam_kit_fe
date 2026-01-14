import type { Metadata } from "next";
import "./globals.css";
import ScrollButtons from "@/components/custom-ui/ScrollButtons";
import Image from "next/image";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import AdfitBanner from "@/components/AdfitBanner";
import AdfitInitializer from "@/components/AdfitInitializer";

export const metadata: Metadata = {
  title: "WinSam Toolbox - 무료 온라인 툴박스 | 글자수 세기, 이미지 압축, JSON 정렬",
  description:
    "회원가입 없이 100% 무료로 사용하는 온라인 도구 모음. 글자수 세기, 이미지 압축, JSON 정렬, PDF 추출 등 업무와 일상에 필요한 모든 툴을 제공합니다.",
  keywords: ["온라인 툴박스", "글자수 세기", "이미지 압축", "JSON 정렬", "Base64 변환", "무료 웹 도구"],
  openGraph: {
    title: "WinSam Toolbox - 무료 온라인 툴박스",
    description: "업무 효율을 높여주는 무료 온라인 도구 모음",
    url: "https://winsam.xyz",
    siteName: "WinSam Toolbox",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8286025705631064"
          crossOrigin="anonymous"
        ></script>
        <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="lazyOnload" />
        <meta name="google-adsense-account" content="ca-pub-8286025705631064" />
        <meta name="naver-site-verification" content="8b1b18aafcee1dc9b2566d0485845c09eb102599" />
        <meta name="google-site-verification" content="RNkeSZzWbR8T4Pp_OTNspdHciimBargpK1SBOpatEyY" />
      </head>
      <body className="antialiased bg-slate-50" suppressHydrationWarning={true}>
        <Analytics />

        <header className="p-4 border-b bg-white font-bold flex items-center justify-center gap-2">
          <Image src="/favicon.ico" alt="로고" width={34} height={34} />
          ToolBox
        </header>

        <section className="text-center space-y-3 py-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            무료 온라인 <span className="text-blue-600">툴박스</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
            복잡한 설치 없이 브라우저에서 바로 사용하는 스마트한 도구 모음
          </p>
        </section>

        {/* 상단 광고 - 중앙 정렬 컨테이너 적용 */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex justify-center pt-4">
            <AdfitBanner unitId="DAN-1yUAoORabCnnrf2E" width="728" height="90" />
          </div>
        </div>

        {/* 메인 레이아웃 컨테이너 */}
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start gap-4 px-4 md:px-6 mt-8">
          <main className="w-full flex-1 min-h-screen">
            {/* 1. 실제 페이지 콘텐츠 */}
            {children}

            {/* 3. FAQ 섹션 (본문 너비에 맞춤) */}
            <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white space-y-6 mb-20">
              <h3 className="text-2xl font-bold">자주 묻는 질문 (FAQ)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-blue-100">
                <div className="space-y-2">
                  <h4 className="text-white font-bold">Q: 왜 회원가입이 없나요?</h4>
                  <p className="text-sm leading-relaxed">
                    우리는 도구가 본질이 '즉시성'에 있다고 생각합니다. 계정 생성이라는 장벽을 제거하여 누구나 필요할 때
                    바로 도구를 사용할 수 있는 환경을 추구합니다.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-white font-bold">Q: 모바일에서도 사용 가능한가요?</h4>
                  <p className="text-sm leading-relaxed">
                    네, WinSam Toolbox는 <strong>반응형 웹 디자인</strong>으로 제작되었습니다. 스마트폰, 태블릿,
                    데스크톱 등 모든 기기에서 최적화된 화면으로 이용 가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* 오른쪽 사이드바 광고 */}
          <aside className="hidden lg:block w-[160px] shrink-0 sticky top-24 pt-6">
            <AdfitBanner unitId="DAN-IgYCG7rmtBGYHMD8" width="160" height="600" />
          </aside>
        </div>

        <footer className="p-10 border-t bg-white text-center space-y-8">
          <div className="flex flex-col items-center gap-6">
            {/* 강조된 문의하기 버튼 섹션 */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-bold text-slate-500">도구가 더 필요하신가요?</p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfeaJDRwz5O4Svn77LTWjtAGakGzKDKCITVrNpB4QZdy6gLww/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                새로운 기능 제안하기
              </a>
            </div>

            {/* 보조 링크들 */}
            <div className="flex justify-center gap-8 text-sm font-medium text-slate-400 mt-4">
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                개인정보처리방침
              </Link>
              <div className="w-px h-4 bg-slate-200 self-center" />
              <Link href="/terms" className="hover:text-slate-900 transition-colors">
                이용약관
              </Link>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] text-slate-300 tracking-widest uppercase font-bold">Safe & Private Toolbox</p>
            <p className="text-xs text-slate-400">© 2026 WinSam Toolbox. All rights reserved.</p>
          </div>
        </footer>

        <ScrollButtons />
      </body>
    </html>
  );
}
