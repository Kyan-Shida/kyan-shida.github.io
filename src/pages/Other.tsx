import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Other() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f4f2ed;
          color: #1a1a1a;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c4c0b5; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #8a8275; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-12px) rotate(1deg); }
          50% { transform: translateY(-6px) rotate(-1deg); }
          75% { transform: translateY(-16px) rotate(0.5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26,26,26,0.15), 0 20px 60px rgba(0,0,0,0.1); }
          50% { box-shadow: 0 0 0 8px rgba(26,26,26,0), 0 30px 80px rgba(0,0,0,0.15); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3) translateY(50px); }
          50% { transform: scale(1.05) translateY(-5px); }
          70% { transform: scale(0.95) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-3deg); }
          30% { transform: rotate(3deg); }
          45% { transform: rotate(-2deg); }
          60% { transform: rotate(2deg); }
          75% { transform: rotate(-1deg); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Cursor glow follower */
        .cursor-glow {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,26,26,0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: left 0.15s ease-out, top 0.15s ease-out;
        }

        /* Top nav */
        .topnav {
          position: fixed; top: 0; left: 0; right: 0;
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 40px;
          background: rgba(244, 242, 237, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          z-index: 50;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          animation: fadeIn 0.6s ease both;
        }
        .topnav-brand {
          font-weight: 500; letter-spacing: -0.01em; text-decoration: none; color: #1a1a1a;
          display: flex; align-items: center; gap: 8px;
          transition: transform 0.3s ease;
        }
        .topnav-brand:hover { transform: scale(1.05); }
        .topnav-brand .star { color: #8a8275; display: inline-block; }
        .topnav-brand:hover .star { animation: wiggle 0.6s ease; }
        .topnav-links { display: flex; gap: 28px; align-items: center; }
        .topnav-links a {
          color: #6a6a6a; text-decoration: none; transition: all 0.3s;
          text-transform: lowercase; letter-spacing: 0.02em;
          position: relative;
        }
        .topnav-links a::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 2px; background: #1a1a1a;
          transition: width 0.3s ease;
        }
        .topnav-links a:hover { color: #1a1a1a; transform: translateY(-2px); }
        .topnav-links a:hover::after { width: 100%; }
        .topnav-links a.active { color: #1a1a1a; font-weight: 500; }
        .topnav-links a.active::after { width: 100%; }

        /* Main */
        .main { max-width: 1100px; margin: 0 auto; padding: 130px 40px 60px; }

        /* Back link */
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
          color: #6a6a6a; text-decoration: none; margin-bottom: 40px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          letter-spacing: 0.02em;
          animation: fadeUp 0.6s ease both;
        }
        .back-link:hover { color: #1a1a1a; transform: translateX(-6px); }

        /* Section */
        .section { padding: 70px 0; animation: fadeUp 0.8s ease both; border-bottom: 1px solid rgba(0,0,0,0.1); }
        .section-head { margin-bottom: 56px; }
        .section-num {
          font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
          color: #8a8275; letter-spacing: 0.1em; margin-bottom: 10px;
        }
        .section-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2.6rem, 6vw, 4.2rem);
          line-height: 1; font-weight: 400;
          margin-bottom: 14px; letter-spacing: -0.025em;
          transition: transform 0.3s ease;
        }
        .section-head:hover .section-title { transform: translateX(10px); }
        .section-sub {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 1.05rem; color: #8a8275;
          display: flex; align-items: center; gap: 14px;
        }
        .section-sub::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(0,0,0,0.12); max-width: 320px;
        }

        /* Experience list */
        .exp-list { display: flex; flex-direction: column; gap: 4px; }
        .exp-item {
          display: grid; grid-template-columns: 80px 1fr;
          gap: 32px; padding: 40px 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          animation: fadeUp 0.8s ease both;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .exp-item:nth-child(1) { animation-delay: 0.1s; }
        .exp-item:nth-child(2) { animation-delay: 0.2s; }
        .exp-item:last-child { border-bottom: none; }
        .exp-item:hover {
          padding-left: 12px;
          background: rgba(255,255,255,0.4);
          border-radius: 4px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
        }
        .exp-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem; color: #8a8275;
          letter-spacing: 0.04em; padding-top: 6px;
          transition: all 0.3s;
        }
        .exp-item:hover .exp-num { color: #1a1a1a; transform: scale(1.2); }
        .exp-content { display: flex; flex-direction: column; gap: 16px; }
        .exp-icon {
          font-size: 1.6rem; line-height: 1; margin-bottom: 4px;
          display: inline-block; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .exp-item:hover .exp-icon { transform: scale(1.2) rotate(-5deg); }
        .exp-meta-row {
          display: flex; align-items: baseline;
          gap: 20px; flex-wrap: wrap;
        }
        .exp-company {
          font-family: 'Instrument Serif', serif;
          font-size: 1.9rem; line-height: 1.1;
          font-weight: 400; letter-spacing: -0.01em;
          transition: transform 0.3s;
        }
        .exp-item:hover .exp-company { transform: translateX(4px); }
        .exp-role {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem; color: #6a6a6a;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .exp-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem; color: #6a6a6a;
          margin-left: auto; padding: 4px 12px;
          background: rgba(0,0,0,0.05); border-radius: 100px;
          transition: all 0.3s;
        }
        .exp-item:hover .exp-date { background: rgba(0,0,0,0.1); transform: scale(1.05); }
        .exp-bullets {
          list-style: none; display: flex; flex-direction: column; gap: 10px;
          margin-top: 4px;
        }
        .exp-bullets li {
          font-size: 0.95rem; color: #3a3a3a;
          line-height: 1.75; padding-left: 22px; position: relative;
          transition: all 0.3s;
        }
        .exp-bullets li::before {
          content: '→'; position: absolute; left: 0; top: 0;
          color: #8a8275; font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          transition: all 0.3s;
        }
        .exp-item:hover .exp-bullets li::before { color: #1a1a1a; transform: translateX(4px); }
        .exp-bullets strong { color: #1a1a1a; font-weight: 600; }
        .exp-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        .exp-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem; padding: 5px 12px;
          background: rgba(0,0,0,0.05); color: #3a3a3a;
          border-radius: 100px; letter-spacing: 0.02em;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
        }
        .exp-tag:hover { background: #1a1a1a; color: #f4f2ed; transform: translateY(-2px) scale(1.05); }
        .exp-tag.accent { background: rgba(216, 86, 28, 0.1); color: #b84612; }
        .exp-tag.accent:hover { background: #b84612; color: #f4f2ed; }

        /* Projects */
        .proj-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }
        .proj-card {
          padding: 36px 32px; border: 1px solid rgba(0,0,0,0.1);
          border-radius: 4px; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: rgba(255,255,255,0.4);
          display: flex; flex-direction: column; gap: 14px;
          animation: scale-in 0.6s ease both;
        }
        .proj-card:nth-child(1) { animation-delay: 0.1s; }
        .proj-card:nth-child(2) { animation-delay: 0.2s; }
        .proj-card:nth-child(3) { animation-delay: 0.3s; }
        .proj-card:nth-child(4) { animation-delay: 0.4s; }
        .proj-card:hover {
          background: rgba(255,255,255,0.9); border-color: rgba(0,0,0,0.2);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        .proj-icon {
          font-size: 2rem; line-height: 1;
          display: inline-block; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .proj-card:hover .proj-icon { transform: scale(1.2) rotate(-8deg); }
        .proj-name {
          font-family: 'Instrument Serif', serif;
          font-size: 1.7rem; font-weight: 400;
          line-height: 1.15; letter-spacing: -0.01em;
          transition: transform 0.3s;
        }
        .proj-card:hover .proj-name { transform: translateX(4px); }
        .proj-meta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.74rem; color: #b84612;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .proj-desc { font-size: 0.92rem; color: #3a3a3a; line-height: 1.75; }
        .proj-desc strong { color: #1a1a1a; font-weight: 600; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }

        /* Education */
        .edu-card {
          padding: 44px 40px; border: 1px solid rgba(0,0,0,0.1);
          border-radius: 4px; background: rgba(255,255,255,0.4);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: scale-in 0.6s ease both;
        }
        .edu-card:hover {
          background: rgba(255,255,255,0.9);
          border-color: rgba(0,0,0,0.2);
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 16px 40px rgba(0,0,0,0.08);
        }
        .edu-row {
          display: flex; justify-content: space-between;
          align-items: baseline; gap: 20px; flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .edu-school {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem; font-weight: 400;
          letter-spacing: -0.01em; line-height: 1.15;
          transition: transform 0.3s;
        }
        .edu-card:hover .edu-school { transform: translateX(4px); }
        .edu-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem; color: #6a6a6a;
          padding: 4px 12px; background: rgba(0,0,0,0.05);
          border-radius: 100px;
          transition: all 0.3s;
        }
        .edu-card:hover .edu-date { background: rgba(0,0,0,0.1); transform: scale(1.05); }
        .edu-major {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 1.2rem; color: #5a5a5a; margin-bottom: 24px;
        }
        .edu-courses {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 24px;
        }
        .edu-awards {
          padding-top: 20px; border-top: 1px dashed rgba(0,0,0,0.15);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem; color: #5a5a5a; line-height: 1.8;
        }

        /* Connect */
        .connect-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border: 1px solid rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden;
        }
        .connect-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 36px; text-decoration: none; color: #1a1a1a;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          border-right: 1px solid rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: rgba(255,255,255,0.4);
        }
        .connect-item:nth-child(2n) { border-right: none; }
        .connect-item:nth-last-child(-n+2) { border-bottom: none; }
        .connect-item:hover { 
          background: #1a1a1a; color: #f4f2ed; 
          transform: scale(1.03);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          z-index: 2;
        }
        .connect-label {
          font-family: 'JetBrains Mono', monospace; font-size: 0.74rem;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #8a8275; margin-bottom: 8px;
          transition: color 0.3s;
        }
        .connect-item:hover .connect-label { color: rgba(244,242,237,0.6); }
        .connect-value {
          font-family: 'Instrument Serif', serif; font-size: 1.4rem;
          letter-spacing: -0.01em;
          transition: transform 0.3s;
        }
        .connect-item:hover .connect-value { transform: translateX(5px); }
        .connect-arrow { font-size: 1.3rem; opacity: 0.4; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .connect-item:hover .connect-arrow { opacity: 1; transform: translate(4px, -4px) scale(1.2); }

        /* Footer */
        .footer {
          text-align: center; padding: 70px 0 40px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.74rem;
          color: #8a8275; line-height: 1.9;
        }
        .footer-links { display: flex; justify-content: center; gap: 26px; margin-top: 18px; }
        .footer-links a { color: #8a8275; text-decoration: none; transition: all 0.3s; display: inline-block; }
        .footer-links a:hover { color: #1a1a1a; transform: translateY(-3px); }

        @media (max-width: 768px) {
          .topnav { padding: 18px 24px; }
          .topnav-links { gap: 14px; font-size: 0.7rem; }
          .topnav-links a:nth-child(n+3) { display: none; }
          .main { padding: 110px 24px 40px; }
          .exp-item { grid-template-columns: 1fr; gap: 12px; padding: 32px 0; }
          .exp-item:hover { padding-left: 0; }
          .exp-date { margin-left: 0; }
          .proj-grid { grid-template-columns: 1fr; }
          .connect-grid { grid-template-columns: 1fr; }
          .connect-item { border-right: none !important; }
          .connect-item:not(:last-child) { border-bottom: 1px solid rgba(0,0,0,0.1); }
        }

      `}</style>

      {/* Cursor glow effect */}
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Top nav */}
      <nav className="topnav">
        <Link to="/" className="topnav-brand">𖡬 梅冉-Kyan <span className="star">✦</span></Link>
        <div className="topnav-links">
          <Link to="/" className={isHome ? 'active' : ''}>about</Link>
          <Link to="/other" className={!isHome ? 'active' : ''}>experience</Link>
          <a href="https://github.com/Kyan-Shida" target="_blank" rel="noreferrer">github</a>
          <a href="mailto:kyanmei0623@163.com">email</a>
        </div>
      </nav>

      <main className="main">
        <Link to="/" className="back-link">← back home</Link>

        {/* Experience */}
        <section className="section">
          <div className="section-head">
            <div className="section-num">01 / experience</div>
            <h2 className="section-title">the path so far</h2>
            <div className="section-sub">the journey ✨</div>
          </div>

          <div className="exp-list">
            <div className="exp-item">
              <div className="exp-num">01</div>
              <div className="exp-content">
                <div className="exp-icon">🏦</div>
                <div className="exp-meta-row">
                  <span className="exp-company">DM</span>
                  <span className="exp-role">产品助理</span>
                  <span className="exp-date">2025.08 – 2026.03</span>
                </div>
                <ul className="exp-bullets">
                  
                  <li><strong>概述：</strong><br />高质量完成Leader分配任务，深度参与多个AI产品商业化迭代与变现优化。熟练执行"需求挖掘-产品设计-上线验证-数据复盘-商业价值评估"全流程闭环，以ROI为导向驱动产品增长。</li>
                 <hr />
                  <li><strong>用户调研与商业化设计</strong>：针对DAU 1000+的精品应用"AI背书匠"，设计朗读文本功能专项问卷，从显性体验与隐性付费意愿双维度切入，回收有效问卷300+份；提炼"多音字纠错、难块收藏"等高价值需求，并验证其对订阅转化率的正向影响，为功能迭代提供直接商业化依据。</li>
                  <li><strong>需求整理与变现分析</strong>：负责"AI背书匠"用户反馈与竞品商业化动态追踪，提出文档自动化处理效率提升50%的方案，同步关联付费转化率、客单价等核心指标，明确需求优先级与商业价值排序，支撑团队周会变现策略决策。</li>
                  <li><strong>产品设计与商业化迭代</strong>：运用Axure独立完成IAA广告变现场景优化与IAP订阅新品设计，产出PRD详细呈现广告触发逻辑、付费墙结构、权益分层及界面布局，沉淀出一套以LTV最大化为目标的AI产品设计流程。</li>
                  <li><strong>数据分析与商业验证</strong>：跟进所负责IAA/IAP产品上线后每日数据，围绕ARPU、eCPM、订阅转化率、LTV等关键商业指标建立分析框架；主导6次A/B实验（含广告频次、定价策略、权益包装），其中3次方案落地后带动整体LTV提升20%+，验证了商业化策略的有效性。</li>
                  <li><strong>产品跟进与商业化交付</strong>：为研发团队每日创建任务并分配需求，协调研发进度与市场上线节奏，确保商业化功能按时交付；快速响应上线后变现异常问题（如广告填充率下降、支付链路中断），保障收入稳定性与用户体验平衡。</li>
                </ul>
                <div className="exp-tags">
                  <span className="exp-tag accent">用户分析</span>
                  <span className="exp-tag accent">A/B 实验</span>
                  <span className="exp-tag">项目管理</span>
                  <span className="exp-tag">数据分析</span>
                </div>
              </div>
            </div>

            <div className="exp-item">
              <div className="exp-num">02</div>
              <div className="exp-content">
                <div className="exp-icon">🏫</div>
                <div className="exp-meta-row">
                  <span className="exp-company">BaiZhiTong</span>
                  <span className="exp-role">产品助理</span>
                  <span className="exp-date">2025.06 – 2025.08</span>
                </div>
                <ul className="exp-bullets">
                  <li><strong>概述：</strong><br />参与面向学校的AI智能课后辅导云平台全周期建设，主导基于LangGraph的多Agent工作流编排（教师/学生/教务Agent），设计多角色权限与意图路由策略，推动定制化需求从调研到长周期交付验收闭环落地。</li>
                  <hr />
                  <li><strong>用户调研与设计</strong>：针对【教师积分激励】模块参与度低的问题，线下访谈12位教师及2位教务主任，定位"规则不透明、查询路径深"痛点；引入RAG检索增强方案，将积分规则与兑换商品向量化入库，支持自然语言一键查询，关键操作路径从3级压缩至1级，输出PRD与交互原型。</li>
                  <li><strong>数据整理与分析</strong>：支撑【AI互动辅导】模块校验与交付，该模块基于RAG+LLM实现学科知识库问答；协助完成2所学校灰度测试，负责全流程反馈收集与Bad Case标注，抽样评估召回率与准确率，整理20+份报告归类高频幻觉与检索偏移问题，输出Prompt与检索策略优化建议。</li>
                  <li><strong>产品跟进与管理</strong>：每周组织"校方-产品-算法-研发"四方同步会，使用飞书追踪LangGraph节点迭代、RAG知识库更新及模型效果回归等待办，闭环率达90%；高效响应临时需求（如"作业批注留痕+AI自动评语生成"），跟进多轮验收与A/B测试，输出项目管理与效果评估文档。</li>
                </ul>
                <div className="exp-tags">
                  <span className="exp-tag accent">业务抽象</span>
                  <span className="exp-tag accent">权限设计</span>
                  <span className="exp-tag">项目管理</span>
                  <span className="exp-tag">用户访谈</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="section">
          <div className="section-head">
            <div className="section-num">02 / projects</div>
            <h2 className="section-title">things i've built</h2>
            <div className="section-sub">from idea to ship </div>

          </div>

          <div className="section-sub">@before</div>
          <br />

          <div className="proj-grid">
            <div className="proj-card">
              <div className="proj-icon">🏥</div>
              <div className="proj-name">AI 健康管家</div>
              <div className="proj-meta">省级创新项目 · 铜奖</div>
              <div className="proj-desc">
                <strong>概述：</strong><br />AI健康管家（提供依据AI的医学问答 + 健康知识拓展），完成调研、编码、智能体设计工作，获得铜奖。
                <br /><br />
                <strong>◌ 需求挖掘</strong>：通过线上问卷（收集有效问卷100+ 份）、线下访谈（不同年龄用户）等多渠道调研，明确用户核心痛点，独立产出市场分析、需求分析文档以及PRD。
                <br />
                <strong>◌ 产品设计</strong>：梳理核心业务场景（报告解读、知识问答、健康知识拓展），运用墨刀，完成平台原型设计，有效呈现产品交互逻辑与界面布局，为团队沟通和开发提供清晰指引。
                <br />
                <strong>◌ 敏捷验证</strong>：基于场景特性，完成大模型的选型与适配性评估；借助 Dify 平台快速搭建 AI 智能体 Demo，实现核心功能的可行性验证。
                <br />
                <strong>◌ Rag搭建</strong>：通过搭建Rag解决模型幻觉，针对业务场景收集健康领域数据资源，完成多类型数据的清洗、加载与结构化提取，实现 "模糊query→精准匹配" 的意图识别提升，有效提升模型生成准确率提升50%。
              </div>
              <div className="exp-tags">
                <span className="exp-tag accent">0-1 产品</span>
                <span className="exp-tag accent">RAG</span>
                <span className="exp-tag accent">LangGraph</span>
                <span className="exp-tag">AI全流程</span>
              </div>
            </div>



            <div className="proj-card">
              <div className="proj-icon">📚</div>
              <div className="proj-name">AI "文库" APP</div>
              <div className="proj-meta">0-1 产品</div>
              <div className="proj-desc">
                <strong>概述：</strong><br />实习期间AI工具类产品（定位为解决用户找资料、写文章的困扰），独立完成产品调研、0-1产品设计、跟进研发、分析用户以及内购数据工作，推进并获得DAU：150+的成果。
                <br /><br />

                <strong>◌ 产品调研</strong>：团队提出产品定位，我通过七麦等对竞品功能拆解与市场份额分析产出文档，xmind和vision完成功能结构和产品逻辑的可视化。
                <br />
                <strong>◌ 产品设计</strong>：提升产品竞争力，引入AI创文核心功能，通过Axure进行原型设计，呈现"用户操作→模型响应→结果输出"，为团队沟通和开发提供清晰指引。
                <br />
                <strong>◌ 数据研判</strong>：产品上线初期存在内购与广告数据低下，通过两周设置2个实验组A/B实验进行改进方案验证，使得ARPU提升28%、内购人数增加16%。
                <br />
                <strong>◌ 产品优化</strong>：依据 "埋点+意见反馈"搜集反馈数据并且生成测试，确定AI创文中逻辑与结构瑕疵的badcase，与算法团队研讨提出 "思维树模式 Prompt优化"，通过灰度测试验证效果，最终用户采纳率提升 40%。
                <br /><br />

              </div>
              <div className="exp-tags">
                <span className="exp-tag accent">0-1 产品</span>
                <span className="exp-tag accent">思维链优化</span>
                <span className="exp-tag">内购策略</span>
                <span className="exp-tag">商业化</span>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="section-head">
            <div className="section-sub">@now</div>
          </div>

          <div className="proj-grid">
            <div className="proj-card">
              <div className="proj-icon">🏭</div>
              <div className="proj-name">物联Agent</div>
              <div className="proj-meta">工业智能体平台 · LangGraph多Agent编排</div>
              <div className="proj-desc">
                <strong>概述：</strong><br />基于 LangGraph + RAG 构建的工业智能体平台，以8层架构驱动「位置数据→安全决策」语义转化，覆盖人员分布、异常驻留、疲劳预警、作业票合规等8大业务场景，实现工业定位系统从"被动监控"到"主动智能"的跃迁。
                <br /><br />

                <strong>◌ 多Agent协作编排</strong>：基于 LangGraph 构建主Agent协调器 + 8个专项Agent的有向图编排架构，支持单Agent执行与多Agent并行调度；设计 Agent 间通信协议与中间结果共享机制，解决复杂复合查询（如"统计+筛选+预警"）的跨Agent协作问题，多工具任务成功率目标≥85%。
                <br />
                <strong>◌ 六层意图识别引擎</strong>：构建「分类路由→参数提取→角色适配→工具决策→上下文继承→异常兜底」六层意图识别管线；引入自然语言时间解析（"昨天""完整倒班周期"自动映射为精确时间区间）、指代消解与省略补全，将模糊口语转化为结构化API调用参数，槽位提取F1目标≥90%。
                <br />
                <strong>◌ RAG工业知识增强</strong>：接入安全生产制度、操作规程、电子围栏规则等工业知识库，通过向量检索为合规判定与预警分析提供制度依据；结合权限校验与输出DLP扫描，实现敏感信息泄露率0、越权拦截率≥95%的一票否决制安全基线。
                <br />
                <strong>◌ 33工具执行与容错体系</strong>：封装人员档案、人员轨迹、考勤门禁、设备区域、报警统计、作业票合规等33个原子工具与Agent工具；建立「重试→备用工具→缓存降级→规则引擎接管」四级容错链，异常驻留/疲劳预警等安全功能在模型宕机时静默切换规则引擎，保障业务零中断。
              </div>
              <div className="exp-tags">
                <span className="exp-tag accent">LangGraph</span>
                <span className="exp-tag accent">RAG</span>
                <span className="exp-tag accent">多Agent编排</span>
                <span className="exp-tag">工业物联网</span>
                <span className="exp-tag">Tool Use</span>
              </div>
            </div>



              <div className="proj-card">
                <div className="proj-icon">📔</div>
                <div className="proj-name">岁安 · AI回忆录</div>
                <div className="proj-meta">个人数字记忆管理平台 · 持续迭代中</div>
                <div className="proj-desc">
                <strong>概述：</strong><br />基于 GLM 大模型与 LangGraph Agent 工作流编排的轻量化数字回忆录系统，融合 RAG 向量检索、时光轴梳理、AI叙事生成与跨时空对话能力，打造私有化个人数字时光宝库。
                <br/><br/>

                <strong>◌ 隐私与易用性平衡</strong>：针对回忆数据敏感痛点，采用 SQLite 本地存储 + Docker 容器化部署方案，支持完全离线私有化运行；提供 Windows 一键启动脚本，零配置即可搭建专属回忆库，兼顾数据安全与开箱即用体验。
                <br/>
                <strong>◌ 碎片记忆结构化</strong>：设计时光轴记忆模型，支持按年份、标签、场景多维分类筛选；AI 自动识别内容生成情感/人物/场景标签，同步构建 ChromaDB 向量记忆库，将零散文字与照片归档为完整人生脉络，同时为AI能力提供精准语义召回底座。
                <br/>
                <strong>◌ AI 叙事创作引擎</strong>：基于 LangGraph 构建多节点 Agent 工作流，将单次大模型调用拆解为「记忆召回-框架搭建-细节润色-风格校验」四步编排流程；结合 RAG 语义检索召回真实记忆片段驱动 GLM 扩写，支持散文、阶段总结等多种文体，从根源降低AI虚构概率，让模糊记忆变为鲜活可回溯的叙事文章。
                <br/>
                <strong>◌ 沉浸式情感交互</strong>：通过 Agent 人设编排构建固定对话工作流，AI 基于向量召回的同期记忆，严格匹配对应年龄段的认知视角与语气表达，实现与「过去的自己」稳定对话回溯心境；照片归档模块自动生成描述文案与情感标签，唤醒沉睡影像的记忆价值。
                </div>
                <div className="exp-tags">
                  <span className="exp-tag accent">AI应用</span>
                  <span className="exp-tag accent">Agent编排</span>
                  <span className="exp-tag accent">FastAPI</span>
                  <span className="exp-tag accent">Vue3</span>
                  <span className="exp-tag">RAG检索增强</span>
                  <span className="exp-tag">私有化部署</span>
                  <span className="exp-tag">Prompt工程</span>
                </div>
              </div>



          </div>



        </section>

        {/* Education */}
        <section className="section">
          <div className="section-head">
            <div className="section-num">03 / education</div>
            <h2 className="section-title">where i studied</h2>
            <div className="section-sub">the foundations</div>
          </div>

          <div className="edu-card">
            <div className="edu-row">
              <span className="edu-school">安徽科技工程大学</span>
              <span className="edu-date">2022.09 – 2026.06</span>
            </div>
            <div className="edu-major">计算机科学与技术 </div>
            <div className="edu-courses">
              <span className="exp-tag">软件工程</span>
              <span className="exp-tag">数据结构</span>
              <span className="exp-tag">算法设计</span>
              <span className="exp-tag">操作系统</span>
              <span className="exp-tag">计算机组成原理</span>
            </div>
            <div className="edu-awards">
              🏆 校三等奖学金 · 省级创新创业铜奖 · 校 ACM 奖
            </div>
          </div>
        </section>

        {/* Connect */}
        <section className="section" style={{ borderBottom: 'none' }}>
          <div className="section-head">
            <div className="section-num">04 / connect</div>
            <h2 className="section-title">let's be friends</h2>
            <div className="section-sub">don't be shy</div>
          </div>
          <div className="connect-grid">

            <a href="mailto:kyanmei0623@163.com" className="connect-item">
              <div>
                <div className="connect-label">Email</div>
                <div className="connect-value">kyanmei0623@163.com</div>
              </div>
              <span className="connect-arrow">↗</span>
            </a>
            <a href="https://okjk.co/27cjzD" className="connect-item">
              <div>
                <div className="connect-label">即刻</div>
                <div className="connect-value">kyan2320</div>
              </div>
              <span className="connect-arrow">↗</span>
            </a>

            <a href="https://github.com/Kyan-Shida" target="_blank" rel="noreferrer" className="connect-item">
              <div>
                <div className="connect-label">GitHub</div>
                <div className="connect-value">Kyan-Shida</div>
              </div>
              <span className="connect-arrow">↗</span>
            </a>
            <Link to="/" className="connect-item">
              <div>
                <div className="connect-label">Home</div>
                <div className="connect-value">返回首页</div>
              </div>
              <span className="connect-arrow">↗</span>
            </Link>
          </div>
        </section>

        <div className="footer">
          © 2026 梅冉-Kyan · 用产品思维探索 AI 边界<br />
          made with ☕ in China
          <div className="footer-links">
            <a href="https://github.com/Kyan-Shida" target="_blank" rel="noreferrer">github</a>
            <a href="mailto:kyanmei0623@163.com">email</a>
            <Link to="/">home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}