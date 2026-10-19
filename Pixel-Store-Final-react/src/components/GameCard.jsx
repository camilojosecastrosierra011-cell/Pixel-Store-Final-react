import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

export default function GameCard({
  dataGame,
  dataPlatform,
  href,
  img,
  discount,
  platform,
  title,
  genre,
  price
}) {
  const { addToCart } = useCart()

  // Resolve target route
  let targetLink = '#'
  if (href) {
    targetLink = href.startsWith('/') ? href : `/${href}`
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      name: title,
      img: img,
      platform: platform,
      price: price
    })
  }

  return (
    <article
      className="game-card"
      data-game={dataGame || title?.toLowerCase()}
      data-platform={dataPlatform || platform?.toLowerCase()}
    >
      <Link className="game-image" to={targetLink}>
        <img src={img.startsWith('/') ? img : `/${img}`} alt={title} />
        {discount && <span className="discount-badge">{discount}</span>}
      </Link>

      <div className="game-info">
        <span className="game-platform">{platform}</span>
        <h3>{title}</h3>
        {genre && <p>{genre}</p>}

        <div className="game-bottom">
          <strong>{price}</strong>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleAddToCart}
              title="Añadir al carrito"
              style={{
                background: 'rgba(255, 31, 61, 0.15)',
                border: '1px solid rgba(255, 31, 61, 0.4)',
                color: '#fff',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '11px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <i className="fa-solid fa-cart-plus"></i>
            </button>
            {targetLink !== '#' && (
              <Link className="small-link" to={targetLink}>
                Ver juego
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
