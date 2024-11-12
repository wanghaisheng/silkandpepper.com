import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: netlify(),
  site: 'https://princecollection.com',
  integrations: [mdx(), sitemap()]
});