import { Link } from 'react-router-dom'

export default function Other() {
  const skills = ['React', 'TypeScript', 'Vite', 'Node.js', 'Tailwind CSS']

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>🛠 技能 & 经历</h1>

      <h3>技术栈</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {skills.map((s) => (
          <span key={s} style={tagStyle}>{s}</span>
        ))}
      </div>

      <h3>工作经历</h3>
      <ul style={{ lineHeight: 2, paddingLeft: '1.2rem' }}>
        <li><strong>2023 - 至今</strong>｜某科技公司 · 高级前端工程师</li>
        <li><strong>2021 - 2023</strong>｜某互联网公司 · 前端开发工程师</li>
        <li><strong>2017 - 2021</strong>｜某某大学 · 计算机科学与技术</li>
      </ul>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/" style={backStyle}>← 返回首页</Link>
      </div>
    </div>
  )
}

const tagStyle: React.CSSProperties = {
  padding: '0.3rem 0.8rem',
  borderRadius: 999,
  backgroundColor: '#eff6ff',
  color: '#2563eb',
  fontSize: '0.9rem',
  fontWeight: 500,
}

const backStyle: React.CSSProperties = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: 500,
}