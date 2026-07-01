import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("diff-checker");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="diff-checker" /></>; }
