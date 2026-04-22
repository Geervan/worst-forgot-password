import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [loadingText, setLoadingText] = useState('Hold up, loading...');
  const navigate = useNavigate();

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingText('Checking if your session is actually valid...');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoadingText('Looks good. Booting up...');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/home');
    };

    sequence();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
      <h2 className="animate-fade-in" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--color-text)' }}>
        {loadingText}
      </h2>
      <div className="animate-fade-in delay-100" style={{ marginTop: 'var(--space-4)', width: '200px', height: '2px', backgroundColor: 'var(--color-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, left: 0, height: '100%', 
          backgroundColor: 'var(--color-text)', 
          width: '50%',
          animation: 'loadbar 1.5s infinite ease-in-out' 
        }} />
      </div>
      <style>{`
        @keyframes loadbar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
