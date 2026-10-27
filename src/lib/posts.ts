import { parse } from 'yaml'
import { z } from 'zod'

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})

export type PostMeta = Omit<z.infer<typeof frontmatterSchema>, 'draft'> & {
  slug: string
}

export type Post = PostMeta & {
  content: string
}

// src/content/posts/*.md 파일을 빌드 시점에 문자열로 번들링
const rawPosts = import.meta.glob<string>('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function toSlug(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '')
}

function parsePost(path: string, raw: string): Post | null {
  const match = raw.match(FRONTMATTER_PATTERN)
  const result = frontmatterSchema.safeParse(match ? parse(match[1]) : {})

  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${path}: ${result.error.message}`)
  }

  const { draft, ...meta } = result.data
  if (draft && import.meta.env.PROD) return null

  return {
    ...meta,
    slug: toSlug(path),
    content: match ? raw.slice(match[0].length) : raw,
  }
}

const posts: readonly Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => parsePost(path, raw))
  .filter((post): post is Post => post !== null)
  .sort((a, b) => b.date.getTime() - a.date.getTime())

export function getAllPosts(): readonly PostMeta[] {
  return posts.map(({ content: _content, ...meta }) => meta)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
