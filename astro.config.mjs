// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-light-high-contrast",
    },
  },
  integrations: [react(), tailwind({
    // applyBaseStyles: false,
  })],

});