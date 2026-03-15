import React, { useState } from 'react';

interface TestSetupProps {
  bookTitle: string;
  onStart: (count: number) => void;
  onBack: () => void;
}

const TestSetup: React.FC<TestSetupProps> = ({ bookTitle, onStart, onBack }) => {
  const [count, setCount] = useState(10);

  return (
    <div className="setup-screen">
      <button className="back-btn" onClick={onBack}>
        ← Volver
      </button>

      <div className="setup-card">
        <h2 className="setup-title">{bookTitle}</h2>
        <p className="setup-description">
          Configura tu sesión de estudio. Se generarán opciones múltiples aleatorias para cada pregunta.
        </p>

        <div className="selector-group">
          <label>Número de preguntas:</label>
          <div className="count-options">
            {[10, 20, 30, 50].map(val => (
              <button 
                key={val}
                className={`count-btn ${count === val ? 'active' : ''}`}
                onClick={() => setCount(val)}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div className="info-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>Tiempo estimado: <strong>{count * 1.5} minutos</strong></p>
        </div>

        <button className="start-btn" onClick={() => onStart(count)}>
          INICIAR TEST
        </button>
      </div>
    </div>
  );
};

export default TestSetup;
