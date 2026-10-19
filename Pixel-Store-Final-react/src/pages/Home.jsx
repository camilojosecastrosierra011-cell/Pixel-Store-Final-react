import { Link } from 'react-router-dom'
import catalogsData from '../data/catalogs.json'
import GameCard from '../components/GameCard'

export default function Home() {
  const popularGames = catalogsData.home || []

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero home-hero">
        <div className="hero-copy">
          <span className="eyebrow">★ NUEVO LANZAMIENTO</span>
          <h1>
            Descubre una nueva forma de <span>jugar.</span>
          </h1>
          <p>
            Compra y descubre videojuegos para PlayStation, Xbox y Nintendo desde
            una sola plataforma.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/explorar">
              Explorar catálogo
            </Link>
            <Link className="btn btn-secondary" to="/ofertas">
              Ver ofertas
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <img src="/banner.jpg" alt="Videojuegos" />
        </div>
      </section>

      {/* JUEGOS POPULARES SECTION */}
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CATÁLOGO</span>
            <h2>Juegos populares</h2>
          </div>
          <Link className="text-link" to="/explorar">
            Ver todo <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <div className="games-grid">
          {popularGames.map((game, idx) => (
            <GameCard key={idx} {...game} />
          ))}
        </div>
      </section>

      {/* PLATAFORMAS SECTION */}
      <section className="section platforms-section">
        <div className="section-heading centered">
          <div>
            <span className="eyebrow">ELIGE TU PLATAFORMA</span>
            <h2>Juega como quieras</h2>
          </div>
        </div>

        <div className="platform-grid">
          <Link className="platform-tile" to="/play">
            <span>
              <i className="fa-brands fa-playstation"></i>
            </span>
            <h3>PlayStation</h3>
            <p>Descubre aventuras para PS4 y PS5.</p>
          </Link>

          <Link className="platform-tile" to="/xbox">
            <span>
              <i className="fa-brands fa-xbox"></i>
            </span>
            <h3>Xbox</h3>
            <p>Acción, carreras y grandes historias.</p>
          </Link>

          <Link className="platform-tile" to="/nintendo">
            <span>
              <i className="fa-solid fa-gamepad"></i>
            </span>
            <h3>Nintendo</h3>
            <p>La magia de Nintendo en un solo lugar.</p>
          </Link>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="promo">
        <div>
          <span className="eyebrow">OFERTA ESPECIAL</span>
          <h2>Hasta 70% de descuento</h2>
          <p>Encuentra grandes juegos a precios especiales por tiempo limitado.</p>
          <Link className="btn btn-primary" to="/ofertas">
            Ver ofertas
          </Link>
        </div>
        <img src="/controller.jpg" alt="Control de videojuegos" />
      </section>
    </main>
  )
}
