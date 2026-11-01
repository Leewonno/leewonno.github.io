import { resume } from "@/data/resume";
import type { Post } from "@/lib/posts";

export const SITE_URL = "https://leewonno.github.io";
export const SITE_NAME = "Leewonno";
export const SITE_DESCRIPTION =
  "기술 블로그, 이력서, 개인 프로젝트, 유튜브 채널, 연재 소설을 모았습니다.";
export const OG_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} - 이원노`,
};

// GitHub Pages 가 폴더 경로를 슬래시가 붙은 주소로 리다이렉트하므로 대표 주소도 이 형식으로 통일
export function canonicalUrl(pathname: string): string {
  return `${SITE_URL}${pathname.endsWith("/") ? pathname : `${pathname}/`}`;
}

// 연락처는 검색 결과에 그대로 노출될 수 있어 넣지 않음
const person = {
  "@type": "Person",
  name: resume.name,
  alternateName: SITE_NAME,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${resume.avatar}`,
  jobTitle: resume.headline,
  sameAs: [resume.github, resume.linkedin],
};

export const personSchema = { "@context": "https://schema.org", ...person };

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: resume.name,
  url: `${SITE_URL}/`,
  inLanguage: "ko",
};

export function blogPostingSchema(post: Post) {
  const url = canonicalUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    datePublished: post.date.toISOString(),
    image: OG_IMAGE.url,
    inLanguage: "ko",
    keywords: post.tags,
    author: person,
  };
}
