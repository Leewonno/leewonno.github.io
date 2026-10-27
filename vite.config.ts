import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// leewonno.github.io 는 user site 이므로 base 는 '/' (기본값)
export default defineConfig({
  // 아이콘은 Akar Icons 만 사용: import X from '~icons/akar-icons/<name>'
  plugins: [react(), tailwindcss(), Icons({ compiler: 'jsx', jsx: 'react' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
