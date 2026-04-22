import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResetSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const won = location.state?.won ?? true; // Default to true if accessed directly
  const targetWord = location.state?.targetWord ?? 'ADMIN';

  useEffect(() => {
    // Set the verified flag regardless of win/loss
    sessionStorage.setItem('verified', 'true');
    sessionStorage.setItem('requiredPassword', won ? targetWord : 'hehe123');
  }, [won, targetWord]);

  return (
    <>
      <div className="auth-header animate-fade-in">
        <h1>{won ? "Identity Verified" : "Task Failed Successfully"}</h1>
        <p>{won ? "Bro actually guessed it. Aight, you're clear." : "You didn't even get the word right, but whatever. We're letting you in anyway."}</p>
      </div>

      <div className="animate-fade-in delay-100" style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: 'var(--space-5)' }}>
          {won ? `You can now securely log in with your credentials. (The password is ${targetWord})` : "Just go log in, we won't tell anyone. The password is hehe123"}
        </p>

        <button onClick={() => navigate('/login')}>
          Return to Login
        </button>
      </div>
    </>
  );
}
