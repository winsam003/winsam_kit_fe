import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "웹 도구 활용 가이드와 팁 | WinSam Tools",
    template: "%s | WinSam Tools",
  },
  description: "업무와 개발에 유용한 웹 도구 사용법, 생산성 팁과 기술 정보를 소개합니다.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "웹 도구 활용 가이드와 팁",
    description: "업무와 개발에 유용한 웹 도구 사용법, 생산성 팁과 기술 정보를 소개합니다.",
    url: "/blog",
    type: "website",
    locale: "ko_KR",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) { return children; }
