import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WORDS = ['ADMIN', 'MONEY', 'YACHT', 'BONDS', 'FUNDS', 'TRUST', 'OWNER', 'BULLS', 'BEARS', 'TRADE', 'ASSET', 'STOCK'];
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

const getGuessStatuses = (guess: string, target: string) => {
  const statuses = Array(WORD_LENGTH).fill('absent');
  const targetChars = target.split('');
  
  // First pass: mark correct letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === targetChars[i]) {
      statuses[i] = 'correct';
      targetChars[i] = ''; // Mark as used
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (statuses[i] !== 'correct' && targetChars.includes(guess[i])) {
      statuses[i] = 'present';
      targetChars[targetChars.indexOf(guess[i])] = ''; // Mark as used
    }
  }
  
  return statuses;
};

export default function Verify() {
  const [targetWord] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [winStatus, setWinStatus] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGameOver) return;
    
    if (currentGuess.length === WORD_LENGTH) {
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      
      if (currentGuess === targetWord) {
        setIsGameOver(true);
        setWinStatus(true);
        timeoutRef.current = setTimeout(() => navigate('/reset-success', { state: { won: true, targetWord } }), 8000);
      } else if (newGuesses.length >= MAX_ATTEMPTS) {
        setIsGameOver(true);
        setWinStatus(false);
        timeoutRef.current = setTimeout(() => navigate('/reset-success', { state: { won: false, targetWord } }), 8000);
      } else {
        setCurrentGuess('');
      }
    }
  };



  return (
    <>
      <div className="auth-header">
        <h1>Bro, identity check</h1>
        <p>What would you guess your password to be? Lmao just try something (5 letters).</p>
      </div>

      <div className="animate-fade-in delay-100" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="wordle-grid">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const guess = guesses[rowIndex] || (isCurrentRow ? currentGuess : '');
            let rowStatuses: string[] = [];
            
            if (rowIndex < guesses.length) {
              rowStatuses = getGuessStatuses(guess, targetWord);
            }
            
            return (
              <div key={rowIndex} className="wordle-row">
                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                  const letter = guess[colIndex] || '';
                  const statusClass = rowStatuses[colIndex] || '';
                  
                  return (
                    <div 
                      key={colIndex} 
                      className={`wordle-cell ${letter ? 'filled' : ''} ${statusClass}`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {guesses.length > 0 && !isGameOver && (
          <p className="hint-text subtext-passive-aggressive text-center" style={{ marginTop: 'var(--space-3)' }}>
            {guesses.length === 1 && "Bro... you really thought that was it? 💀"}
            {guesses.length === 3 && "Bruh you're literally just guessing random letters now."}
            {guesses.length === 5 && "One more try before I just let you in anyway lmao."}
          </p>
        )}
        
        {isGameOver && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'var(--space-3)' }}>
            <p className="hint-text text-center" style={{ color: 'var(--color-text)', marginBottom: 'var(--space-3)' }}>
              {winStatus ? "Ain't no way you actually got it. Processing..." : "Whatever I'm tired, close enough. Processing..."}
            </p>
            <button 
              onClick={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                navigate('/reset-success', { state: { won: winStatus, targetWord } });
              }}
              style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', opacity: 0.8 }}
            >
              Skip Wait
            </button>
          </div>
        )}

        {!isGameOver && (
          <form onSubmit={handleSubmit} className="input-group" style={{ marginTop: 'var(--space-5)', width: '100%', marginBottom: 0 }}>
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5))}
              placeholder="Your guess..."
              autoFocus
              autoComplete="off"
              style={{ textAlign: 'center', letterSpacing: '0.2em' }}
            />
          </form>
        )}
      </div>
    </>
  );
}
