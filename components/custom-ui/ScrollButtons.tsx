"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollButtons() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      <Button
        variant="secondary"
        size="icon"
        onClick={scrollToTop}
        className="rounded-full shadow-md border hover:bg-slate-200"
        title="맨 위로"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={scrollToBottom}
        className="rounded-full shadow-md border hover:bg-slate-200"
        title="맨 아래로"
      >
        <ArrowDown className="w-5 h-5" />
      </Button>
    </div>
  );
}