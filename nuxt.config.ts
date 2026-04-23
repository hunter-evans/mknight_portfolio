// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
	alias: {
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
					href: './public/favicon.ico'
				}
			],
			title: 'Nuxt'
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
		'@nuxtjs/i18n'
	],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
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
