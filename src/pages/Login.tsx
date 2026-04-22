import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verified = sessionStorage.getItem('verified') === 'true';
    setIsVerified(verified);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredPassword = sessionStorage.getItem('requiredPassword');

    if (isVerified && requiredPassword && password.toUpperCase() === requiredPassword.toUpperCase()) {
      navigate('/dashboard');
      return;
    }

    if (!isVerified && password === 'hehe123') {
      navigate('/dashboard');
      return;
    }

    // Always fail otherwise
    setFailedAttempts(prev => prev + 1);
  };

  return (
    <>
      <div className="auth-header">
        <h1>{isVerified ? "Aight we good." : "Sup. Welcome back."}</h1>
        <p>{isVerified ? "You can come in now." : "Drop your credentials below."}</p>
        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: 'var(--space-2)' }}>
          {!isVerified ? "(Enter any dummy for now)" : "(Enter the password you just earned)"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="animate-fade-in delay-100">
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {failedAttempts > 0 && (
            <span className="error-text">Nah that ain't it chief. Try again.</span>
          )}
          {failedAttempts >= 1 && !isVerified && (
            <span className="hint-text subtext-passive-aggressive">
              Bruh did you actually forget your password? 😭
            </span>
          )}
        </div>

        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }} className="animate-fade-in delay-200">
        <Link to="/forgot-password" style={{ opacity: failedAttempts >= 1 ? 1 : 0.3, transition: 'opacity 0.3s' }}>
          Forgot Password?
        </Link>
      </div>
    </>
  );
}
