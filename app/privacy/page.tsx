import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfeaJDRwz5O4Svn77LTWjtAGakGzKDKCITVrNpB4QZdy6gLww/viewform?usp=header";

export default function PrivacyPolicy() {
  return (
    <article className="max-w-4xl mx-auto p-6 md:p-16 space-y-10 text-slate-700 leading-relaxed bg-white">
      <Link href="/">
        <Button variant="ghost" size="sm" className="gap-2 text-slate-500">
          <ChevronLeft className="w-4 h-4" /> 메인으로 돌아가기
        </Button>
      </Link>

      <header className="space-y-4 border-b border-slate-100 pb-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">개인정보처리방침</h1>
        <p className="text-slate-500">시행일 및 최종 수정일: 2026년 7월 2일</p>
      </header>

      <div className="space-y-10">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. 처리하는 정보</h2>
          <p>
            회원가입 기능은 운영하지 않습니다. JSON·텍스트·이미지·PDF 등 변환 도구에 입력한 자료는 별도 안내가 없는 한
            브라우저 안에서 처리되며 WinSam Tools 서버로 전송하거나 저장하지 않습니다.
          </p>
          <p>다음 기능과 외부 서비스에서는 서비스 제공에 필요한 정보가 처리될 수 있습니다.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>IP 확인:</strong> ipapi.co가 IP 주소와 네트워크·대략적 지역 정보를 처리합니다.</li>
            <li><strong>편집 게시글:</strong> 운영자가 작성한 제목, 본문, 작성자명과 작성 시각을 Firebase에 저장합니다.</li>
            <li><strong>접속 분석:</strong> Vercel Analytics가 페이지 방문과 기기·브라우저 관련 비식별 통계를 처리할 수 있습니다.</li>
            <li><strong>문의:</strong> Google Forms를 열어 내용을 제출하면 Google의 정책에 따라 제출 정보가 처리됩니다.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. 광고와 쿠키</h2>
          <p>
            사이트는 Kakao AdFit 광고를 사용할 수 있습니다. 광고 제공자는 쿠키, 웹 비콘, IP 주소 또는 기타 식별자를
            이용해 광고 제공·빈도 제한·성과 측정·부정 사용 방지를 수행할 수 있습니다.
          </p>
          <p>
            Google의 데이터 처리 방식은{" "}
            <a className="text-blue-600 underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              파트너 사이트 또는 앱 사용 시 Google의 데이터 사용 안내
            </a>
            에서 확인할 수 있습니다. 브라우저 설정에서 쿠키를 차단하거나 삭제할 수 있습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. 보관과 제3자 처리</h2>
          <p>
            운영자 편집 게시글은 게시 목적이 유지되는 동안 Firebase에 보관하고, 삭제가 필요하면 운영자가 제거합니다.
            접속 로그·광고·문의 데이터의 보관 기간과 처리 장소는 각 제공자의 정책을 따릅니다. 법령상 의무가 있는 경우를
            제외하고, 이 방침에 적힌 목적과 무관하게 정보를 판매하지 않습니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. 문의 및 권리 행사</h2>
          <p>개인정보 관련 문의, 열람 또는 삭제 요청은 아래 운영자 문의 양식으로 접수할 수 있습니다.</p>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-semibold">
            운영자에게 문의하기
          </a>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. 방침 변경</h2>
          <p>서비스나 외부 제공자가 변경되면 이 페이지의 내용과 최종 수정일을 함께 갱신합니다.</p>
        </section>
      </div>
    </article>
  );
}
