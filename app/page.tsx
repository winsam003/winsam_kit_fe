import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 space-y-6 flex flex-col items-center">
      {/* 툴 제목 섹션 */}
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">무료 온라인 툴박스</h1>
        <p className="text-slate-500 text-lg">필요한 도구를 클릭해서 바로 사용하세요.</p>
      </section>

      {/* 툴 리스트 카드 (여기 광고를 위아래로 배치하면 수익 쑥쑥) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>제이슨 데이터 정렬</CardTitle>
            <CardDescription>제이슨 데이터 정렬</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/json-formatter">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>글자수 세기</CardTitle>
            <CardDescription>자기소개서, 블로그 글자수 확인</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/word-counter">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>이미지 압축</CardTitle>
            <CardDescription>용량은 줄이고 화질은 유지</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/image-compressor">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}