import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'

export default function Cart() {
  const { cart, removeFromCart, updateQty, subtotal, tax, total, formatMoney } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/metodosdepago')
  }

  return (
    <main>
      <section className="cart-page">
        <div className="page-heading">
          <span className="eyebrow">COMPRA</span>
          <h1>Tu carrito</h1>
          <p>Revisa tus juegos antes de finalizar la compra.</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state" style={{ background: '#111116', borderRadius: '18px', border: '1px solid var(--line)' }}>
            <i className="fa-solid fa-cart-shopping"></i>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega los juegos que más te gusten para comenzar tu aventura.</p>
            <Link className="btn btn-primary" to="/explorar">
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list" id="cartList">
              {cart.map((item, index) => (
                <div className="cart-item" key={index} data-price={item.price}>
                  <img src={item.img.startsWith('/') ? item.img : `/${item.img}`} alt={item.name} />
                  <div className="cart-item-info">
                    <span>{item.platform || 'Videojuego'}</span>
                    <h3>{item.name}</h3>
                    <strong>{formatMoney(item.price)}</strong>
                  </div>

                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() => updateQty(item.name, -1)}
                      title="Reducir cantidad"
                    >
                      −
                    </button>
                    <span data-qty-value>{item.qty || 1}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.name, 1)}
                      title="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-item"
                    type="button"
                    title="Eliminar"
                    onClick={() => removeFromCart(item.name)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Resumen</h2>
              <div>
                <span>Subtotal</span>
                <strong id="subtotal">{formatMoney(subtotal)}</strong>
              </div>
              <div>
                <span>IVA (19%)</span>
                <strong id="tax">{formatMoney(tax)}</strong>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong id="total">{formatMoney(total)}</strong>
              </div>

              <button
                className="btn btn-primary full"
                id="checkoutBtn"
                type="button"
                onClick={handleCheckout}
              >
                Finalizar compra
              </button>
              <Link className="continue-link" to="/explorar">
                ← Seguir comprando
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}
