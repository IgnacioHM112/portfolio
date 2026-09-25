import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://portfolio-euh84kblf-personal-b8d4.vercel.app',
  integrations: [mdx(), sitemap(), icon()],
  output: 'static',
  trailingSlash: 'always',
});