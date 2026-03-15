import React from 'react';
import type { BookId } from '../types';
import { BOOKS } from '../types';

interface DashboardProps {
  onSelectBook: (id: BookId) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectBook }) => {
  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="logo">Resolve Studio Trainer</h1>
        <p className="subtitle">DaVinci Resolve 20 — Certificación Oficial</p>
      </header>

      <div className="grid-container">
        {BOOKS.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => onSelectBook(book.id)}
          >
            <div className="card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <div className="card-content">
              <h3>{book.title}</h3>
              <span className="action-text">Empezar test →</span>
            </div>
          </div>
        ))}

        <div
          className="book-card exam-card"
          onClick={() => onSelectBook('final_exam')}
        >
          <div className="card-icon pulse">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7fe6b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <div className="card-content">
            <h3>SIMULACRO EXAMEN FINAL</h3>
            <p>Mezcla aleatoria de los 6 manuales</p>
            <span className="exam-tag">Certificación 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
