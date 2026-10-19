import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    const res = await login(email, password)
    setLoading(false)

    if (res.success) {
      const params = new URLSearchParams(location.search)
      const returnUrl = params.get('return') || '/'
      navigate(returnUrl)
    } else {
      setMessage(res.message || 'Correo o contraseña incorrectos.')
    }
  }

  return (
    <div className="auth-page">
      <Link className="auth-logo" to="/">
        <span className="brand-icon">
          <i className="fa-solid fa-gamepad"></i>
        </span>{' '}
        PIXEL STORE
      </Link>

      <section className="auth-card">
        <div className="auth-heading">
          <span className="eyebrow">BIENVENIDO</span>
          <h1>Iniciar sesión</h1>
          <p>Entra a tu cuenta de Pixel Store.</p>
        </div>

        <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>
          <label>
            Correo electrónico
            <input
              id="loginEmail"
              type="email"
              required
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Contraseña
            <div className="password-input">
              <input
                id="loginPassword"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Ocultar' : 'Mostrar'}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </label>

          <div className="auth-row">
            <label className="check">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{' '}
              Recordarme
            </label>
            <Link to="/olvidar">¿Olvidaste tu contraseña?</Link>
          </div>

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>

          {message && <p className="auth-message">{message}</p>}
        </form>

        <div className="auth-divider">
          <span>o continúa con</span>
        </div>

        <div className="social-buttons">
          <a className="btn btn-secondary" href="/auth/google">
            Google
          </a>
          <a className="btn btn-secondary" href="/auth/discord">
            Discord
          </a>
        </div>

        <p className="auth-switch">
          ¿No tienes cuenta? <Link to="/registrar">Crear cuenta</Link>
        </p>
        <Link className="back-home" to="/">
          ← Volver al inicio
        </Link>
      </section>
    </div>
  )
}
