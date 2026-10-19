import catalogsData from '../data/catalogs.json'
import GameCard from '../components/GameCard'

export default function Xbox() {
  const xboxGames = catalogsData.xbox || []

  return (
    <main>
      <section className="platform-hero xbox-hero">
        <div>
          <span className="eyebrow">PLATAFORMA</span>
          <h1>Xbox</h1>
          <p>Explora nuestra colección de videojuegos para Xbox.</p>
        </div>
        <div className="platform-symbol">
          <i className="fa-brands fa-xbox"></i>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CATÁLOGO</span>
            <h2>Juegos para Xbox</h2>
          </div>
        </div>

        <div className="games-grid">
          {xboxGames.map((game, idx) => (
            <GameCard key={idx} {...game} />
          ))}
        </div>
      </section>
    </main>
  )
}
