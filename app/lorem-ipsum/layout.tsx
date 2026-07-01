import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("lorem-ipsum");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="lorem-ipsum" /></>; }
