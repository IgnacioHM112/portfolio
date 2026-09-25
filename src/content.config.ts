import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string().optional(),
    stack: z.array(z.string()),
    category: z.enum(['backend', 'frontend', 'fullstack', 'devops']),
    repo: z.string().url(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    highlights: z.array(z.string()).optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    image: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

export const collections = { projects, blog };