import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("xml-formatter");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="xml-formatter" /></>; }
