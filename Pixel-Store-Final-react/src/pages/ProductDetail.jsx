import { useState, useMemo } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import productsData from '../data/products.json'
import { useCart } from '../context/useCart'
import { useAuth } from '../context/useAuth'

export default function ProductDetail({ explicitSlug }) {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)

  // Find product
  const product = useMemo(() => {
    const slugToFind = (
      explicitSlug ||
      params.slug ||
      location.pathname.replace(/^\//, '')
    ).toLowerCase()

    // 1. Direct match with file or slug
    let found = productsData.find(
      (p) =>
        p.slug.toLowerCase() === slugToFind ||
        p.file.toLowerCase() === slugToFind ||
        p.slug.toLowerCase() === slugToFind.replace(/\.html$/, '') ||
        p.file.toLowerCase() === `${slugToFind}.html`
    )

    if (found) return found

    // 2. Fallback search by title or keyword
    const cleanSearch = slugToFind.replace(/^portada(de)?/i, '').replace(/\.html$/, '')
    found = productsData.find(
      (p) =>
        p.title.toLowerCase().replace(/[^a-z0-9]/g, '').includes(cleanSearch) ||
        p.slug.toLowerCase().includes(cleanSearch)
    )

    return found || productsData[0]
  }, [explicitSlug, params.slug, location.pathname])

  if (!product) {
    return (
      <main style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Producto no encontrado</h2>
        <p style={{ color: 'var(--muted)', margin: '15px 0' }}>
          El juego que buscas no está disponible en este momento.
        </p>
        <Link className="btn btn-primary" to="/explorar">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      name: product.title,
      img: product.cover,
      platform: product.details?.[0] || product.tag,
      price: product.price
    })
  }

  const handleBuyNow = () => {
    addToCart({
      name: product.title,
      img: product.cover,
      platform: product.details?.[0] || product.tag,
      price: product.price
    })
    if (!isAuthenticated) {
      navigate('/iniciar?return=carrito')
    } else {
      navigate('/carrito')
    }
  }

  return (
    <main>
      {/* ================= PRODUCTO ================= */}
      <section className="game-product">
        <div className="product-container">
          <div className="product-cover">
            <img
              src={product.cover.startsWith('/') ? product.cover : `/${product.cover}`}
              alt={product.title}
            />
          </div>

          <div className="product-info">
            {product.tag && <span className="tag">{product.tag}</span>}

            <h1>{product.title}</h1>

            <div className="rating">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
              <span>{product.rating || '4.8 / 5'}</span>
            </div>

            {product.shortDesc && <p>{product.shortDesc}</p>}

            <div className="price">
              <div>
                {product.oldPrice && (
                  <span className="old-price">{product.oldPrice}</span>
                )}
                <h2>{product.price}</h2>
              </div>
              {product.discount && (
                <span className="discount">{product.discount}</span>
              )}
            </div>

            <div className="buttons">
              <button className="buy" type="button" onClick={handleBuyNow}>
                Comprar ahora
              </button>

              <button className="cart" type="button" onClick={handleAddToCart}>
                <i className="fa-solid fa-cart-shopping"></i> Añadir al carrito
              </button>

              <button
                className="favorite"
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <i
                  className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}
                  style={{ color: isFavorite ? 'var(--red)' : '' }}
                ></i>
              </button>
            </div>

            {product.details && product.details.length > 0 && (
              <div className="game-details">
                {product.details.map((detail, idx) => (
                  <div key={idx}>{detail}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= INFORMACIÓN DEL JUEGO ================= */}
      <section className="game-description">
        <div className="description-container">
          <div className="description-text">
            <h2>Sobre el juego</h2>
            {product.descParas && product.descParas.length > 0 ? (
              product.descParas.map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <p>
                Sumérgete en una experiencia de juego inigualable con {product.title},
                gráficos deslumbrantes y una jugabilidad adaptada para la máxima
                diversión.
              </p>
            )}
          </div>

          {product.features && product.features.length > 0 && (
            <div className="features">
              <h2>Características</h2>
              <ul>
                {product.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ================= GALERÍA ================= */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="gallery">
          <h2>Galería del juego</h2>
          <div className="gallery-grid">
            {product.gallery.map((img, idx) => (
              <img
                key={idx}
                src={img.startsWith('/') ? img : `/${img}`}
                alt={`${product.title} captura ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= INFORMACIÓN ADICIONAL ================= */}
      {(product.extraItems?.length > 0 || product.editions?.length > 0) && (
        <section className="game-extra">
          {product.extraItems && product.extraItems.length > 0 && (
            <div className="extra-box">
              <h3>Información del producto</h3>
              {product.extraItems.map((item, idx) => (
                <div className="extra-item" key={idx}>
                  <strong>{item.label}</strong> {item.val}
                </div>
              ))}
            </div>
          )}

          {product.editions && product.editions.length > 0 && (
            <div className="extra-box">
              <h3>Ediciones disponibles</h3>
              {product.editions.map((ed, idx) => (
                <div className="edition" key={idx}>
                  <span>{ed.name}</span>
                  <strong>{ed.price}</strong>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ================= OFERTA ESPECIAL ================= */}
      {product.specialOffer && (
        <section className="special-offer">
          <div className="offer-content">
            <span>OFERTA ESPECIAL</span>
            <h2>{product.specialOffer.title}</h2>
            <p>{product.specialOffer.text}</p>
            <button type="button" onClick={handleAddToCart}>
              Comprar ahora
            </button>
          </div>
          {product.specialOffer.img && (
            <img
              src={
                product.specialOffer.img.startsWith('/')
                  ? product.specialOffer.img
                  : `/${product.specialOffer.img}`
              }
              alt={product.title}
            />
          )}
        </section>
      )}
    </main>
  )
}
