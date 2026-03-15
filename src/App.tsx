import React, { useState } from 'react';
import './index.css';
import type { BookId, Question, RawQuestion } from './types';
import { BOOKS } from './types';
import { processQuestions, shuffleArray } from './utils/quizUtils.ts';

import Dashboard from './components/Dashboard.tsx';
import TestSetup from './components/TestSetup.tsx';
import Quiz from './components/Quiz.tsx';
import Results from './components/Results.tsx';

type Screen = 'DASHBOARD' | 'SETUP' | 'QUIZ' | 'RESULTS';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('DASHBOARD');
  const [selectedBook, setSelectedBook] = useState<BookId | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const startSetup = (bookId: BookId) => {
    setSelectedBook(bookId);
    setCurrentScreen('SETUP');
  };

  const startQuiz = async (count: number) => {
    let allRawQuestions: RawQuestion[] = [];

    if (selectedBook === 'final_exam') {
      for (const book of BOOKS) {
        const response = await fetch(`/data/${book.fileName}`);
        const data = await response.json();
        allRawQuestions = [...allRawQuestions, ...data];
      }
    } else {
      const book = BOOKS.find(b => b.id === selectedBook);
      if (book) {
        const response = await fetch(`/data/${book.fileName}`);
        allRawQuestions = await response.json();
      }
    }

    const processed = processQuestions(allRawQuestions);
    const shuffled = shuffleArray(processed).slice(0, count);

    setQuestions(shuffled);
    setCurrentScreen('QUIZ');
  };

  const finishQuiz = (finalScore: number, duration: number) => {
    setScore(finalScore);
    setTimeTaken(duration);
    setCurrentScreen('RESULTS');
  };

  const reset = () => {
    setCurrentScreen('DASHBOARD');
    setSelectedBook(null);
    setQuestions([]);
    setScore(0);
    setTimeTaken(0);
  };

  return (
    <div className="app-container">
      {currentScreen === 'DASHBOARD' && (
        <Dashboard onSelectBook={startSetup} />
      )}

      {currentScreen === 'SETUP' && selectedBook && (
        <TestSetup
          bookTitle={
            selectedBook === 'final_exam'
              ? 'Certificación Final DaVinci Resolve 20'
              : BOOKS.find(b => b.id === selectedBook)?.title || ''
          }
          onStart={startQuiz}
          onBack={reset}
        />
      )}

      {currentScreen === 'QUIZ' && (
        <Quiz
          questions={questions}
          onFinish={finishQuiz}
          onExit={reset}
        />
      )}

      {currentScreen === 'RESULTS' && (
        <Results
          score={score}
          total={questions.length}
          timeTaken={timeTaken}
          onRestart={reset}
        />
      )}
    </div>
  );
};

export default App;
