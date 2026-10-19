import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import catalogsData from '../data/catalogs.json'
import GameCard from '../components/GameCard'

const ALL_GAMES = catalogsData.explorar || []

export default function Catalog() {
  const [platformFilter, setPlatformFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const location = useLocation()

  // Extract ?q= from URL
  const queryParam = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return (params.get('q') || '').trim().toLowerCase()
  }, [location.search])

  const filteredAndSortedGames = useMemo(() => {
    let result = [...ALL_GAMES]

    // 1. Text Search Filter
    if (queryParam) {
      result = result.filter(game => {
        const titleMatch = (game.title || '').toLowerCase().includes(queryParam)
        const dataMatch = (game.dataGame || '').toLowerCase().includes(queryParam)
        const genreMatch = (game.genre || '').toLowerCase().includes(queryParam)
        return titleMatch || dataMatch || genreMatch
      })
    }

    // 2. Platform Filter
    if (platformFilter !== 'all') {
      result = result.filter(game => {
        const plat = (game.dataPlatform || game.platform || '').toLowerCase()
        if (platformFilter === 'ps5') return plat.includes('ps5') || plat.includes('playstation')
        if (platformFilter === 'xbox') return plat.includes('xbox')
        if (platformFilter === 'switch') return plat.includes('switch') || plat.includes('nintendo')
        return true
      })
    }

    // 3. Sorting
    if (sortBy === 'name') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    } else if (sortBy === 'price-low') {
      const getP = (g) => parseInt((g.price || '0').replace(/\D/g, ''), 10) || 0
      result.sort((a, b) => getP(a) - getP(b))
    } else if (sortBy === 'price-high') {
      const getP = (g) => parseInt((g.price || '0').replace(/\D/g, ''), 10) || 0
      result.sort((a, b) => getP(b) - getP(a))
    }

    return result
  }, [queryParam, platformFilter, sortBy])

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">CATÁLOGO PIXEL STORE</span>
        <h1>Explora nuestro catálogo</h1>
        <p>Encuentra tu próximo juego y filtra por plataforma.</p>
      </section>

      <section className="section">
        <div className="catalog-toolbar">
          <div className="filter-group">
            <button
              className={`filter-btn ${platformFilter === 'all' ? 'active' : ''}`}
              type="button"
              onClick={() => setPlatformFilter('all')}
            >
              Todos
            </button>
            <button
              className={`filter-btn ${platformFilter === 'ps5' ? 'active' : ''}`}
              type="button"
              onClick={() => setPlatformFilter('ps5')}
            >
              PlayStation
            </button>
            <button
              className={`filter-btn ${platformFilter === 'xbox' ? 'active' : ''}`}
              type="button"
              onClick={() => setPlatformFilter('xbox')}
            >
              Xbox
            </button>
            <button
              className={`filter-btn ${platformFilter === 'switch' ? 'active' : ''}`}
              type="button"
              onClick={() => setPlatformFilter('switch')}
            >
              Nintendo
            </button>
          </div>

          <select
            id="sortGames"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Ordenar</option>
            <option value="price-low">Precio menor</option>
            <option value="price-high">Precio mayor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>

        {filteredAndSortedGames.length > 0 ? (
          <div className="games-grid catalog-grid" id="catalogGrid">
            {filteredAndSortedGames.map((game, idx) => (
              <GameCard key={idx} {...game} />
            ))}
          </div>
        ) : (
          <div className="empty-search" style={{ display: 'block' }}>
            No encontramos juegos con esa búsqueda.
          </div>
        )}
      </section>
    </main>
  )
}
