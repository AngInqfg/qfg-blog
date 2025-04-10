// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
type envType = { [key: string]: any }
const {
  VITE_NUXT_NAME, VITE_NUXT_PORT,
  VITE_NUXT_BASE_NAME, VITE_NUXT_BASE_URL,
  VITE_NUXT_CHAT_URL, VITE_NUXT_CHAT_NAME,
  VITE_NUXT_YDTC_NAME, VITE_NUXT_YDTC_URL
}: envType = process.env
export default defineNuxtConfig({
  devtools: { enabled: false },
  vite: {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/main.scss" as *;'
        }
      }
    },
    server: {
      proxy: {
        [VITE_NUXT_BASE_NAME]: {
          target: VITE_NUXT_BASE_URL,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(new RegExp(VITE_NUXT_BASE_NAME), ''),
        },
        [VITE_NUXT_YDTC_NAME]: {
          target: VITE_NUXT_YDTC_URL,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(new RegExp(VITE_NUXT_YDTC_NAME), ''),
        },
        [VITE_NUXT_CHAT_NAME]: {
          target: VITE_NUXT_CHAT_URL,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(new RegExp(VITE_NUXT_CHAT_NAME), ''),
        },
      },
    },
  },
  devServer: {
    port: Number(VITE_NUXT_PORT || 3000),
    host: '0.0.0.0',
  },
  modules: [
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      EnvName: VITE_NUXT_NAME
    }
  },
  compatibilityDate: '2025-04-04'
})