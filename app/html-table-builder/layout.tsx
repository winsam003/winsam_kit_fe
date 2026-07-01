import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("html-table-builder");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="html-table-builder" /></>; }
