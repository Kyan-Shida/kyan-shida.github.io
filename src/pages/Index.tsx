import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Index() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targetCounts = [100, 50, 28, 2];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targetCounts.map(t => Math.round(t * eased)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [statsVisible]);

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

        /* Hero */
        .hero { 
          padding: 40px 0 80px; 
          animation: fadeUp 0.8s ease both; 
          border-bottom: 1px solid rgba(0,0,0,0.1);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
        }
        .hero-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem; color: #6a6a6a;
          letter-spacing: 0.02em; margin-bottom: 36px;
          animation: fadeUp 0.8s 0.1s ease both;
        }
        .hero-name {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(4.5rem, 14vw, 11rem);
          line-height: 0.92; letter-spacing: -0.04em;
          font-weight: 400; margin-bottom: 28px;
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .hero-name .italic { font-style: italic; color: #a8a092; }
        .hero-role {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 32px; flex-wrap: wrap;
          animation: fadeUp 0.8s 0.3s ease both;
        }
        .hero-role-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem; color: #1a1a1a; letter-spacing: 0.01em;
        }
        .hero-role-line { flex: 1; min-width: 40px; height: 1px; background: #1a1a1a; }
        .hero-desc {
          font-size: 1.1rem; color: #3a3a3a;
          max-width: 560px; line-height: 1.75; margin-bottom: 28px;
          animation: fadeUp 0.8s 0.4s ease both;
        }
        .hero-meta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.76rem; color: #6a6a6a; margin-bottom: 36px;
          animation: fadeUp 0.8s 0.5s ease both;
        }
        .hero-actions {
          display: flex; align-items: center; gap: 28px;
          flex-wrap: wrap; margin-bottom: 10px;
          animation: fadeUp 0.8s 0.6s ease both;
        }
        .btn-hello {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; background: #1a1a1a; color: #f4f2ed;
          border-radius: 100px; font-size: 0.88rem; font-weight: 500;
          text-decoration: none; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative; overflow: hidden;
        }
        .btn-hello::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .btn-hello:hover { 
          background: #3a3a3a; 
          transform: translateY(-3px) scale(1.05); 
          box-shadow: 0 15px 40px rgba(0,0,0,0.2); 
        }
        .btn-hello:hover::before { left: 100%; }
        .btn-hello:active { transform: translateY(-1px) scale(0.98); }
        .hero-email {
          font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;
          color: #1a1a1a; text-decoration: underline; text-underline-offset: 4px;
          text-decoration-color: rgba(0,0,0,0.3); transition: all 0.3s;
        }
        .hero-email:hover { 
          text-decoration-color: #1a1a1a; 
          transform: translateY(-2px); 
        }
        .hero-reply {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 1rem; color: #8a8275; margin-top: 8px;
          animation: fadeUp 0.8s 0.7s ease both;
        }
        .hero-stack {
          margin-top: 64px; padding-top: 32px;
          border-top: 1px solid rgba(0,0,0,0.08);
          animation: fadeUp 0.8s 0.8s ease both;
        }
        .stack-label {
          font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
          text-transform: uppercase; color: #8a8275;
          letter-spacing: 0.1em; margin-bottom: 18px;
        }
        .stack-items { display: flex; gap: 28px; flex-wrap: wrap; align-items: baseline; }
        .stack-item {
          font-family: 'Instrument Serif', serif; font-size: 2.2rem;
          color: #1a1a1a; line-height: 1;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
        }
        .stack-item:hover {
          transform: translateY(-5px) scale(1.15) rotate(-2deg);
          color: #3a3a3a;
        }
        .stack-item .sep { color: #c4c0b5; margin: 0 -10px; }

        /* Avatar */
        .hero-avatar-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: bounce-in 1s 0.3s ease both;
        }
        .hero-avatar {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #1a1a1a;
          animation: float 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .hero-avatar:hover {
          transform: scale(1.12) rotate(5deg);
          border-color: #3a3a3a;
          box-shadow: 0 25px 60px rgba(0,0,0,0.2);
        }
        .avatar-ring {
          position: absolute;
          width: 260px;
          height: 260px;
          border: 1px dashed rgba(26,26,26,0.2);
          border-radius: 50%;
          animation: spin-slow 20s linear infinite;
          pointer-events: none;
        }
        .avatar-ring-2 {
          position: absolute;
          width: 290px;
          height: 290px;
          border: 1px solid rgba(26,26,26,0.08);
          border-radius: 50%;
          animation: spin-slow 30s linear infinite reverse;
          pointer-events: none;
        }
        .avatar-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Decorative divider */
        .divider-decor {
          display: flex; align-items: center; justify-content: center;
          gap: 22px; padding: 70px 0; animation: fadeUp 0.8s ease both;
          flex-wrap: wrap;
        }
        .divider-decor .star { font-size: 1.1rem; color: #8a8275; display: inline-block; }
        .divider-decor .star:hover { animation: wiggle 0.5s ease; }
        .divider-decor .plus { font-size: 1.5rem; color: #1a1a1a; font-weight: 300; transition: transform 0.3s; }
        .divider-decor .plus:hover { transform: rotate(90deg) scale(1.3); }
        .divider-decor .label {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 1.35rem; color: #5a5a5a;
        }

        /* Stats */
        .stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
          padding: 48px 0; border-top: 1px solid rgba(0,0,0,0.1);
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .stat { animation: fadeUp 0.8s ease both; }
        .stat:nth-child(2) { animation-delay: 0.08s; }
        .stat:nth-child(3) { animation-delay: 0.16s; }
        .stat:nth-child(4) { animation-delay: 0.24s; }
        .stat-star { font-size: 0.95rem; color: #8a8275; margin-bottom: 14px; display: inline-block; transition: transform 0.3s; }
        .stat:hover .stat-star { transform: rotate(180deg) scale(1.3); }
        .stat-value {
          font-family: 'Instrument Serif', serif; font-size: 2.8rem;
          line-height: 1; margin-bottom: 10px; font-weight: 400;
          letter-spacing: -0.02em;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stat:hover .stat-value { transform: scale(1.1) translateX(5px); }
        .stat-label {
          font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
          color: #5a5a5a; text-transform: uppercase;
          letter-spacing: 0.08em; line-height: 1.4;
        }
        .stats-caption {
          text-align: center; font-family: 'Instrument Serif', serif;
          font-style: italic; font-size: 1.5rem; color: #5a5a5a;
          padding: 48px 0 80px;
          animation: fadeUp 0.8s 0.3s ease both;
        }

        /* Section */
        .section { padding: 90px 0; animation: fadeUp 0.8s ease both; border-bottom: 1px solid rgba(0,0,0,0.1); }
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

        /* About cards */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .about-card {
          padding: 36px 32px; border: 1px solid rgba(0,0,0,0.1);
          border-radius: 4px; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: rgba(255,255,255,0.4);
          animation: scale-in 0.6s ease both;
        }
        .about-card:nth-child(1) { animation-delay: 0.1s; }
        .about-card:nth-child(2) { animation-delay: 0.2s; }
        .about-card:nth-child(3) { animation-delay: 0.3s; }
        .about-card:nth-child(4) { animation-delay: 0.4s; }
        .about-card:hover {
          background: rgba(255,255,255,0.9);
          border-color: rgba(0,0,0,0.3);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        .about-card-icon { 
          font-size: 1.5rem; margin-bottom: 18px; 
          display: inline-block; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .about-card:hover .about-card-icon { transform: scale(1.3) rotate(-10deg); }
        .about-card-label {
          font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #8a8275; margin-bottom: 10px;
        }
        .about-card-title {
          font-family: 'Instrument Serif', serif; font-size: 1.6rem;
          font-weight: 400; margin-bottom: 14px; line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .about-card-desc { font-size: 0.92rem; color: #3a3a3a; line-height: 1.75; }
        .about-card-fun {
          margin-top: 18px; padding-top: 16px;
          border-top: 1px dashed rgba(0,0,0,0.15);
          font-family: 'JetBrains Mono', monospace; font-size: 0.74rem;
          color: #8a8275; font-style: italic;
        }

        /* Expertise */
        .expertise-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px 80px; }
        .expertise-col h4 {
          font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #8a8275; margin-bottom: 22px; padding-bottom: 14px;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          display: flex; align-items: center; justify-content: space-between;
        }
        .expertise-col h4 .count { color: #c4c0b5; transition: color 0.3s; }
        .expertise-col:hover h4 .count { color: #1a1a1a; }
        .expertise-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .expertise-list li {
          font-family: 'Instrument Serif', serif; font-size: 1.45rem;
          color: #1a1a1a; line-height: 1.3; display: flex;
          align-items: baseline; gap: 14px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
        }
        .expertise-list li:hover {
          transform: translateX(10px) scale(1.05);
          color: #3a3a3a;
        }
        .expertise-list li::before {
          content: '·'; color: #8a8275; font-size: 1.5rem;
          transition: transform 0.3s;
        }
        .expertise-list li:hover::before {
          transform: scale(1.5);
        }

        /* Quote */
        .quote {
          text-align: center; padding: 100px 20px 100px;
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 4vw, 3rem); font-style: italic;
          line-height: 1.25; color: #1a1a1a;
          animation: fadeUp 0.8s ease both;
          transition: transform 0.3s ease;
        }
        .quote:hover { transform: scale(1.02); }
        .quote-author {
          display: block; font-style: normal; font-size: 0.82rem;
          font-family: 'JetBrains Mono', monospace; color: #8a8275;
          margin-top: 28px; letter-spacing: 0.08em;
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
        .connect-caption {
          text-align: center; font-family: 'Instrument Serif', serif;
          font-style: italic; font-size: 1.5rem; color: #5a5a5a;
          margin-top: 44px;
          animation: fadeUp 0.8s 0.2s ease both;
        }

        /* Footer */
        .footer {
          text-align: center; padding: 70px 0 40px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.74rem;
          color: #8a8275; line-height: 1.9;
        }
        .footer-links { display: flex; justify-content: center; gap: 26px; margin-top: 18px; }
        .footer-links a { color: #8a8275; text-decoration: none; transition: all 0.3s; display: inline-block; }
        .footer-links a:hover { color: #1a1a1a; transform: translateY(-3px); }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; text-align: center; }
          .hero-avatar-wrap { order: -1; margin-bottom: 30px; }
          .hero-desc { margin-left: auto; margin-right: auto; }
          .hero-role { justify-content: center; }
          .hero-actions { justify-content: center; }
          .hero-stack { text-align: left; }
          .stack-items { justify-content: center; }
        }
        @media (max-width: 768px) {
          .topnav { padding: 18px 24px; }
          .topnav-links { gap: 14px; font-size: 0.7rem; }
          .topnav-links a:nth-child(n+3) { display: none; }
          .main { padding: 110px 24px 40px; }
          .stats { grid-template-columns: 1fr 1fr; gap: 32px; }
          .about-grid { grid-template-columns: 1fr; }
          .expertise-grid { grid-template-columns: 1fr; gap: 40px; }
          .connect-grid { grid-template-columns: 1fr; }
          .connect-item { border-right: none !important; }
          .connect-item:not(:last-child) { border-bottom: 1px solid rgba(0,0,0,0.1); }
          .hero-actions { gap: 16px; }
          .hero-avatar { width: 160px; height: 160px; }
          .avatar-ring { width: 190px; height: 190px; }
          .avatar-ring-2 { width: 210px; height: 210px; }
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
        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-eyebrow">hello, i'm 👋</div>
            <h1 className="hero-name"><span className="italic">梅冉</span>-Kyan</h1>
            <br />
            <div className="hero-role">
              <span className="hero-role-text">AI PM · 全栈思维</span><strong>෴</strong>
              <span className="hero-role-text">一生探索: Who-What-Where</span>
              <span className="hero-role-line"></span>
            </div>
            <p className="hero-desc">
              计科背景，ENTJ，独立负责过 AI 产品从 0 到 1 的落地。<br />
              擅长用户洞察、数据分析与商业场景设计，懂技术的产品人，追求优雅与增长。
            </p>
            <br />
            {/* <div className="hero-meta">安徽科技工程大学 ·  计算机科学与技术</div> */}
            <div className="hero-actions">
              <a href="mailto:kyanmei0623@163.com" className="btn-hello">say hello 👋</a>
              <a href="mailto:kyanmei0623@163.com" className="hero-email">kyanmei0623@163.com</a>
            </div>
            <div className="hero-reply">i actually reply</div>

            <div className="hero-stack">
              <div className="stack-label">my stack</div>
              <div className="stack-items">
                <span className="stack-item">Figma</span>
                <span className="stack-item">SQL</span>
                <span className="stack-item">LangGraph</span>
                <span className="stack-item">Prompt</span>
                <span className="stack-item">RAG</span>
                <span className="stack-item">Dify</span>
                <span className="stack-item">Claude code</span>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-avatar-wrap">
            <div className="avatar-container">
              <div className="avatar-ring-2" />
              <div className="avatar-ring" />
              <img 
                src="/avatar.png" 
                alt="梅冉-Kyan" 
                className="hero-avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kyan';
                }}
              />
            </div>
          </div>
        </section>

        {/* Decorative divider */}
        <div className="divider-decor">
          <span className="star">✦</span>
          <span className="plus">+</span>
          <span className="label">that's me</span>
          <span className="star">✦</span>
        </div>

        {/* Stats */}
        <div className="stats" ref={statsRef}>
          <div className="stat">
            <div className="stat-star">✦</div>
            <div className="stat-value">{counts[0]}+</div>
            <div className="stat-label">AI+PM学习文档</div>
          </div>
          <div className="stat">
            <div className="stat-star">✦</div>
            <div className="stat-value">{counts[1]}%</div>
            <div className="stat-label">AI效率提升</div>
          </div>
          <div className="stat">
            <div className="stat-star">✦</div>
            <div className="stat-value">+{counts[2]}%</div>
            <div className="stat-label">社区增长</div>
          </div>
          <div className="stat">
            <div className="stat-star">✦</div>
            <div className="stat-value">{counts[3]}</div>
            <div className="stat-label">0-1AI项目落地</div>
          </div>
        </div>
        <div className="stats-caption">pretty cool, right?</div>

        {/* About */}
        <section className="section">
          <div className="section-head">
            <div className="section-num">01 / about</div>
            <h2 className="section-title">the short version</h2>
            <div className="section-sub">psst — keep reading</div>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-icon">💼</div>
              <div className="about-card-label">current focus</div>
              <div className="about-card-title">AI 产品经理</div>
              <div className="about-card-desc">
                计算机科学与技术，独立完成 AI 产品从 0 到 1 落地，
                从市场调研到 PRD、原型、上线、迭代全链路负责实战。
              </div>
              <div className="about-card-fun">☕ fun fact: 参与Apple Store 效率TOP100产品核心工作</div>
            </div>
            <div className="about-card">
              <div className="about-card-icon">📍</div>
              <div className="about-card-label">based in</div>
              <div className="about-card-title">安徽科技工程大学</div>
              <div className="about-card-desc">计算机科学与技术  / 2022 – 2026</div>
              <div className="about-card-fun">🎓 校三等奖学金 · 省级创新创业铜奖 · 校ACM奖</div>
            </div>
            <div className="about-card">
              <div className="about-card-icon">🧠</div>
              <div className="about-card-label">what drives me</div>
              <div className="about-card-title">数据驱动决策</div>
              <div className="about-card-desc">
                擅长用 数据实验验证假设，从用户洞察到商业目标全链路思考，
                把 AI 能力转化为真实的产品价值。
              </div>
              <div className="about-card-fun">🤖 currently exploring AI</div>
            </div>
            <div className="about-card">
              <div className="about-card-icon">🤖</div>
              <div className="about-card-label">expertise</div>
              <div className="about-card-title">AI 落地能力与边界</div>
              <div className="about-card-desc">
                从大模型选型到 RAG 搭建，从 Prompt 工程到内购策略，从意图识别到数据飞轮，
                把 AI 转化为可量化的产品指标。
              </div>
              <div className="about-card-fun">✨ AI架构优化使采纳率 +40%</div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="section">
          <div className="section-head">
            <div className="section-num">02 / expertise</div>
            <h2 className="section-title">what i work with</h2>
            <div className="section-sub">always learning more</div>
          </div>
          <div className="expertise-grid">
            <div className="expertise-col">
              <h4>Technical <span className="count">05</span></h4>
              <ul className="expertise-list">
                <li>SQL & 数据分析</li>
                <li>Python</li>
                <li>Prompt 工程</li>
                <li>RAG 系统</li>
                <li>大模型边界</li>
                <li>LangGraph</li>
                <li>Vibe Coding</li>
              </ul>
            </div>
            <div className="expertise-col">
              <h4>Product <span className="count">05</span></h4>
              <ul className="expertise-list">
                <li>Axure&Figma原型</li>
                <li>PRD</li>
                <li>数据实验</li>
                <li>用户洞察</li>
                <li>需求拆解</li>
                <li>逻辑链路</li>
              </ul>
            </div>
            <div className="expertise-col">
              <h4>Tools <span className="count">05</span></h4>
              <ul className="expertise-list">
                <li>Axure</li>
                <li>Figma</li>
                <li>XMind</li>
                <li>Visio</li>
                <li>Dify</li>
                <li>Claude Code</li>
              </ul>
            </div>
            <div className="expertise-col">
              <h4>Domains <span className="count">04</span></h4>
              <ul className="expertise-list">
                <li>AI 产品设计</li>
                <li>教育科技</li>
                <li>内容生成</li>
                <li>IAA/IAP 商业化</li>
                <li>ToB & ToC AI产品</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quote */}
        <div className="quote">
          "用产品思维<br/>探索 AI 边界"
          <span className="quote-author">— 梅冉</span>
        </div>

        {/* Connect */}
        <section className="section" style={{ borderBottom: 'none' }}>
          <div className="section-head">
            <div className="section-num">03 / connect</div>
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
            <Link to="/other" className="connect-item">
              <div>
                <div className="connect-label">Resume</div>
                <div className="connect-value">详细履历</div>
              </div>
              <span className="connect-arrow">↗</span>
            </Link>
          </div>
          <div className="connect-caption">don't be shy — say hi!</div>
        </section>

        <div className="footer">
          ©  梅冉-Kyan · 用产品思维探索 AI 边界<br/>
          made with ☕ in China
          <div className="footer-links">
            <a href="https://github.com/Kyan-Shida" target="_blank" rel="noreferrer">github</a>
            <a href="mailto:kyanmei0623@163.com">email</a>
            <Link to="/other">resume</Link>
          </div>
        </div>
      </main>
    </div>
  );
}