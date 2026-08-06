import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>👋 你好，我是张三</h1>
      <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8 }}>
        一名热爱前端开发的工程师，专注于 React 生态与现代 Web 技术。
        喜欢用简洁的代码解决复杂的问题，业余时间热衷于开源贡献和技术写作。
      </p>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link to="/other" style={linkStyle}>了解更多 →</Link>
        <a href="https://github.com" target="_blank" rel="noreferrer" style={linkStyle}>
          GitHub
        </a>
      </div>
    </div>
  )
}

const linkStyle: React.CSSProperties = {
  padding: '0.6rem 1.5rem',
  borderRadius: 6,
  backgroundColor: '#2563eb',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 500,
}