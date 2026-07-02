// Firebase 문서가 생성됐다는 이유만으로 검색엔진에 자동 공개하지 않습니다.
// 운영자가 내용을 검토한 뒤 slug를 이 목록에 추가해야 홈, 블로그, RSS와 사이트맵에 노출됩니다.
const PUBLISHED_POST_SLUGS = new Set([
  "winsam-toolbox-4erg7",
  "diff-checker-s25cj",
  "winsam-toolbox----------jqco9",
]);

export function isPublishedPost(post: { slug?: string; isAdmin?: string }) {
  return post.isAdmin === "Y" && Boolean(post.slug && PUBLISHED_POST_SLUGS.has(post.slug));
}
