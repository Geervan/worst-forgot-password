import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FinalPage() {
  const navigate = useNavigate();
  const [showCover, setShowCover] = useState(true);

  useEffect(() => {
    // Hide the cover after a short delay (1 second) so they don't miss the dance
    const timer = setTimeout(() => {
      setShowCover(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: 'var(--color-bg)', fontFamily: 'var(--font-mono)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Top Nav */}
      <nav style={{ padding: 'var(--space-3) var(--space-6)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-text)' }}>Capital.</div>
        <div style={{ display: 'flex', gap: 'var(--space-5)', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--color-accent)' }}>Overview</span>
          <span style={{ cursor: 'pointer' }}>Transactions</span>
          <span style={{ cursor: 'pointer' }}>Settings</span>
          <span style={{ cursor: 'pointer', opacity: 0.5 }} onClick={() => navigate('/login')}>Logout</span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: 'var(--space-4)', maxWidth: '900px', width: '100%', margin: '0 auto', animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <header style={{ marginBottom: 'var(--space-4)', flexShrink: 0 }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-1)' }}>Welcome back.</h1>
          <p style={{ color: 'var(--color-text)', opacity: 0.7, margin: 0 }}>Here is your high-priority briefing for this quarter.</p>
        </header>

        {/* Rickroll Video Container */}
        <div style={{ 
          backgroundColor: 'var(--color-surface)', 
          border: '1px solid var(--color-border)', 
          boxShadow: '10px 10px 0px rgba(42, 26, 30, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          marginBottom: 'var(--space-4)'
        }}>
          <div style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-2) var(--space-3)', display: 'flex', justifyContent: 'space-between', flexShrink: 0, backgroundColor: 'var(--color-surface)', zIndex: 2 }}>
            <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Q3 Strategy Video</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-error)', fontWeight: 'bold' }}>• LIVE</span>
          </div>
          
          <div style={{ position: 'relative', flex: 1, width: '100%', overflow: 'hidden', backgroundColor: 'black' }}>
            {/* 
              We use transform: scale(1.3) to push the YouTube title and controls completely outside the visible overflow area.
              pointerEvents: auto allows the user to pause/play the video by clicking it.
            */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&disablekb=1&mute=0"
              title="Strategy Briefing"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto', transform: 'scale(1.3)' }}
            ></iframe>
            
            <div style={{
              position: 'absolute', inset: 0, 
              backgroundColor: 'var(--color-surface)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
              opacity: showCover ? 1 : 0,
              pointerEvents: showCover ? 'auto' : 'none',
              transition: 'opacity 0.4s ease',
            }}>
              <div style={{ 
                width: '40px', height: '40px', 
                border: '2px solid var(--color-border)',
                borderTopColor: 'var(--color-text)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: 'var(--space-3)'
              }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>Decrypting secure stream...</p>
            </div>

            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </main>
    </div>
  );
}
