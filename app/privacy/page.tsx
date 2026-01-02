import Link from "next/link";
import { ChevronLeft, ShieldCheck, Lock, EyeOff, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  const lastUpdated = "2026년 01월 02일";

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-16 space-y-10 text-slate-700 leading-relaxed bg-white">
      {/* 뒤로가기 버튼 */}
      <Link href="/">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> 메인으로 돌아가기
        </Button>
      </Link>

      {/* 상단 헤더 */}
      <div className="space-y-4 border-b border-slate-100 pb-10">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="p-2 bg-blue-50 rounded-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            개인정보처리방침
          </h1>
        </div>
        <p className="text-lg text-slate-500 max-w-2xl">
          WinSam Toolbox(이하 '본 사이트')는 이용자의 개인정보 보호를 최우선
          가치로 여기며, 관련 법령을 엄격히 준수합니다.
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <span>최종 시행일: {lastUpdated}</span>
        </div>
      </div>

      <div className="grid gap-12 text-sm md:text-base">
        {/* 1. 수집 항목 및 방법 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Lock className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">1. 개인정보 수집 및 처리 원칙</h2>
          </div>
          <div className="pl-7 space-y-3 text-slate-600">
            <p>
              본 사이트는 이용자의 자유로운 도구 사용을 보장하기 위해{" "}
              <strong>
                별도의 회원가입 절차를 운영하지 않으며, 성명, 이메일, 전화번호
                등 어떠한 개인식별정보도 강제로 수집하지 않습니다.
              </strong>
            </p>
            <p className="bg-blue-50 p-4 border-l-4 border-blue-400 font-medium">
              "중요 고지: 이용자가 도구 사용을 위해 입력하는 모든 데이터(텍스트,
              코드, 파일 등)는 서버로 전송되지 않고 사용자의 로컬 브라우저
              내에서만 처리됩니다."
            </p>
          </div>
        </section>

        {/* 2. 쿠키 및 광고 관련 (애드센스 필수 조항) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Globe className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">
              2. 쿠키(Cookie) 및 제3자 서비스 이용
            </h2>
          </div>
          <div className="pl-7 space-y-3 text-slate-600">
            <p>
              본 사이트는 서비스 최적화 및 광고 게재를 위해 '쿠키'를 사용합니다.
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Google AdSense:</strong> 구글은 쿠키를 사용하여 사용자의
                이전 방문 내역을 기반으로 맞춤형 광고를 제공합니다.
              </li>
              <li>
                <strong>Vercel Analytics:</strong> 사이트 방문자 수 및 트래픽
                분석을 위해 비식별화된 로그 정보를 수집할 수 있습니다.
              </li>
              <li>
                <strong>쿠키 거부:</strong> 이용자는 브라우저 설정을 통해 쿠키
                저장을 거부할 수 있으나, 이 경우 일부 서비스 이용에 불편이 있을
                수 있습니다.
              </li>
            </ul>
          </div>
        </section>

        {/* 3. 개인정보의 제3자 제공 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <EyeOff className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">3. 정보의 보관 및 제3자 제공</h2>
          </div>
          <p className="pl-7 text-slate-600">
            본 사이트는 이용자의 데이터를 서버에 보관하지 않으므로, 원칙적으로
            제3자에게 제공할 데이터 자체가 존재하지 않습니다. 단, 법령에
            의거하여 국가기관의 요구가 있는 경우 등 예외적인 상황에 한해 절차에
            따라 협조할 수 있습니다.
          </p>
        </section>

        {/* 4. 문의처 (고객지원) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <h2 className="text-xl font-bold ml-7">4. 개인정보 보호 문의</h2>
          </div>
          <p className="pl-7 text-slate-600">
            개인정보 보호와 관련하여 궁금하신 사항이나 제안은 사이트 하단의{" "}
            <strong>[문의하기]</strong> 링크(또는 운영자 소통 채널)를 통해
            접수해 주시기 바랍니다.
          </p>
        </section>
      </div>

      <div className="pt-10 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          © 2026 WinSam Toolbox Privacy Policy
        </p>
      </div>
    </div>
  );
}
