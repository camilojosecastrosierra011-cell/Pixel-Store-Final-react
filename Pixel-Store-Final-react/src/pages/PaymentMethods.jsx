import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState('bancolombia')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const { total, formatMoney, clearCart } = useCart()
  const navigate = useNavigate()

  const methods = [
    { id: 'bancolombia', name: 'Bancolombia', img: '/bancolombia.jpg' },
    { id: 'nequi', name: 'Nequi', img: '/NEQUI-LOGO.jpg' },
    { id: 'paypal', name: 'PayPal', img: '/Paypal_2014_logo.png' },
    { id: 'mastercard', name: 'Mastercard', img: '/Mastercard.jpg' }
  ]

  const handleConfirmPayment = (e) => {
    e.preventDefault()
    setIsSuccessModalOpen(true)
    clearCart()
  }

  const handleFinish = () => {
    setIsSuccessModalOpen(false)
    navigate('/perfil')
  }

  return (
    <main className="payment-section">
      <section className="payment-header">
        <span className="small-title">PIXEL STORE</span>
        <h1>Métodos de pago</h1>
        <p>Selecciona el método con el que quieres completar tu compra.</p>
        {total > 0 && (
          <p style={{ marginTop: '10px', color: '#ff6577', fontWeight: '700', fontSize: '18px' }}>
            Total a pagar: {formatMoney(total)}
          </p>
        )}
      </section>

      <section className="payment-container">
        <form onSubmit={handleConfirmPayment}>
          <div className="payment-grid">
            {methods.map((method) => (
              <div key={method.id} style={{ position: 'relative' }}>
                <input
                  type="radio"
                  name="metodo-pago"
                  id={method.id}
                  className="payment-radio"
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                />
                <label htmlFor={method.id} className="payment-method">
                  <img src={method.img} alt={method.name} />
                  <span className="check-badge" aria-hidden="true">
                    <i className="fa-solid fa-check"></i>
                  </span>
                </label>
              </div>
            ))}
          </div>

          <div className="payment-actions">
            <button className="btn btn-primary" type="submit" style={{ minWidth: '220px', padding: '14px 24px', fontSize: '15px' }}>
              Confirmar pago con {methods.find(m => m.id === selectedMethod)?.name}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link className="continue-link" to="/carrito">
            ← Volver al carrito
          </Link>
        </div>
      </section>

      {/* Confirmation Modal */}
      {isSuccessModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#111116',
              border: '1px solid var(--red)',
              borderRadius: '20px',
              padding: '35px 25px',
              maxWidth: '450px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(255, 31, 61, 0.2)'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--red), #8c0922)',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 20px',
                fontSize: '24px',
                color: '#fff'
              }}
            >
              <i className="fa-solid fa-check"></i>
            </div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>¡Compra exitosa!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              Tu pago ha sido procesado mediante <strong>{methods.find(m => m.id === selectedMethod)?.name}</strong> en esta demostración.
              ¡Gracias por elegir Pixel Store!
            </p>
            <button
              type="button"
              className="btn btn-primary full"
              onClick={handleFinish}
            >
              Ir a mi perfil
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
