import { useLocation } from 'react-router'
import { canonicalUrl, OG_IMAGE, SITE_NAME } from '@/lib/seo'

type PageMetaProps = {
  title: string
  description: string
  // 블로그 글일 때만 지정 (og:type 이 article 이 됨)
  article?: { publishedTime: string; tags: readonly string[] }
  jsonLd?: readonly object[]
}

// React 가 <title>·<meta>·<link> 를 <head> 로 옮겨주고 페이지를 벗어나면 지워줌
export default function PageMeta({ title, description, article, jsonLd = [] }: PageMetaProps) {
  const { pathname } = useLocation()
  const url = canonicalUrl(pathname)

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE.url} />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content={OG_IMAGE.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      {article && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          // 값에 </script> 가 들어가도 태그가 닫히지 않도록 < 를 이스케이프
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll('<', '\\u003c') }}
        />
      ))}
    </>
  )
}
