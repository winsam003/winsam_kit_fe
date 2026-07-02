import type { Metadata } from "next";
import Link from "next/link";

const CONTACT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfeaJDRwz5O4Svn77LTWjtAGakGzKDKCITVrNpB4QZdy6gLww/viewform?usp=header";

export const metadata: Metadata = {
  title: "사이트 및 운영자 소개",
  description: "WinSam Tools를 만든 이유, 콘텐츠 작성 원칙과 문의 방법을 안내합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-stone-200 p-8 md:p-14 space-y-10 text-stone-700 leading-relaxed">
      <header className="space-y-4">
        <p className="text-sm font-bold text-emerald-600">ABOUT WINSAM TOOLS</p>
        <h1 className="text-4xl font-black text-stone-900">반복 작업을 줄이려고 직접 만든 웹 도구</h1>
        <p className="text-lg text-stone-500">
          WinSam Tools는 개발과 문서 작업 중 자주 필요했던 작은 기능을 한곳에 모은 개인 개발 프로젝트입니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-stone-900">운영자와 작성 원칙</h2>
        <p>
          사이트와 편집 콘텐츠는 <strong>WinSam 운영자</strong>가 직접 개발·작성·검토합니다. 도구 설명은 실제 구현을
          기준으로 작성하며, 지원 형식이나 제한사항이 바뀌면 관련 페이지도 함께 수정합니다. 자동 공개형 사용자 게시판은
          운영하지 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-stone-900">데이터 처리 원칙</h2>
        <p>
          변환 도구 대부분은 브라우저 안에서 실행됩니다. 다만 IP 확인, 접속 분석, 광고, 문의처럼 외부 서비스가 필요한
          기능은 해당 페이지와 <Link href="/privacy" className="text-emerald-700 underline">개인정보처리방침</Link>에
          처리 방식을 공개합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-stone-900">수정 요청과 문의</h2>
        <p>오류 제보, 기능 제안, 콘텐츠 수정 요청은 아래 양식으로 받습니다. 확인한 내용은 재현 후 반영 여부를 결정합니다.</p>
        <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-xl bg-stone-900 text-white px-5 py-3 text-sm font-semibold">
          문의 및 의견 보내기
        </a>
      </section>
    </article>
  );
}
