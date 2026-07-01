import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("base64-converter");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="base64-converter" /></>; }
