import Link from "next/link";
import { ChevronLeft, FileText, Scale, ShieldAlert, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  const lastUpdated = "2026년 01월 02일";

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-16 space-y-10 text-slate-700 leading-relaxed bg-white">
      {/* 상단 내비게이션 */}
      <Link href="/">
        <Button variant="ghost" size="sm" className="gap-2 text-slate-400 hover:text-slate-900 transition-colors">
          <ChevronLeft className="w-4 h-4" /> 메인 페이지로 돌아가기
        </Button>
      </Link>

      {/* 헤더 섹션 */}
      <div className="space-y-4 border-b border-slate-100 pb-10">
        <div className="flex items-center gap-3 text-emerald-600">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">서비스 이용약관</h1>
        </div>
        <p className="text-lg text-slate-500 max-w-2xl">
          WinSam Toolbox를 이용해주셔서 감사합니다. 본 약관은 이용자가 본 사이트의 도구 및 서비스를 이용함에 있어 필요한
          권리와 의무를 상세히 규정합니다.
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <span>최종 수정일: {lastUpdated}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>버전 v1.0.2</span>
        </div>
      </div>

      {/* 본문 섹션 */}
      <div className="grid gap-12 text-sm md:text-base">
        {/* 제 1 조 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold">제 1 조 (목적 및 수락)</h2>
          </div>
          <p className="pl-7 text-slate-600">
            본 약관은 WinSam Toolbox(이하 "서비스")가 제공하는 온라인 데이터 처리 도구, 이미지 압축, 텍스트 편집 등
            일체의 웹 서비스를 이용함에 있어, 서비스 제공자와 이용자 간의 법률적 관계를 정의합니다. 귀하가 본 사이트의
            도구를 사용하는 것은 본 약관의 모든 내용을 숙지하고 동의한 것으로 간주됩니다.
          </p>
        </section>

        {/* 제 2 조 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold">제 2 조 (서비스의 범위와 책임의 한계)</h2>
          </div>
          <div className="pl-7 space-y-3 text-slate-600">
            <p>
              1. 서비스는 모든 기능을 원칙적으로 무료로 제공하며, 별도의 계정 생성이나 개인정보 입력 없이 즉시 이용
              가능합니다.
            </p>
            <p>
              2. 본 서비스는 "있는 그대로(As-Is)" 제공됩니다. 서비스 제공자는 결과물의 정확성, 신뢰성, 최신성을 보장하기
              위해 최선을 다하지만, 기술적 한계나 입력 데이터의 오류로 인한 결과에 대해서는 법적 책임을 지지 않습니다.
            </p>
            <p className="bg-slate-50 p-4 border-l-4 border-amber-400 italic">
              "중요한 작업(금융, 법률, 보안 관련)에 본 도구를 사용하실 경우, 반드시 결과물을 재검증하시기 바랍니다."
            </p>
          </div>
        </section>

        {/* 제 3 조 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold">제 3 조 (이용자의 의무와 권리)</h2>
          </div>
          <ul className="pl-7 list-disc space-y-2 text-slate-600">
            <li>
              이용자는 본 서비스를 불법적인 목적(해킹, 데이터 탈취, 비정상적 트래픽 발생 등)으로 이용할 수 없습니다.
            </li>
            <li>
              서비스의 결과물을 상업적으로 이용하는 것은 허용되나, 서비스 자체를 재판매하거나 프레임워크를 무단 복제하는
              행위는 금지됩니다.
            </li>
            <li>
              이용자는 본 서비스가 웹 브라우저 기반으로 작동함을 이해하며, 본인의 브라우저 환경에 따른 성능 차이를
              인정합니다.
            </li>
          </ul>
        </section>

        {/* 제 4 조 (핵심: 광고 및 수익) */}
        <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ShieldAlert className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">제 4 조 (제3자 광고 및 분석 도구)</h2>
          </div>
          <p className="pl-7 text-slate-600">
            본 사이트는 지속적인 무료 서비스 유지를 위해 <strong>Google AdSense</strong> 광고를 게재합니다. 이 과정에서
            구글은 이용자의 방문 패턴을 분석하기 위해 쿠키를 활용할 수 있으며, 관련 사항은 본 사이트의{" "}
            <strong>개인정보처리방침</strong>에 상세히 기술되어 있습니다.
          </p>
        </section>

        {/* 제 5 조 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold">제 5 조 (고객 지원 및 분쟁 해결)</h2>
          </div>
          <p className="pl-7 text-slate-600">
            서비스 이용 중 발생하는 기술적 문제나 개선 사항은 사이트 하단에 연결된 <strong>"문의하기"</strong> 섹션(또는
            고객센터 폼)을 통해 제안할 수 있습니다. 운영자는 이용자의 피드백을 수렴하여 서비스 품질 개선에 최선을
            다합니다.
          </p>
        </section>
      </div>

      {/* 푸터 영역 */}
      <div className="pt-12 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-400 italic">
          본 이용약관은 대한민국 법령을 준수하며, 2026년 1월 2일부터 시행됩니다.
        </p>
      </div>
    </div>
  );
}
