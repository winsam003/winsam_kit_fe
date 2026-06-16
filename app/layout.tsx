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
  // 호객 멘트 제거, 담백하게 변경
  title: "WinSam Tools - 일상과 업무를 돕는 소소한 웹 도구",
  description:
    "제가 쓰려고 만든 잡다한 유틸리티 모음입니다. 글자수 세기, 이미지 변환 등 가끔 필요한 기능들을 브라우저에서 편하게 사용하세요.",
  keywords: ["웹 도구", "글자수 세기", "이미지 압축", "JSON 포맷터", "유틸리티"],
  openGraph: {
    title: "WinSam Tools - 웹 도구 모음",
    description: "가끔 필요한데 찾으면 없는 도구들, 모아뒀습니다.",
    url: "https://winsam.xyz",
    siteName: "WinSam Tools",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8286025705631064"
          crossOrigin="anonymous"
        />
        <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="lazyOnload" />
        <meta name="google-adsense-account" content="ca-pub-8286025705631064" />
        <meta name="naver-site-verification" content="8b1b18aafcee1dc9b2566d0485845c09eb102599" />
        <meta name="google-site-verification" content="RNkeSZzWbR8T4Pp_OTNspdHciimBargpK1SBOpatEyY" />
      </head>
      <body className="antialiased bg-stone-50" suppressHydrationWarning={true}>
        <Analytics />

        {/* 톤 다운된 깔끔한 헤더 */}
        <header className="p-4 border-b bg-white flex justify-center">
          <Image src="/favicon.ico" alt="로고" width={28} height={28} className="rounded-md" />
          WinSam Tools
        </header>
        {/* 메인 히어로 섹션: 마우스 호버 시 은은한 버튼 효과 */}
        <section className="flex justify-center pt-12 pb-8 px-4">
          <Link
            href="/"
            className="group block text-center space-y-3 px-10 py-8 rounded-[2rem] transition-all duration-300 hover:bg-white hover:shadow-sm hover:-translate-y-0.5 active:scale-95 active:shadow-none cursor-pointer"
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800 group-hover:text-stone-950 transition-colors">
              WinSam Tools
            </h1>
            <p className="text-stone-500 text-base md:text-lg max-w-xl mx-auto group-hover:text-stone-600 transition-colors">
              일상과 업무를 돕는 소소한 웹 도구
            </p>
          </Link>
        </section>
        {/* 상단 광고 */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex justify-center pt-2">
            <AdfitBanner unitId="DAN-1yUAoORabCnnrf2E" width="728" height="90" />
          </div>
        </div>

        {/* 메인 레이아웃 컨테이너 */}
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start gap-4 px-4 md:px-6 mt-10">
          <main className="w-full flex-1 min-h-screen">
            {children}

            {/* 안내 섹션: FAQ 대신 부드러운 '소소한 안내'로 변경. 쨍한 파란색 버림 */}
            <div className="bg-stone-800 rounded-3xl p-8 md:p-10 text-stone-100 space-y-6 mb-20 shadow-sm mt-12">
              <h3 className="text-xl font-semibold">소소한 안내</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-stone-300">
                <div className="space-y-2">
                  <h4 className="text-stone-50 font-medium">데이터는 안전한가요?</h4>
                  <p className="text-sm leading-relaxed">
                    네, 입력하신 텍스트나 이미지는 서버로 전송되지 않고 사용자의 기기(브라우저) 안에서만 처리됩니다.
                    흔적도 남지 않으니 편하게 작업하세요.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-stone-50 font-medium">왜 만들었나요?</h4>
                  <p className="text-sm leading-relaxed">
                    일하다가 자잘하게 필요한 기능들을 매번 찾기 귀찮아서 하나씩 모아두기 시작한 개인 프로젝트입니다.
                    유용하게 쓰이길 바랍니다.
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

        {/* 푸터 */}
        <footer className="mt-20 border-t border-stone-200 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
            <div className="bg-stone-50 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-200">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl font-bold text-stone-800 tracking-tight">추가했으면 하는 기능이 있나요?</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  "이런 거 있으면 편하겠다" 싶은 게 있다면 편하게 남겨주세요. 주말에 뚝딱 만들어보겠습니다.
                </p>
              </div>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfeaJDRwz5O4Svn77LTWjtAGakGzKDKCITVrNpB4QZdy6gLww/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-3 bg-stone-800 text-white rounded-xl font-medium text-sm hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
              >
                의견 남기기
              </a>
            </div>
          </div>

          {/* 하단 정보 섹션 */}
          <div className="border-t border-stone-100 py-8 text-center space-y-4">
            <div className="flex justify-center gap-6 text-sm font-medium text-stone-400">
              <Link href="/privacy" className="hover:text-stone-600 transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-stone-600 transition-colors">
                이용약관
              </Link>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-stone-400">© 2026 WinSam Tools.</p>
            </div>
          </div>
        </footer>

        <ScrollButtons />
      </body>
    </html>
  );
}
