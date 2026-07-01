import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("json-formatter");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="json-formatter" /></>; }
