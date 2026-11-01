import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import { defineConfig, type Plugin } from 'vite'

const GA_MEASUREMENT_ID = 'G-7DMVCNH73C'

// 개발 서버 접속이 집계되지 않도록 GA4 태그는 프로덕션 빌드에만 넣음
function googleAnalytics(): Plugin {
  return {
    name: 'google-analytics',
    apply: 'build',
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
        },
        injectTo: 'head-prepend',
      },
      {
        tag: 'script',
        children: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${GA_MEASUREMENT_ID}');
    `,
        injectTo: 'head-prepend',
      },
    ],
  }
}

// https://vite.dev/config/
// leewonno.github.io 는 user site 이므로 base 는 '/' (기본값)
export default defineConfig({
  // 아이콘은 Akar Icons 만 사용: import X from '~icons/akar-icons/<name>'
  plugins: [react(), tailwindcss(), Icons({ compiler: 'jsx', jsx: 'react' }), googleAnalytics()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
