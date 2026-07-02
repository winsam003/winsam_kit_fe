import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Laptop,
  Briefcase,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { isPublishedPost } from "@/lib/published-posts";
import { collection, query, orderBy, limit, getDocs, Timestamp } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt?: Timestamp;
  isAdmin?: string;
  content?: string;
}

export const revalidate = 3600;

async function getLatestPosts(): Promise<Post[]> {
  try {
    const snapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(20)));
    return snapshot.docs
      .map((document) => ({ id: document.id, ...document.data() }) as Post)
      .filter(isPublishedPost)
      .slice(0, 5);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <div className="p-6 md:p-10 space-y-12 flex flex-col items-center bg-slate-50/30 min-h-screen">
      <h1 className="sr-only">무료 온라인 웹 도구 모음</h1>
      <div className="w-full max-w-5xl space-y-16">
        {/* 2. 웹 개발 도구 */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Laptop className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">웹 개발 도구</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard title="제이슨 데이터 정렬" desc="JSON 포맷팅 및 문법 검사" href="/json-formatter" />
            <ToolCard
              title="텍스트 비교 도구"
              desc="두 텍스트 사이의 차이점을 라인 단위로 비교합니다."
              href="/diff-checker"
            />
            <ToolCard title="내 아이피 확인" desc="내 공인 아이피 확인" href="/my-ip" />
            <ToolCard
              title="HTML 테이블 빌더"
              desc="엑셀 표를 복사해 넣으면 HTML 코드로 즉시 변환합니다"
              href="/html-table-builder"
            />
            <ToolCard
              title="HTML 정렬기"
              desc="복잡하게 꼬인 HTML 코드를 가독성 있게 정리합니다."
              href="/html-formatter"
            />
            <ToolCard title="XML 뷰어 & 정렬기" desc="XML 계층 구조 확인 및 정렬" href="/xml-formatter" />
            <ToolCard title="Base64 변환기" desc="텍스트 및 이미지 인코딩/디코딩" href="/base64-converter" />
            <ToolCard
              title="이미지 ↔ Base64"
              desc="이미지를 코드로 변환하거나 복원하기"
              href="/image-base64-converter"
            />
            <ToolCard title="해시 생성기" desc="SHA-256 등 보안 해시 생성" href="/hash-generator" />
            <ToolCard title="더미 데이터 생성" desc="개발용 로렘 입숨 텍스트 생성" href="/lorem-ipsum" />
            <ToolCard
              title="URL 인코더/디코더"
              desc="URL에 포함된 특수문자와 한글을 안전하게 변환합니다"
              href="/url-converter"
            />
          </div>
        </section>
        {/* 2. 직장인 & 일상 도구 (단일 툴 위주로 정리) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Briefcase className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-800">직장인 & 일상 도구</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard title="글자수 세기" desc="자소서, 블로그 실시간 글자수 확인" href="/word-counter" />
            <ToolCard title="이미지 압축" desc="화질 저하 없이 용량 다이어트" href="/image-compressor" />
            <ToolCard title="이미지 포맷 변환" desc="JPG, PNG, WebP 등 포맷 변경" href="/image-converter" />
            <ToolCard title="PDF 페이지 추출" desc="PDF에서 특정 페이지만 별도 저장" href="/pdf-viewer" />
            <ToolCard title="PDF 페이지 회전" desc="PDF에서 페이지 회전" href="/pdf-rotate" />
            <ToolCard title="파일 이름 일괄 변경" desc="여러 파일의 이름을 규칙에 따라 일괄 변경" href="/file-rename" />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">도구를 만들고 운영하는 기준</h2>
            <p className="text-slate-500 leading-relaxed">
              기능 수를 늘리는 것보다 입력 자료가 어디서 처리되는지, 결과를 다시 확인할 수 있는지, 실패했을 때 원인을
              이해할 수 있는지를 우선합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800">브라우저 내 처리</h3>
              <p className="text-slate-500 leading-relaxed">파일·텍스트 변환은 가능한 한 브라우저 메모리에서 수행합니다. 외부 요청이 필요한 기능은 별도로 표시합니다.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800">입력과 결과를 함께 확인</h3>
              <p className="text-slate-500 leading-relaxed">정렬·인코딩·비교 결과를 바로 복사하거나 내려받기 전에 화면에서 검토할 수 있도록 구성합니다.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800">지원 범위 공개</h3>
              <p className="text-slate-500 leading-relaxed">브라우저와 파일 형식에 따른 제한을 숨기지 않고 각 도구의 안내와 활용 가이드에 기록합니다.</p>
            </div>
          </div>
        </section>
        {/* 4. 블로그 인사이트 리스트 (세로형 정렬) */}
        {latestPosts.length > 0 && <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">최신 게시글</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[1.5rem] transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
                    <div className="hidden md:flex flex-col items-center justify-center min-w-[70px] py-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-400">
                        {post.createdAt
                          ? post.createdAt.toDate().toLocaleString("en-US", { month: "short" })
                          : "NEW"}
                      </span>
                      <span className="text-xl font-black text-slate-700 group-hover:text-blue-600">
                        {post.createdAt ? post.createdAt.toDate().getDate() : "--"}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {post.isAdmin === "Y" && (
                          <span className="text-[9px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-md tracking-wider">
                            OFFICIAL
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                          {post.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-1">
                        {post.content?.replace(/[#*`]/g, "").substring(0, 100) + "..."}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 p-3 bg-slate-50 rounded-full text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              ))}
          </div>
        </section>}
      </div>

    </div>
  );
}

function ToolCard({ title, desc, href, target }: { title: string; desc: string; href: string; target?: string }) {
  // 버튼 클릭 시 새창/현재창 이동을 처리하는 공통 로직
  const isExternal = target === "_blank";

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-slate-200 group flex flex-col h-full">
      <CardHeader className="flex-1">
        <CardTitle className="group-hover:text-blue-600 transition-colors">{title}</CardTitle>
        <CardDescription className="pt-2">{desc}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {/* 외부 링크면 <a>, 내부 링크면 <Link> 사용 */}
        {isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-slate-900 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              사용하기 <ChevronRight className="w-4 h-4" />
            </Button>
          </a>
        ) : (
          <Link href={href}>
            <Button className="w-full bg-slate-900 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              사용하기 <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
