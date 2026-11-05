// src/components/Menu.jsx
import Footer from './Footer'; // <-- Importa el componente

const TOP_PLAYERS = [
  { rank: 1, name: 'YUPQR', score: 2450, badge: '🥇' },
  { rank: 2, name: 'Alex_Z', score: 2100, badge: '🥈' },
  { rank: 3, name: 'Sistemas99', score: 1850, badge: '🥉' },
];

export default function Menu({ onStartGame }) {
  return (
    <div className="layout">
      {/* HEADER SUPERIOR FIJO */}
      <header className="header">
        <div className="header__brand">
          <div className="header__logo">Z</div>
          <span className="header__title">TRIVIA <span>Z</span></span>
        </div>
        <div className="header__status">
          <span className="header__badge">ONLINE</span>
        </div>
      </header>

      {/* SECCIÓN PRINCIPAL */}
      <main className="main-content">
        <div className="hero">
          <span className="hero__badge">✨ Desafíos Visuales Neón</span>
          <h1 className="hero__title">Selecciona tu Modo</h1>
        </div>

        {/* GRID DE MODOS */}
        <section className="modes-grid">
          {/* Tarjeta 1 */}
          <article className="mode-card">
            <div className="mode-card__icon mode-card__icon--cyan">📅</div>
            <h2 className="mode-card__title">Pregunta del Día</h2>
            <p className="mode-card__description">
              Desafío global de 24 horas. ¡Demuestra tu conocimiento rápido!
            </p>
            <button className="mode-card__btn" onClick={() => onStartGame('daily')}>
              Jugar ➔
            </button>
          </article>

          {/* Tarjeta 2 */}
          <article className="mode-card mode-card--survival">
            <div className="mode-card__header-row">
              <div className="mode-card__icon mode-card__icon--purple">⏱️</div>
              <span className="mode-card__tag">HUMO DENSUM</span>
            </div>
            <h2 className="mode-card__title">Supervivencia</h2>
            <p className="mode-card__description">
              60s iniciales. Aciertos suman tiempo. Niebla atmosférica intensa según el reloj.
            </p>
            <button className="mode-card__btn mode-card__btn--purple" onClick={() => onStartGame('survival')}>
              Sobrecapitular ➔
            </button>
          </article>

          {/* Tarjeta 3 */}
          <article className="mode-card">
            <div className="mode-card__header-row">
              <div className="mode-card__icon mode-card__icon--cyan">🧭</div>
              <span className="mode-card__tag mode-card__tag--cyan">INFINITO</span>
            </div>
            <h2 className="mode-card__title">Modo Libre</h2>
            <p className="mode-card__description">
              Preguntas al azar sin fin. Filtra por tus categorías y dificultad preferidas.
            </p>
            <button className="mode-card__btn" onClick={() => onStartGame('free')}>
              Modo Infinito ➔
            </button>
          </article>
        </section>

        {/* TOP 3 CLASIFICACIÓN */}
        <section className="leaderboard">
          <h3 className="leaderboard__title">🏆 Top 3 Clasificación</h3>
          <div className="leaderboard__grid">
            {TOP_PLAYERS.map((player) => (
              <div key={player.rank} className={`leaderboard__card leaderboard__card--rank-${player.rank}`}>
                <span className="leaderboard__badge">{player.badge}</span>
                <div className="leaderboard__user">
                  <span className="leaderboard__name">{player.name}</span>
                  <span className="leaderboard__score">{player.score} pts</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER AL FINAL DE LA PÁGINA */}
      <Footer />
    </div>
  );
}