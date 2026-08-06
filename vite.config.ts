// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ⚠️ 部署到 GitHub Pages 时改为 '/your-repo-name/'
  // 本地开发或自定义域名根路径设为 '/'
  base: '/',
})