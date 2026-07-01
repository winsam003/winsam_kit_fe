import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("hash-generator");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="hash-generator" /></>; }
