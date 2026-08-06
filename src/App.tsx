// src/App.tsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Other from './pages/Other'

export default function App() {
  return (
    <HashRouter>
      {/* 
        ✅ HashRouter 优势：
        - URL 格式为 /#/other，无需服务器端配置
        - GitHub Pages 刷新任意子路由都不会 404
        - 无需 404.html 重定向 hack
      */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/other" element={<Other />} />
      </Routes>
    </HashRouter>
  )
}