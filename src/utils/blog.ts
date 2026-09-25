import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: string;
    updatedDate?: string;
    tags: string[];
    draft: boolean;
    heroImage?: string;
  };
  content: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(blogDir);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const filePath = path.join(blogDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const { data, content: body } = matter(content);
      const slug = file.replace('.mdx', '');
      posts.push({
        slug,
        data: {
          title: data.title,
          description: data.description,
          pubDate: data.pubDate,
          updatedDate: data.updatedDate,
          tags: data.tags || [],
          draft: data.draft ?? false,
          heroImage: data.heroImage,
        },
        content: body,
      });
    }
  }

  return posts.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    return {
      slug,
      data: {
        title: data.title,
        description: data.description,
        pubDate: data.pubDate,
        updatedDate: data.updatedDate,
        tags: data.tags || [],
        draft: data.draft ?? false,
        heroImage: data.heroImage,
      },
      content: body,
    };
  } catch {
    return null;
  }
}