import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Register() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.')
      return
    }

    if (!termsAccepted) {
      setMessage('Debes aceptar los términos y condiciones.')
      return
    }

    setLoading(true)
    const res = await register(name, username, email, password)
    setLoading(false)

    if (res.success) {
      navigate('/')
    } else {
      setMessage(res.message || 'Error al registrar la cuenta.')
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
          <span className="eyebrow">PIXEL STORE</span>
          <h1>Crear cuenta</h1>
          <p>Regístrate para guardar tus compras y favoritos.</p>
        </div>

        <form id="registerForm" className="auth-form" onSubmit={handleSubmit}>
          <label>
            Nombre completo
            <input
              id="registerName"
              required
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Nombre de usuario
            <input
              id="registerUsername"
              required
              placeholder="@usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Correo electrónico
            <input
              id="registerEmail"
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
                id="registerPassword"
                type={showPassword ? 'text' : 'password'}
                minLength={6}
                required
                placeholder="Mínimo 6 caracteres"
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

          <label>
            Confirmar contraseña
            <div className="password-input">
              <input
                id="registerConfirm"
                type={showConfirm ? 'text' : 'password'}
                required
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                title={showConfirm ? 'Ocultar' : 'Mostrar'}
              >
                <i className={`fa-solid ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </label>

          <label className="check terms">
            <input
              id="terms"
              type="checkbox"
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />{' '}
            Acepto los términos y condiciones.
          </label>

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          {message && <p className="auth-message">{message}</p>}
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link to="/iniciar">Iniciar sesión</Link>
        </p>
        <Link className="back-home" to="/">
          ← Volver al inicio
        </Link>
      </section>
    </div>
  )
}
