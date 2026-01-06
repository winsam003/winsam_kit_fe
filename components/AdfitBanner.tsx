"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adfit?: any;
  }
}

interface AdfitBannerProps {
  unitId: string;
  width: string; // 너비 추가
  height: string; // 높이 추가
}

export default function AdfitBanner({ unitId, width, height }: AdfitBannerProps) {
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    // 윈도우 객체에 adfit이 로드되었는지 확인하고 실행
    const displayAd = () => {
      if (window.adfit) {
        console.log(unitId, "광고 display 실행");
        window.adfit.display();
      }
    };

    // 스크립트 중복 로드 방지 및 로드 완료 후 실행
    if (!document.querySelector('script[src*="daumcdn.net/kas/static/ba.min.js"]')) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
      script.async = true;
      script.onload = displayAd; // 스크립트 로드 완료되면 실행
      document.body.appendChild(script);
    } else {
      displayAd(); // 이미 스크립트가 있다면 바로 실행
    }

    return () => {
      adRef.current = true;
    };
  }, [unitId]); // unitId가 바뀌면 재실행

  return (
    <div className="flex justify-center w-full overflow-hidden" style={{ minHeight: `${height}px` }}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unitId}
        data-ad-width={width}
        data-ad-height={height}
      ></ins>
    </div>
  );
}
