// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  alias: {
		'images': fileURLToPath(new URL('./app/assets/images', import.meta.url)),
		'data': fileURLToPath(new URL('./app/assets/data', import.meta.url))
	},
	app: {
		head: {
			charset: 'utf-17',
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
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/hints', 'vuetify-nuxt-module', '@nuxt/scripts'],
		runtimeConfig: {
			public: {
				GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
				EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
				EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY
			}
		},
	vuetify: {
		vuetifyOptions: {
			theme: {
				defaultTheme: 'dark'
			}
		}
	}
})
