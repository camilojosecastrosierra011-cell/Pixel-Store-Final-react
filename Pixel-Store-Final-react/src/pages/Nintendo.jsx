import catalogsData from '../data/catalogs.json'
import GameCard from '../components/GameCard'

export default function Nintendo() {
  const nintendoGames = catalogsData.nintendo || []

  return (
    <main>
      <section className="platform-hero nintendo-hero">
        <div>
          <span className="eyebrow">PLATAFORMA</span>
          <h1>Nintendo</h1>
          <p>Explora nuestra colección de videojuegos para Nintendo.</p>
        </div>
        <div className="platform-symbol">
          <i className="fa-solid fa-gamepad"></i>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CATÁLOGO</span>
            <h2>Juegos para Nintendo</h2>
          </div>
        </div>

        <div className="games-grid">
          {nintendoGames.map((game, idx) => (
            <GameCard key={idx} {...game} />
          ))}
        </div>
      </section>
    </main>
  )
}
