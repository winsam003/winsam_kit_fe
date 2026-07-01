import type { Metadata } from "next";
export const metadata: Metadata = { title: "개인정보처리방침", description: "WinSam Tools 개인정보처리방침입니다.", alternates: { canonical: "/privacy" } };
export default function PrivacyLayout({ children }: { children: React.ReactNode }) { return children; }
