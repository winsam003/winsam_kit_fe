import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("file-rename");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="file-rename" /></>; }
