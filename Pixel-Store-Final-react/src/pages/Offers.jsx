import catalogsData from '../data/catalogs.json'
import GameCard from '../components/GameCard'

export default function Offers() {
  const offerGames = catalogsData.ofertas || []

  return (
    <main>
      <section className="offer-hero">
        <div>
          <span className="eyebrow">OFERTAS ESPECIALES</span>
          <h1>Las mejores ofertas están aquí.</h1>
          <p>Descuentos de hasta 80% en títulos seleccionados.</p>
          <a className="btn btn-primary" href="#ofertas">
            Ver ofertas
          </a>
        </div>
        <img src="/paisaje.jpg" alt="Ofertas Pixel Store" />
      </section>

      <section className="section" id="ofertas">
        <div className="section-heading">
          <div>
            <span className="eyebrow">AHORRA HOY</span>
            <h2>Promociones destacadas</h2>
          </div>
        </div>

        <div className="games-grid">
          {offerGames.map((game, idx) => (
            <GameCard key={idx} {...game} />
          ))}
        </div>
      </section>
    </main>
  )
}
