"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    adfit?: any;
  }
}

export default function AdfitInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const renderAd = () => {
      // 1. adfit 객체와 display 함수가 있는지 확인
      if (window.adfit && typeof window.adfit.display === "function") {
        const insTags = document.querySelectorAll(".kakao_ad_area");

        insTags.forEach((ins) => {
          // 2. 기존 광고 상태 초기화 (중요)
          ins.innerHTML = "";
          ins.removeAttribute("data-ad-status");
        });

        try {
          // 3. 전체 광고 다시 호출
          window.adfit.display();
          console.log("[Adfit] 모든 광고 초기화 및 호출 완료");
        } catch (e) {
          console.error("[Adfit] 호출 실패:", e);
        }
      }
    };

    // 페이지 이동 후 DOM이 안정화될 시간을 줍니다.
    const timer = setTimeout(renderAd, 500);

    return () => clearTimeout(timer);
  }, [pathname]); // 페이지 주소가 바뀔 때마다 실행

  return null;
}
