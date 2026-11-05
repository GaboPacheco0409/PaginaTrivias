// src/components/GameBoard.jsx
import { useState, useEffect } from 'react';
import { MOCK_QUESTIONS } from '../data/mockData';

export default function GameBoard({ mode, onExit, onGameOver }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mode === 'survival' ? 45 : 0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  // Temporizador para el Modo Supervivencia
  useEffect(() => {
    if (mode !== 'survival') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode]);

  // Disparar Game Over cuando el tiempo llega a 0
  useEffect(() => {
    if (mode === 'survival' && timeLeft === 0) {
      onGameOver({ score, questionsAnswered: currentIndex });
    }
  }, [timeLeft, mode, score, currentIndex, onGameOver]);

  let fogClass = 'game-board__fog--normal';
  if (mode === 'survival') {
    if (timeLeft <= 15) {
      fogClass = 'game-board__fog--danger';
    } else if (timeLeft <= 30) {
      fogClass = 'game-board__fog--warning';
    }
  }

  const currentQ = MOCK_QUESTIONS[currentIndex % MOCK_QUESTIONS.length];

  const handleSelectOption = (index) => {
    if (isAnswerLocked) return; // Evitar múltiples clics rápidos
    setIsAnswerLocked(true);
    setSelectedAnswer(index);

    const isCorrect = index === currentQ.correct;

    if (isCorrect) {
      setScore((s) => s + 100);
      if (mode === 'survival') setTimeLeft((t) => t + 10);
    } else {
      if (mode === 'survival') setTimeLeft((t) => Math.max(0, t - 5));
    }

    // Esperar 800ms para mostrar el color verde/rojo antes de pasar a la siguiente
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
      setCurrentIndex((prev) => prev + 1);
    }, 800);
  };

  return (
    <div className="game-container-wrapper">
      <div className={`game-board ${mode === 'survival' ? fogClass : ''}`}>
        {mode === 'survival' && <div className={`game-board__fog ${fogClass}`} />}

        <div className="game-board__content">
          {/* HEADER DE LA PARTIDA */}
          <header className="game-board__header">
            <button className="game-board__exit-btn" onClick={onExit}>🚪 Salir</button>
            <div className="game-board__stats">
              <span className="game-board__score-tag">Puntos: <strong>{score}</strong></span>
              {mode === 'survival' && (
                <span className={`game-board__timer ${timeLeft <= 15 ? 'game-board__timer--danger' : ''}`}>
                  ⏱️ {timeLeft}s
                </span>
              )}
            </div>
          </header>

          {/* TARJETA DE PREGUNTA */}
          <section className="question-card">
            <div className="question-card__meta">
              <span className="question-card__category">📂 {currentQ.category.toUpperCase()}</span>
              <span className="question-card__counter">Pregunta #{currentIndex + 1}</span>
            </div>
            <h2 className="question-card__title">{currentQ.question}</h2>
          </section>

          {/* TARJETAS DE RESPUESTA CON FEEDBACK VISUAL */}
          <section className="answers-grid">
            {currentQ.options.map((opt, idx) => {
              const optionLetter = String.fromCharCode(65 + idx);
              
              // Lógica de clases para el feedback visual (verde/rojo)
              let statusClass = '';
              if (selectedAnswer !== null) {
                if (idx === currentQ.correct) {
                  statusClass = 'answer-card--correct'; // Siempre marca la correcta en verde
                } else if (idx === selectedAnswer) {
                  statusClass = 'answer-card--wrong'; // Marca tu elección en rojo si fallaste
                }
              }

              return (
                <article 
                  key={idx} 
                  className={`answer-card ${statusClass}`}
                  onClick={() => handleSelectOption(idx)}
                >
                  <div className="answer-card__prefix">{optionLetter}</div>
                  <div className="answer-card__text">{opt}</div>
                </article>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}