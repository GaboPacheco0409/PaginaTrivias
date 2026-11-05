// src/App.jsx
import { useState } from 'react';
import Menu from './components/Menu';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import './App.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu', 'game', 'results'
  const [gameMode, setGameMode] = useState(null); // 'daily', 'survival', 'free'
  const [finalStats, setFinalStats] = useState({ score: 0, questionsAnswered: 0 });

  // Función para iniciar juego
  const handleStartGame = (mode) => {
    setGameMode(mode);
    setCurrentScreen('game');
  };

  // Función cuando termina la partida
  const handleGameOver = (stats) => {
    setFinalStats(stats);
    setCurrentScreen('results');
  };

  return (
    <main className="trivia-app">
      {currentScreen === 'menu' && <Menu onStartGame={handleStartGame} />}
      
      {currentScreen === 'game' && (
        <GameBoard 
          mode={gameMode} 
          onExit={() => setCurrentScreen('menu')} 
          onGameOver={handleGameOver}
        />
      )}

      {currentScreen === 'results' && (
        <GameOver 
          stats={finalStats} 
          onRestart={() => setCurrentScreen('menu')} 
        />
      )}
    </main>
  );
}