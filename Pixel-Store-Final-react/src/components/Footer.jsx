import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Footer() {
  const { isAuthenticated } = useAuth()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-icon">
              <i className="fa-solid fa-gamepad"></i>
            </span>
            <span>PIXEL STORE</span>
          </div>
          <p>Tu espacio para descubrir, comprar y disfrutar videojuegos.</p>
        </div>

        <div className="footer-column">
          <h4>Explorar</h4>
          <Link to="/">Inicio</Link>
          <Link to="/explorar">Explorar</Link>
          <Link to="/ofertas">Ofertas</Link>
        </div>

        <div className="footer-column">
          <h4>Plataformas</h4>
          <Link to="/play">PlayStation</Link>
          <Link to="/xbox">Xbox</Link>
          <Link to="/nintendo">Nintendo</Link>
        </div>

        <div className="footer-column">
          <h4>Cuenta</h4>
          <Link to={isAuthenticated ? '/perfil' : '/iniciar'}>Mi perfil</Link>
          <Link to="/carrito">Carrito</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Pixel Store</span>
        <span>Hecho para nuestro proyecto escolar</span>
      </div>
    </footer>
  )
}
