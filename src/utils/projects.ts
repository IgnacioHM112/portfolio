import fs from 'node:fs/promises';
import path from 'node:path';

const projectsDir = path.join(process.cwd(), 'src/content/projects');

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  stack: string[];
  category: 'fullstack' | 'backend' | 'frontend' | 'mobile' | 'devops' | string;
  repo: string;
  repoFront?: string;
  demo?: string;
  featured: boolean;
  order?: number;
  status?: string;
  metrics?: string[];
  highlights?: string[];
  startDate: string;
  endDate?: string;
  image?: string;
}

export async function getProjects(): Promise<Project[]> {
  const files = await fs.readdir(projectsDir);
  const projects: Project[] = [];

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(projectsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(content);
      projects.push({
        ...data,
        slug: file.replace('.json', ''),
      });
    }
  }

  return projects.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf();
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured);
}
