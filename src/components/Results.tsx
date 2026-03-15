import React from 'react';

interface ResultsProps {
  score: number;
  total: number;
  timeTaken: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, total, timeTaken, onRestart }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPassed = percentage >= 80;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="results-screen">
      <div className="results-card">
        <div className={`result-header ${isPassed ? 'pass' : 'fail'}`}>
          <div className="percentage-circle">
            <span className="percent-val">{percentage}%</span>
            <span className="percent-label">SCORE</span>
          </div>
          <h2>{isPassed ? '¡APROBADO! 🎉' : 'SIGUE PRACTICANDO'}</h2>
          <p>{isPassed ? 'Estás listo para el examen oficial.' : 'Necesitas 80% para aprobar la certificación.'}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Correctas</span>
            <span className="stat-value" style={{ color: 'var(--correct)' }}>{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Incorrectas</span>
            <span className="stat-value" style={{ color: 'var(--incorrect)' }}>{total - score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Tiempo</span>
            <span className="stat-value">{formatTime(timeTaken)}</span>
          </div>
        </div>

        <div className="results-actions">
          <button className="primary-btn" onClick={onRestart}>
            ← VOLVER AL INICIO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
