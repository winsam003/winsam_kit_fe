"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Globe, Copy, Check, RefreshCw, MapPin, Monitor, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdfitBanner from "@/components/AdfitBanner";

export default function MyIPChecker() {
  const [ipData, setIpData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchIP = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setIpData(data);
    } catch (error) {
      console.error("IP 정보를 가져오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIP();
  }, []);

  const handleCopy = () => {
    if (!ipData?.ip) return;
    navigator.clipboard.writeText(ipData.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" /> 메인으로
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Globe className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold">내 아이피 확인</h1>
        </div>
        <Button variant="outline" size="sm" onClick={fetchIP} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          새로고침
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 메인 IP 카드 */}
        <Card className="md:col-span-3 bg-indigo-600 text-white shadow-xl overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            <Globe className="w-64 h-64" />
          </div>
          <CardContent className="p-10 flex flex-col items-center justify-center space-y-4 relative z-10">
            <p className="text-indigo-100 font-medium">Your Public IP Address</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">{loading ? "Checking..." : ipData?.ip}</h2>
            <Button
              onClick={handleCopy}
              variant="secondary"
              className="mt-4 bg-white text-indigo-600 hover:bg-indigo-50"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "복사 완료" : "IP 주소 복사"}
            </Button>
            {/* --- [중단 광고 영역] --- */}
            <div className="flex justify-center my-6">
              <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
            </div>
          </CardContent>
        </Card>
        {/* 상세 정보 카드들 */}
        <Card className="flex items-center p-4 gap-4 shadow-sm border-slate-100">
          <div className="p-3 bg-slate-100 rounded-full text-slate-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">위치 (Location)</p>
            <p className="font-bold">{loading ? "..." : `${ipData?.city}, ${ipData?.country_name}`}</p>
          </div>
        </Card>

        <Card className="flex items-center p-4 gap-4 shadow-sm border-slate-100">
          <div className="p-3 bg-slate-100 rounded-full text-slate-600">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">통신사 (ISP)</p>
            <p className="font-bold truncate max-w-[150px]">{loading ? "..." : ipData?.org}</p>
          </div>
        </Card>

        <Card className="flex items-center p-4 gap-4 shadow-sm border-slate-100">
          <div className="p-3 bg-slate-100 rounded-full text-slate-600">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">표준 시간대</p>
            <p className="font-bold">{loading ? "..." : ipData?.timezone}</p>
          </div>
        </Card>
      </div>

      {/* --- 상세 활용 가이드 (대폭 강화 버전) --- */}
      <section className="mt-16 space-y-12 border-t pt-12 text-slate-700">
        {/* 1. 기본 정의 섹션 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-base">
              ?
            </span>
            공인 IP 주소(Public IP Address)란 무엇인가요?
          </h2>
          <p className="leading-relaxed text-lg">
            IP 주소는 컴퓨터 네트워크에서 장치들이 서로를 식별하고 통신하기 위해 사용하는{" "}
            <strong>고유한 디지털 주소</strong>입니다. 그중에서도 공인 IP는 전 세계 어디에서나 접근 가능한 유일한
            주소로, 인터넷 서비스 제공업체(ISP)가 여러분의 모뎀이나 라우터에 할당합니다. 우리가 흔히 말하는 '내
            아이피'는 바로 이 외부 노출용 공인 IP를 의미합니다.
          </p>
        </div>

        {/* 2. 상세 설명 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-indigo-600 text-lg">공인 IP vs 사설 IP</h3>
            <p className="text-sm leading-relaxed">
              <strong>공인 IP</strong>가 집의 전체 주소라면, <strong>사설 IP</strong>(192.168.x.x 등)는 집 안의 방
              번호와 같습니다. 공유기 내부에서 사용하는 사설 IP는 외부에서 직접 접속할 수 없으므로, 외부 서버와 통신할
              때는 반드시 공유기의 공인 IP를 거치게 됩니다. 본 도구는 보안 설정에 꼭 필요한 실제 공인 IP를 정확히
              찾아냅니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-indigo-600 text-lg">IPv4와 IPv6의 차이</h3>
            <p className="text-sm leading-relaxed">
              현재 가장 널리 쓰이는 <strong>IPv4</strong>는 0.0.0.0 형식을 가지며 약 43억 개의 주소를 생성할 수
              있습니다. 주소 부족 문제를 해결하기 위해 등장한 <strong>IPv6</strong>는 훨씬 긴 16진수 조합을 사용합니다.
              WinSam Tools는 현재 가장 범용적인 IPv4 확인 기능을 우선적으로 제공합니다.
            </p>
          </div>
        </div>

        {/* 3. 활용 사례 (구글이 좋아하는 정보성 리스트) */}
        <div className="space-y-6 bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
          <h3 className="text-xl font-bold text-slate-900">내 아이피 주소 확인이 필요한 경우</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="flex gap-3">
              <div className="text-indigo-600 font-bold">01.</div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">서버 보안 설정 (Whitelist)</h4>
                <p className="text-xs text-slate-500">
                  특정 IP에서만 서버 접속을 허용하도록 방화벽을 설정할 때 필요합니다.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="text-indigo-600 font-bold">02.</div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">원격 접속 및 게임 서버</h4>
                <p className="text-xs text-slate-500">
                  자신의 PC를 서버로 활용하거나 원격 데스크톱을 연결할 때 주소를 확인해야 합니다.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="text-indigo-600 font-bold">03.</div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">네트워크 트러블슈팅</h4>
                <p className="text-xs text-slate-500">
                  인터넷 연결 문제를 진단하거나 VPN 연결 상태를 확인할 때 유용합니다.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="text-indigo-600 font-bold">04.</div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">개인정보 보안 점검</h4>
                <p className="text-xs text-slate-500">
                  현재 접속 경로가 안전한지, 자신의 위치 정보가 어떻게 유추되는지 파악할 수 있습니다.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* 4. 개인정보 보호 안내 (신뢰도 향상) */}
        <section className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-full uppercase tracking-widest">
            Privacy First Policy
          </div>
          <h2 className="text-xl font-bold text-slate-900">IP 조회에 외부 서비스를 사용합니다</h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-500 leading-relaxed">
            IP와 네트워크 정보 확인을 위해 브라우저가 ipapi.co에 직접 요청합니다. WinSam Tools는 조회 결과를 별도 DB에
            저장하지 않지만, 요청 처리와 로그 보관에는 ipapi.co의 개인정보처리방침이 적용됩니다.
          </p>
        </section>
      </section>
    </div>
  );
}
