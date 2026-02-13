"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Laptop,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Zap,
  Heart,
  FileCode,
  Image as ImageIcon,
  Type,
  Globe,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import AdfitBanner from "@/components/AdfitBanner";

interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: any;
  isAdmin?: string;
  content?: string;
}

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setLatestPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-12 flex flex-col items-center bg-slate-50/30 min-h-screen">
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
            <ToolCard title="해시 생성기" desc="SHA-256 등 보안 해시 생성" href="/hash-generator" />
            <ToolCard title="더미 데이터 생성" desc="개발용 로렘 입숨 텍스트 생성" href="/lorem-ipsum" />
            <ToolCard
              title="URL 인코더/디코더"
              desc="URL에 포함된 특수문자와 한글을 안전하게 변환합니다"
              href="/url-converter"
            />
          </div>
        </section>
        {/* 2. 메인 하단 광고 (본문 너비에 맞춤) */}
        {/* <div className="flex justify-center py-12">
          <AdfitBanner unitId="DAN-UEfYymEu5Dbb6VvG" width="728" height="90" />
        </div> */}
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

        {/* 3. WinSam 패밀리 서비스 (새로 만든 사이트들) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Zap className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold text-slate-800">WinSam 패밀리 서비스</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              title="리그오브레전드 팀분석"
              desc="소환사 전적 및 팀 시너지 분석 전문 플랫폼"
              href="https://lol.winsam.xyz"
              target="_blank"
            />
            <ToolCard
              title="로또 명당 찾기"
              desc="전국 1등 배출 점포 기반 로또 명당 지도"
              href="https://lotto-good-place.winsam.xyz"
              target="_blank"
            />
            <ToolCard
              title="뜨개질 도안 찾기"
              desc="코바늘/대바늘 무료 도안 검색 및 커뮤니티"
              href="https://crochet.winsam.xyz"
              target="_blank"
            />
            <ToolCard
              title="Yes or Yes"
              desc="결정 장애를 해결해주는 심플 선택 도구"
              href="https://yesoryes.winsam.xyz/make"
              target="_blank"
            />
          </div>
        </section>
        {/* 4. 블로그 인사이트 리스트 (세로형 정렬) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">최신 인사이트</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[1.5rem] transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
                    <div className="hidden md:flex flex-col items-center justify-center min-w-[70px] py-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-400">
                        {post.createdAt?.toDate
                          ? post.createdAt.toDate().toLocaleString("en-US", { month: "short" })
                          : "NEW"}
                      </span>
                      <span className="text-xl font-black text-slate-700 group-hover:text-blue-600">
                        {post.createdAt?.toDate ? post.createdAt.toDate().getDate() : "!!"}
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
              ))
            ) : (
              <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">등록된 글이 아직 없습니다.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* --- [중단 광고 영역] --- */}
      {/* <div className="flex justify-center my-6">
        <AdfitBanner unitId="DAN-Uw7zDuBqUecrzcna" width="300" height="250" />
      </div> */}

      {/* 5. SEO 전문 가이드 (애드센스용 텍스트 전체 복구) */}
      <section className="max-w-5xl w-full mt-20 mb-20 space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            WinSam Toolbox: 디지털 생산성을 극대화하는 올인원 플랫폼
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            복잡한 설치 과정이나 번거로운 회원가입 없이, 웹 브라우저만 있다면 누구나 즉시 사용할 수 있는
            <br />
            <strong>무료 온라인 도구 모음</strong>입니다. 개발, 디자인, 사무 행정 등 다양한 분야에서 반복되는 단순
            작업을 효율적으로 개선하기 위해 탄생했습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">보안 중심의 로컬 처리</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              WinSam Toolbox의 모든 도구는 <strong>클라이언트 사이드 렌더링(CSR)</strong> 기술을 기반으로 작동합니다.
              사용자가 입력하는 텍스트, 코드, 이미지는 외부 서버로 절대 전송되지 않으며 오직 사용자의 컴퓨터 내에서만
              처리됩니다. 이러한 '서버리스' 방식은 데이터 유출 가능성을 원천 차단하여 기업용 보안 문서도 안심하고 처리할
              수 있게 합니다.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">압도적인 처리 속도</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              불필요한 네트워크 통신을 최소화하고 최신 JavaScript 엔진의 성능을 100% 활용합니다. 대용량 파일 이름 변경,
              이미지 포맷 변환, 복잡한 JSON 데이터 정렬 등 무거운 작업도 지연 시간 없이 즉각적인 피드백을 제공하여
              최상의 사용자 경험을 보장합니다.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">완전 무료 및 접근성</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              우리는 도구가 필요한 모든 사람에게 평등한 기회를 제공해야 한다고 믿습니다. WinSam의 모든 기능은 기부나
              유료 결제 없이 영구적으로 무료로 제공됩니다. 또한 웹 표준(Web Standards)을 준수하여 다양한 디바이스와
              브라우저 환경에서 동일한 성능을 발휘합니다.
            </p>
          </div>
        </div>

        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">주요 서비스 카테고리</h3>
            <p className="text-sm text-slate-500">
              각 분야의 전문가들이 가장 많이 필요로 하는 도구들을 엄선하여 제공합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-500" /> 개발 및 데이터 최적화
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                JSON, XML, HTML 소스코드 정렬기와 Base64 인코더, SHA-256 해시 생성기 등 백엔드 및 프론트엔드 개발 시
                필수적인 데이터 변환 도구를 지원합니다.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-500" /> 이미지 및 미디어 관리
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                파일 이름 일괄 변경부터 차세대 이미지 포맷 WebP 변환까지, 웹 성능 최적화와 파일 정리를 위한 고성능
                미디어 처리 툴을 제공합니다.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Type className="w-4 h-4 text-amber-500" /> 텍스트 및 콘텐츠 제작
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                글자수 세기, 로렘 입숨 생성기, URL 인코딩 등 블로그 운영자나 마케터, 취업 준비생들을 위한 실질적인
                글쓰기 보조 도구들을 활용할 수 있습니다.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" /> 네트워크 및 유틸리티
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                자신의 공인 IP 주소 확인, PDF 페이지 관리 등 일상적인 웹 서핑과 PC 관리 과정에서 빈번하게 발생하는
                문제들을 빠르게 해결합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  title,
  desc,
  href,
  target
}: {
  title: string;
  desc: string;
  href: string;
  target?: string;
}) {
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