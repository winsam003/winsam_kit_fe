"use client";

import { useRef } from "react";

interface AdfitBannerProps {
  unitId: string;
  width: string;
  height: string;
}

export default function AdfitBanner({ unitId, width, height }: AdfitBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  return (
    <div className="flex justify-center w-full overflow-hidden" style={{ minHeight: `${height}px` }}>
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
