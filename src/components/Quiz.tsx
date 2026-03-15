import React, { useState } from 'react';
import type { Question, Option } from '../types';

interface QuizProps {
  questions: Question[];
  onFinish: (score: number, duration: number) => void;
  onExit: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onFinish, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (option: Option) => {
    if (isAnswered) return;
    setSelectedOptionId(option.id);
    setIsAnswered(true);
    if (option.isCorrect) {
      setScore(s => s + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      const finalScore = isAnswered && questions[currentIndex].options.find(o => o.id === selectedOptionId)?.isCorrect
        ? score
        : score;
      const duration = Math.floor((Date.now() - startTime) / 1000);
      onFinish(finalScore, duration);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="quiz-screen">
      <header className="quiz-header">
        <button className="exit-btn" onClick={onExit}>✕ SALIR</button>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{currentIndex + 1}/{questions.length}</span>
        </div>
        <div className="score-pill">✓ {score}</div>
      </header>

      <main className="question-container">
        <div className="question-content">
          <h2 className="text-en">{currentQuestion.pregunta_en}</h2>
          <h3 className="text-es">{currentQuestion.pregunta_es}</h3>
        </div>

        <div className="options-grid">
          {currentQuestion.options.map((option) => {
            let className = 'option-card';
            if (isAnswered) {
              if (option.isCorrect) className += ' correct';
              else if (selectedOptionId === option.id) className += ' incorrect';
              else className += ' disabled';
            }

            return (
              <button
                key={option.id}
                className={className}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
              >
                <div className="option-text">
                  <p className="opt-en">{option.text_en}</p>
                  <p className="opt-es">{option.text_es}</p>
                </div>
                {isAnswered && option.isCorrect && (
                  <span className="feedback-icon correct">✓</span>
                )}
                {isAnswered && !option.isCorrect && selectedOptionId === option.id && (
                  <span className="feedback-icon incorrect">✕</span>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && showExplanation && (
          <div className="explanation-panel animate-fade-in">
            <div className="explanation-header">
              <span className="page-tag">Pág. {currentQuestion.pagina}</span>
              <h4>Explicación oficial</h4>
            </div>
            <p className="exp-en">{currentQuestion.argumento_en}</p>
            <p className="exp-es">{currentQuestion.argumento_es}</p>
            <button className="next-btn" onClick={handleNext}>
              {currentIndex + 1 === questions.length ? 'VER RESULTADOS 🏁' : 'SIGUIENTE →'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;
