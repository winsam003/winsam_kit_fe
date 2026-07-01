import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("html-formatter");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="html-formatter" /></>; }
