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

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Base64 변환기</CardTitle>
            <CardDescription>Base64 인코딩/디코딩</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/base64-converter">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>해시(Hash) 생성기</CardTitle>
            <CardDescription>SHA-256 해시 생성</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/hash.generator">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>더미 데이터 생성기</CardTitle>
            <CardDescription>로렘 입숨, 한글 입숨 등</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/lorem-ipsum">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>PDF 페이지 추출기</CardTitle>
            <CardDescription>PDF 페이지 추출기</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pdf-viewer">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>이미지 포맷 변환기</CardTitle>
            <CardDescription>이미지 포맷 변환기</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/image-converter">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>XML 뷰어 & 정렬기</CardTitle>
            <CardDescription>XML 뷰어 & 정렬하기</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/xml-formatter">
              <Button className="w-full">사용하기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <section className="max-w-5xl w-full mt-20 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-600">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">WinSam Toolbox: 일상의 편리함을 더하는 온라인 도구 모음</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 leading-relaxed text-sm">
          <div className="space-y-4">
            <p>
              <strong>WinSam Toolbox</strong>는 복잡한 설치 없이 브라우저에서 즉시 실행 가능한 다양한 웹 도구를 제공합니다. 
              개발자를 위한 JSON 포맷터부터 취업 준비생을 위한 실시간 글자수 세기, 웹 최적화를 위한 이미지 압축기까지 
              일상과 업무에 꼭 필요한 기능을 한데 모았습니다.
            </p>
            <p>
              저희는 사용자의 편의성을 최우선으로 생각하며, 모든 도구는 별도의 회원가입 없이 <strong>100% 무료</strong>로 이용하실 수 있습니다.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">개인정보 보호 우선 정책</h3>
            <p>
              사이트 내에서 처리되는 모든 데이터(텍스트, 이미지 등)는 서버로 전송되지 않고 사용자의 웹 브라우저 내에서만 처리됩니다. 
              중요한 정보가 외부로 유출될 걱정 없이 안심하고 도구를 활용해 보세요.
            </p>
            <p className="text-xs text-slate-400">
              * 본 서비스는 지속적인 업데이트를 통해 새로운 도구들을 추가해 나갈 예정입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}