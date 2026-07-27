// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
	alias: {
		'components': fileURLToPath(new URL('./app/components', import.meta.url)),
		'data': fileURLToPath(new URL('./app/assets/data', import.meta.url)),
		'images': fileURLToPath(new URL('./app/assets/images', import.meta.url))
	},
	app: {
		head: {
			charset: 'utf-16',
			htmlAttrs: {
				lang: 'en'
			},
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.ico'
				},
        { 
					rel: 'icon', 
					type: 'image/png', 
					sizes: '16x16', 
					href: '/favicon-16x16.png' 
				},
        { 
					rel: 'icon', 
					type: 'image/png', 
					sizes: '32x32', 
					href: '/favicon-32x32.png' 
				},
        { 
					rel: 'apple-touch-icon', 
					sizes: '180x180', 
					href: '/apple-touch-icon.png' 
				},
        { 
					rel: 'icon', 
					type: 'image/png', 
					sizes: '192x192', 
					href: '/android-chrome-192x192.png' 
				},
        { 
					rel: 'icon', 
					type: 'image/png', 
					sizes: '512x512', 
					href: '/android-chrome-512x512.png' 
				},
        { 
					rel: 'manifest', 
					href: '/site.webmanifest' 
				}
			],
			title: 'Nuxt',
			viewport: 'width=device-width, initial-scale=1'
		}
	},
  compatibilityDate: '2025-12-21',
  css: [
    'assets/styles/layers.css',
    'vuetify/styles',
    'assets/styles/tailwind.css'
  ],
  devtools: { 
		enabled: true 
	},
  eslint: {
    config: {
      import: {
        package: 'eslint-plugin-import-lite'
      }
    }
  },
  i18n: {
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts'
  },
  modules: [
		'@nuxt/fonts', 
		'vuetify-nuxt-module', 
		'@nuxt/eslint', 
		'@nuxtjs/i18n',
		'@nuxt/test-utils/module'
	],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },
	routeRules: {
		'/': {
			prerender: true,
			swr: true
		}
	},
	runtimeConfig: {
		public: {
			GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
			EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
			EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY,
		}
	},
  vuetify: {
    moduleOptions: {
			disableVuetifyStyles: true,
			prefixComposables: true,
      styles: { 
				configFile: 'assets/styles/settings.scss'
			},
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: true,
        prefersReducedMotion: true,
        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false
        }
      }
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
        utilities: false,
        themes: {
          light: {},
          dark: {}
        }
      },
      display: {
        mobileBreakpoint: 'md',
        thresholds: {
          xs: 0, 
					sm: 600, 
					md: 960, 
					lg: 1280, 
					xl: 1920, 
					xxl: 2560
        }
      }
    }
  },
	vite: {
		optimizeDeps: {
			include: [
				'@vue/devtools-core',
				'@vue/devtools-kit'
			]
		}
	}
})
