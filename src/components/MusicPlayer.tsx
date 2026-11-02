import { useState, useRef, useEffect } from 'react';
import musicSrc from '../assets/music.mp3'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

  audio.volume = 0.04;
    // console.log('✅ volume set to:', audio.volume); // ← 检查控制台输出
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <>
      <style>{`
        @keyframes music-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26,26,26,0.25); }
          50% { box-shadow: 0 0 0 10px rgba(26,26,26,0); }
        }
        @keyframes music-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .music-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #1a1a1a;
          color: #f4f2ed;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          z-index: 100;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 6px 24px rgba(0,0,0,0.15);
        }
        .music-btn:hover {
          transform: scale(1.15) rotate(-5deg);
          background: #3a3a3a;
          box-shadow: 0 10px 36px rgba(0,0,0,0.25);
        }
        .music-btn:active {
          transform: scale(0.95);
        }
        .music-btn.playing {
          animation: music-pulse 2s ease-in-out infinite;
        }
        .music-btn .icon {
          display: inline-block;
          transition: transform 0.3s;
        }
        .music-btn:hover .icon {
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .music-btn {
            bottom: 20px;
            right: 20px;
            width: 48px;
            height: 48px;
            font-size: 1.1rem;
          }
        }
      `}</style>

      <audio ref={audioRef} src={musicSrc} preload="metadata" loop />

      <button
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggle}
        title={isPlaying ? '暂停' : '播放'}
      >
        <span className="icon">{isPlaying ? '⏸' : '▶'}</span>
      </button>
    </>
  );
}