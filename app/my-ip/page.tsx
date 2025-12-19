"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Globe, Copy, Check, RefreshCw, MapPin, Monitor, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              {loading ? "Checking..." : ipData?.ip}
            </h2>
            <Button 
              onClick={handleCopy} 
              variant="secondary" 
              className="mt-4 bg-white text-indigo-600 hover:bg-indigo-50"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "복사 완료" : "IP 주소 복사"}
            </Button>
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

      {/* --- SEO 및 정보 섹션 --- */}
      <section className="mt-12 p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">IP 주소란 무엇인가요?</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          IP(Internet Protocol) 주소는 네트워크에 연결된 장치들의 고유한 식별 번호입니다. 
          이 도구는 여러분이 현재 인터넷에 접속할 때 외부로 노출되는 <strong>공인 IP(Public IP)</strong> 정보를 보여줍니다. 
          서버 접속 허용(White-list) 설정이나 네트워크 보안 점검 시에 주로 사용됩니다.
        </p>
        <div className="flex gap-4 pt-2">
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">IPv4 지원</span>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">실시간 조회</span>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">로그 저장 없음</span>
        </div>
      </section>
    </div>
  );
}