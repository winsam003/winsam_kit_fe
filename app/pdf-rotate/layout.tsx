import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("pdf-rotate");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="pdf-rotate" /></>; }
