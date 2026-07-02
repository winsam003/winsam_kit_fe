"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const ADSENSE_CLIENT = "ca-pub-8286025705631064";
const CONTENT_ROUTES = new Set([
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

export default function AdSenseLoader() {
  const pathname = usePathname();
  const isArticle = pathname.startsWith("/blog/");

  if (!CONTENT_ROUTES.has(pathname) && !isArticle) return null;

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
