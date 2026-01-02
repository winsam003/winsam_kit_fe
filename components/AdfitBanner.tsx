"use client";

import { useEffect } from "react";

interface AdfitBannerProps {
  unitId: string;
}

export default function AdfitBanner({ unitId }: AdfitBannerProps) {
  useEffect(() => {
    // 스크립트 중복 로드 방지
    const isScriptLoaded = document.querySelector('script[src*="daumcdn.net/kas/static/ba.min.js"]');

    if (!isScriptLoaded) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center my-10 min-h-[600px]">
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unitId}
        data-ad-width="160"
        data-ad-height="600"
      ></ins>
    </div>
  );
}
