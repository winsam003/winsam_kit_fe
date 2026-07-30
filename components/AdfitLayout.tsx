"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdfitBanner from "@/components/AdfitBanner";

const AD_PATHS = new Set([
  "/",
  "/base64-converter",
  "/blog",
  "/diff-checker",
  "/file-rename",
  "/hash-generator",
  "/html-formatter",
  "/html-table-builder",
  "/image-base64-converter",
  "/image-compressor",
  "/image-converter",
  "/json-formatter",
  "/lorem-ipsum",
  "/my-ip",
  "/pdf-rotate",
  "/pdf-viewer",
  "/url-converter",
  "/word-counter",
  "/xml-formatter",
]);

function shouldShowAds(pathname: string) {
  return AD_PATHS.has(pathname) || pathname.startsWith("/blog/");
}

export default function AdfitLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showAds = shouldShowAds(pathname);

  return (
    <>
      {showAds && (
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex justify-center pt-2">
            <AdfitBanner unitId="DAN-1yUAoORabCnnrf2E" width="728" height="90" />
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start gap-4 px-4 md:px-6 mt-10">
        <main className="w-full flex-1 min-h-screen">{children}</main>

        {showAds && (
          <aside className="hidden lg:block w-[160px] shrink-0 sticky top-24 pt-6">
            <AdfitBanner unitId="DAN-IgYCG7rmtBGYHMD8" width="160" height="600" />
          </aside>
        )}
      </div>
    </>
  );
}
