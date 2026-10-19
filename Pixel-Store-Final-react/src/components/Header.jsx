import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'

export default function Header() {
  const { isAuthenticated, user } = useAuth()
  const { cartCount } = useCart()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState(() => {
    return new URLSearchParams(location.search).get('q') || ''
  })

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const q = searchTerm.trim()
      navigate(`/explorar${q ? `?q=${encodeURIComponent(q)}` : ''}`)
    }
  }

  const isInicio = location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '/indexiniciada.html'
  const isExplorar = location.pathname.startsWith('/explorar')
  const isOfertas = location.pathname.startsWith('/ofertas')
  const isPlatformActive = ['/play', '/play.html', '/playiniciada.html', '/xbox', '/xbox.html', '/xboxiniciada.html', '/nintendo', '/Nintendo.html', '/Nintendoiniciada.html'].some(p => location.pathname.toLowerCase().startsWith(p.toLowerCase()))

  const closeDropdown = () => setDropdownOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" onClick={closeDropdown}>
          <span className="brand-icon">
            <i className="fa-solid fa-gamepad"></i>
          </span>
          <span>PIXEL STORE</span>
        </Link>

        <nav className="main-nav">
          <Link to="/" className={isInicio ? 'active' : ''} onClick={closeDropdown}>
            Inicio
          </Link>
          <Link to="/explorar" className={isExplorar ? 'active' : ''} onClick={closeDropdown}>
            Explorar
          </Link>
          <Link to="/ofertas" className={isOfertas ? 'active' : ''} onClick={closeDropdown}>
            Ofertas
          </Link>

          <div
            className={`category-dropdown ${dropdownOpen ? 'open' : ''}`}
            ref={dropdownRef}
          >
            <button
              className={`category-trigger ${isPlatformActive ? 'active' : ''}`}
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Plataformas <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className="category-menu">
              <Link to="/play" onClick={closeDropdown}>
                <i className="fa-brands fa-playstation"></i>
                <span>PlayStation</span>
              </Link>
              <Link to="/xbox" onClick={closeDropdown}>
                <i className="fa-brands fa-xbox"></i>
                <span>Xbox</span>
              </Link>
              <Link to="/nintendo" onClick={closeDropdown}>
                <i className="fa-solid fa-gamepad"></i>
                <span>Nintendo</span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder="Buscar juegos..."
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </div>

          <Link className="header-icon cart-link" to="/carrito" title="Carrito" onClick={closeDropdown}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-count">{cartCount}</span>
          </Link>

          {isAuthenticated ? (
            <Link
              className="header-icon profile-link"
              to="/perfil"
              title={user?.name ? `Perfil de ${user.name}` : 'Mi perfil'}
              onClick={closeDropdown}
            >
              <i className="fa-solid fa-user"></i>
            </Link>
          ) : (
            <Link className="login-btn" to="/iniciar" onClick={closeDropdown}>
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
