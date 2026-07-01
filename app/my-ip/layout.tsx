import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("my-ip");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="my-ip" /></>; }
