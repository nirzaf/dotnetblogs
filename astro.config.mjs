import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { remarkReadingTime } from './src/utils/readTime'

// https://astro.build/config
export default defineConfig({
	// Write here your website url
	site: 'https://nirzaf.github.io/', 
	base: 'dotnetblogs/', // This should match your GitHub Pages subfolder
	markdown: {
		remarkPlugins: [remarkReadingTime],
		drafts: true,
		shikiConfig: {
			theme: 'material-theme-palenight',
			wrap: true
		}
	},
	integrations: [
		mdx({
			syntaxHighlight: 'shiki',
			shikiConfig: {
				experimentalThemes: {
					light: 'vitesse-light',
					dark: 'material-theme-palenight',
				  },
				wrap: true
			},
			drafts: true
		}),
		sitemap(),
		tailwind()
	],
	vite: {
		optimizeDeps: {
			noDiscovery: true,
			include: [], // Or leave as undefined
		},
	},
})
