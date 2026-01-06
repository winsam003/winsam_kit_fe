"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    adfit?: any;
  }
}

export default function AdfitBanner({ unitId, width, height }: { unitId: string; width: string; height: string }) {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const callAdfit = () => {
      // 1. adfit이 있고, 현재 광고 태그가 DOM에 존재하는지 확인
      if (window.adfit && typeof window.adfit.display === "function" && adRef.current) {
        // 2. 중요: 뒤로가기 시 이미 그려진 상태를 초기화해야 다시 그려줌
        adRef.current.innerHTML = "";
        adRef.current.removeAttribute("data-ad-status");

        try {
          window.adfit.display();
        } catch (e) {
          console.error("Adfit display error:", e);
        }
      }
    };

    // 3. 스크립트 관리
    const scriptUrl = "//t1.daumcdn.net/kas/static/ba.min.js";
    let script = document.querySelector(`script[src*="${scriptUrl}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => setTimeout(callAdfit, 500);
      document.body.appendChild(script);
    } else {
      // 이미 스크립트가 있다면 DOM이 완전히 그려질 시간을 조금 준 뒤 호출
      const timer = setTimeout(callAdfit, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, unitId]); // ★ 경로가 바뀔 때마다 무조건 다시 실행

  if (!mounted) return <div style={{ minHeight: `${height}px` }} />;

  return (
    <div
      key={`${pathname}-${unitId}`} // ★ 경로가 바뀌면 컴포넌트를 아예 새로 태어나게 함
      className="flex justify-center w-full overflow-hidden"
      style={{ minHeight: `${height}px` }}
    >
      <ins
        ref={adRef}
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unitId}
        data-ad-width={width}
        data-ad-height={height}
      ></ins>
    </div>
  );
}
