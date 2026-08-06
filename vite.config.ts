import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👇 把这里的 '/' 改成你的仓库名，注意前后都要有斜杠！
  base: '/kyan.github.io/', 
})