"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Trash2 } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      setError("");
      const jsonObj = JSON.parse(input);
      const formatted = JSON.stringify(jsonObj, null, 2);
      setOutput(formatted);
    } catch (e) {
      setError("올바른 JSON 형식이 아닙니다.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6"> {/* 전체 너비도 살짝 키움 */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" />
            메인으로
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold">JSON 데이터 정렬기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input 영역 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Input</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setInput("")}
              className="text-slate-500 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4 mr-1" /> 비우기
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea 
              // h-[600px]로 고정하고 내부 스크롤 활성화
              className="font-mono h-[600px] resize-none overflow-y-auto p-4" 
              placeholder="여기에 JSON을 붙여넣으세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Output 영역 */}
        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Output</CardTitle>
            {output && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="flex gap-2 items-center transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "복사됨!" : "복사하기"}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Textarea 
              // 아웃풋도 동일하게 높이 고정 및 스크롤 적용
              className="font-mono h-[600px] bg-slate-50 resize-none overflow-y-auto p-4 cursor-default text-blue-600" 
              readOnly 
              value={output}
            />
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center font-medium">
          {error}
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Button 
          size="lg" 
          onClick={formatJson} 
          className="w-full md:w-80 h-14 text-lg shadow-xl hover:scale-105 transition-transform"
        >
          데이터 예쁘게 정렬하기
        </Button>
      </div>
    </div>
  );
}