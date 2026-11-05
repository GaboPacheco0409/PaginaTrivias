// src/App.jsx
import { useState } from 'react';
import Menu from './components/Menu';
import FreeModeConfig from './components/FreeModeConfig';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import './App.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu', 'config', 'game', 'results'
  const [gameMode, setGameMode] = useState(null); // 'daily', 'survival', 'free'
  const [customConfig, setCustomConfig] = useState(null); // Categorías y dificultad elegidas
  const [finalStats, setFinalStats] = useState({ score: 0, questionsAnswered: 0 });

  const handleStartGame = (mode) => {
    setGameMode(mode);
    if (mode === 'free') {
      setCurrentScreen('config'); // Si es libre, primero abre la pantalla de personalización
    } else {
      setCurrentScreen('game'); // Los demás modos entran directo
    }
  };

  const handleStartCustomGame = (config) => {
    setCustomConfig(config);
    setCurrentScreen('game');
  };

  const handleGameOver = (stats) => {
    setFinalStats(stats);
    setCurrentScreen('results');
  };

  return (
    <main className="trivia-app">
      {currentScreen === 'menu' && <Menu onStartGame={handleStartGame} />}

      {currentScreen === 'config' && (
        <FreeModeConfig 
          onStartCustomGame={handleStartCustomGame} 
          onBack={() => setCurrentScreen('menu')} 
        />
      )}
      
      {currentScreen === 'game' && (
        <GameBoard 
          mode={gameMode} 
          config={customConfig}
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