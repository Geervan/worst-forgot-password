import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify');
  };

  return (
    <>
      <div className="auth-header">
        <h1>Bro forgot his password... no surprise</h1>
        <p>Just drop your email down below and we'll see what we can do.</p>
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

        <button type="submit">Continue</button>
      </form>

      <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }} className="animate-fade-in delay-200">
        <Link to="/login">Return to Login</Link>
      </div>
    </>
  );
}
