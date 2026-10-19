import catalogsData from '../data/catalogs.json'
import GameCard from '../components/GameCard'

export default function PlayStation() {
  const playGames = catalogsData.play || []

  return (
    <main>
      <section className="platform-hero playstation-hero">
        <div>
          <span className="eyebrow">PLATAFORMA</span>
          <h1>PlayStation</h1>
          <p>Explora nuestra colección de videojuegos para PlayStation.</p>
        </div>
        <div className="platform-symbol">
          <i className="fa-brands fa-playstation"></i>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CATÁLOGO</span>
            <h2>Juegos para PlayStation</h2>
          </div>
        </div>

        <div className="games-grid">
          {playGames.map((game, idx) => (
            <GameCard key={idx} {...game} />
          ))}
        </div>
      </section>
    </main>
  )
}
