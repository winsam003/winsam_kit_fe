import { createToolMetadata, ToolStructuredData } from "@/lib/seo";
export const metadata = createToolMetadata("image-compressor");
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ToolStructuredData slug="image-compressor" /></>; }
