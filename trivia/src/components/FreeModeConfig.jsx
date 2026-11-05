// src/components/FreeModeConfig.jsx
import { useState } from 'react';

// Categorías oficiales exactas de Open Trivia Database con sus IDs reales
const OPENTDB_CATEGORIES = [
  { id: 9, name: 'Conocimiento general', icon: '🧠' },
  { id: 10, name: 'Arte', icon: '🎨' },
  { id: 11, name: 'Entretenimiento: Película', icon: '🎬' },
  { id: 12, name: 'Entretenimiento: Música', icon: '🎵' },
  { id: 14, name: 'Entretenimiento: Televisión', icon: '📺' },
  { id: 15, name: 'Entretenimiento: Videojuegos', icon: '🎮' },
  { id: 16, name: 'Entretenimiento: Juegos de mesa', icon: '🎲' },
  { id: 17, name: 'Ciencia y Naturaleza', icon: '🔬' },
  { id: 18, name: 'Ciencia: Computadoras', icon: '💻' },
  { id: 19, name: 'Ciencias: Matemáticas', icon: '📐' },
  { id: 21, name: 'Deportes', icon: '⚽' },
  { id: 22, name: 'Geografía', icon: '🌍' },
  { id: 23, name: 'Historia', icon: '📚' },
  { id: 24, name: 'Política', icon: '🏛️' },
  { id: 25, name: 'Mitología', icon: '⚡' }
];

const DIFFICULTIES = [
  { id: '', label: 'Cualquier dificultad' },
  { id: 'easy', label: 'Fácil' },
  { id: 'medium', label: 'Media' },
  { id: 'hard', label: 'Difícil' }
];

export default function FreeModeConfig({ onStartCustomGame, onBack }) {
  const [selectedCategories, setSelectedCategories] = useState(
    OPENTDB_CATEGORIES.map(c => c.id)
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const toggleCategory = (id) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedCategories.length === OPENTDB_CATEGORIES.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(OPENTDB_CATEGORIES.map(c => c.id));
    }
  };

  const handleStart = () => {
    if (selectedCategories.length === 0) {
      alert('Debes seleccionar al menos una categoría');
      return;
    }
    onStartCustomGame({
      categories: selectedCategories,
      difficulty: selectedDifficulty
    });
  };

  return (
    <div className="game-container-wrapper">
      <div className="config-dialog">
        <header className="config-dialog__header">
          <div className="config-dialog__title-wrapper">
            <span className="config-dialog__icon">🧭</span>
            <div>
              <h2 className="config-dialog__title">Personalizar Modo Libre</h2>
              <p className="config-dialog__subtitle">Conectado con los filtros oficiales de Open Trivia DB</p>
            </div>
          </div>
          <button className="config-dialog__toggle-all-btn" onClick={handleToggleAll}>
            {selectedCategories.length === OPENTDB_CATEGORIES.length ? '☑️ Desactivar Todas' : '✅ Activar Todas'}
          </button>
        </header>

        {/* Grid adaptable para mostrar todas las categorías de la API */}
        <section className="config-dialog__section">
          <div className="config-categories-grid">
            {OPENTDB_CATEGORIES.map(cat => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  className={`config-category-card ${isSelected ? 'config-category-card--active' : ''}`}
                  onClick={() => toggleCategory(cat.id)}
                >
                  <span className="config-category-card__icon">{cat.icon}</span>
                  <span className="config-category-card__name">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="config-dialog__section">
          <h3 className="config-dialog__label">Dificultad de la Trivia:</h3>
          <div className="config-difficulty-grid">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff.id}
                className={`config-difficulty-btn ${selectedDifficulty === diff.id ? 'config-difficulty-btn--active' : ''}`}
                onClick={() => setSelectedDifficulty(diff.id)}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </section>

        <footer className="config-dialog__footer">
          <button className="config-dialog__back-btn" onClick={onBack}>
            ← Volver
          </button>
          <button className="config-dialog__start-btn" onClick={handleStart}>
            Iniciar Partida Infinita ➔
          </button>
        </footer>
      </div>
    </div>
  );
}