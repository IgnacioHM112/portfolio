import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://ignaciomello.vercel.app', // placeholder, actualizar tras deploy
  integrations: [mdx(), sitemap(), icon()],
  output: 'static',
  trailingSlash: 'always',
});