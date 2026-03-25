"use client";

import { useEffect, useRef } from "react";

interface AdfitBannerProps {
  unitId: string;
  width: string;
  height: string;
}

const SHOW_ADS = true;

export default function AdfitBanner({ unitId, width, height }: AdfitBannerProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. 기존에 생성된 광고 스크립트나 태그가 있다면 초기화
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = "";
    }

    // 2. ins 태그 생성
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", unitId);
    ins.setAttribute("data-ad-width", width);
    ins.setAttribute("data-ad-height", height);

    // 3. script 태그 생성
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;

    // 4. 컨테이너에 삽입
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(ins);
      adContainerRef.current.appendChild(script);
    }

    // 5. 클린업: 페이지를 떠날 때 광고 영역 비우기
    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = "";
      }
    };
  }, [unitId]); // unitId가 변경될 때마다(혹은 마운트될 때마다) 실행

  if (!SHOW_ADS) return null;

  return <div ref={adContainerRef} className="flex justify-center w-full" style={{ minHeight: `${height}px` }} />;
}
