import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto rounded-3xl border border-stone-200 bg-white p-10 md:p-14 text-center space-y-6">
      <p className="text-sm font-bold tracking-widest text-stone-400">404</p>
      <h1 className="text-3xl font-black text-stone-900">요청한 페이지를 찾을 수 없습니다.</h1>
      <p className="text-stone-500 leading-relaxed">
        주소가 바뀌었거나 삭제된 페이지입니다. 아래 링크에서 공개된 도구와 가이드를 계속 확인할 수 있습니다.
      </p>
      <nav className="flex flex-wrap justify-center gap-3" aria-label="추천 페이지">
        <Link href="/" className="rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white">도구 전체 보기</Link>
        <Link href="/blog" className="rounded-xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700">활용 가이드</Link>
        <Link href="/about" className="rounded-xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700">사이트 소개</Link>
      </nav>
    </section>
  );
}
