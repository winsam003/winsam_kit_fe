import type { Metadata } from "next";

export const SITE_URL = "https://winsam.xyz";
export const SITE_NAME = "WinSam Tools";

export const toolSeo = {
  "base64-converter": {
    title: "Base64 인코딩 디코딩 변환기",
    description: "텍스트를 Base64로 인코딩하거나 Base64 문자열을 원문으로 디코딩하는 무료 온라인 도구입니다.",
    category: "DeveloperApplication",
  },
  "diff-checker": {
    title: "텍스트 비교 도구 - 문장·코드 차이 찾기",
    description: "두 텍스트나 코드의 다른 부분을 줄 단위로 빠르게 비교하고 확인하는 무료 온라인 diff 도구입니다.",
    category: "DeveloperApplication",
  },
  "file-rename": {
    title: "파일 이름 일괄 변경 도구",
    description: "여러 파일의 이름에 접두사, 접미사, 번호 규칙을 적용해 브라우저에서 한 번에 변경합니다.",
    category: "UtilitiesApplication",
  },
  "hash-generator": {
    title: "해시 생성기 - SHA-256·SHA-512",
    description: "입력한 텍스트의 SHA-256, SHA-512 등 해시 값을 브라우저에서 안전하게 생성하는 무료 도구입니다.",
    category: "SecurityApplication",
  },
  "html-formatter": {
    title: "HTML 정렬기 - 코드 포맷터",
    description: "복잡하거나 압축된 HTML 코드를 읽기 쉬운 형태로 들여쓰기하고 정렬하는 무료 HTML 포맷터입니다.",
    category: "DeveloperApplication",
  },
  "html-table-builder": {
    title: "HTML 테이블 만들기 - 엑셀 표 변환",
    description: "엑셀이나 스프레드시트 표를 붙여 넣어 HTML table 코드로 즉시 변환하는 온라인 도구입니다.",
    category: "DeveloperApplication",
  },
  "image-base64-converter": {
    title: "이미지 Base64 변환기 - 인코딩·복원",
    description: "이미지를 Base64 문자열로 인코딩하거나 Base64 데이터를 이미지로 복원하는 무료 온라인 도구입니다.",
    category: "DeveloperApplication",
  },
  "image-compressor": {
    title: "이미지 용량 줄이기 - 사진 일괄 압축",
    description: "JPG, PNG, WebP 이미지의 용량을 브라우저에서 빠르게 줄이고 여러 사진을 한 번에 압축합니다.",
    category: "MultimediaApplication",
  },
  "image-converter": {
    title: "이미지 변환기 - JPG·PNG·WebP 포맷 변환",
    description: "JPG, PNG, WebP 등 여러 이미지 파일 형식을 브라우저에서 빠르게 일괄 변환하는 무료 도구입니다.",
    category: "MultimediaApplication",
  },
  "json-formatter": {
    title: "JSON 정렬기 - 포맷터·문법 검사",
    description: "JSON 데이터를 보기 좋게 정렬하고 문법 오류를 확인하며 압축할 수 있는 무료 온라인 JSON 포맷터입니다.",
    category: "DeveloperApplication",
  },
  "lorem-ipsum": {
    title: "로렘 입숨 생성기 - 더미 텍스트 만들기",
    description: "디자인과 개발에 필요한 한글 및 영문 더미 문장을 원하는 길이로 생성하는 무료 도구입니다.",
    category: "DeveloperApplication",
  },
  "my-ip": {
    title: "내 아이피 주소 확인 - 공인 IP 조회",
    description: "현재 인터넷 연결에 사용 중인 공인 IP 주소와 네트워크 정보를 간단히 확인합니다.",
    category: "UtilitiesApplication",
  },
  "pdf-rotate": {
    title: "PDF 페이지 회전 - 방향 바꾸기",
    description: "PDF 문서의 원하는 페이지를 선택해 왼쪽이나 오른쪽으로 회전하고 새 파일로 저장합니다.",
    category: "UtilitiesApplication",
  },
  "pdf-viewer": {
    title: "PDF 페이지 추출 - 원하는 페이지만 저장",
    description: "PDF 문서에서 필요한 페이지만 선택해 별도의 PDF 파일로 추출하는 무료 온라인 도구입니다.",
    category: "UtilitiesApplication",
  },
  "url-converter": {
    title: "URL 인코딩 디코딩 변환기",
    description: "한글과 특수문자가 포함된 URL을 안전하게 인코딩하거나 원래 주소로 디코딩하는 무료 도구입니다.",
    category: "DeveloperApplication",
  },
  "word-counter": {
    title: "글자수 세기 - 공백 포함·제외 실시간 계산",
    description: "자소서, 블로그, 원고의 글자 수와 단어 수를 공백 포함·제외 기준으로 실시간 계산합니다.",
    category: "UtilitiesApplication",
  },
  "xml-formatter": {
    title: "XML 정렬기 - 포맷터·문법 확인",
    description: "XML 데이터를 보기 좋게 들여쓰기하고 계층 구조와 문법을 확인하는 무료 온라인 XML 포맷터입니다.",
    category: "DeveloperApplication",
  },
} as const;

export type ToolSlug = keyof typeof toolSeo;

export function createToolMetadata(slug: ToolSlug): Metadata {
  const page = toolSeo[slug];
  const path = `/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: path,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

export function ToolStructuredData({ slug }: { slug: ToolSlug }) {
  const page = toolSeo[slug];
  const url = `${SITE_URL}/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: page.title,
        description: page.description,
        url,
        applicationCategory: page.category,
        operatingSystem: "Any",
        browserRequirements: "JavaScript를 지원하는 최신 웹 브라우저",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "KRW" },
        inLanguage: "ko-KR",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: page.title, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
