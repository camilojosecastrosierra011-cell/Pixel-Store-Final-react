import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ForgotPassword() {
  const [stage, setStage] = useState(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { requestRecoveryCode, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (stage === 1) {
      setLoading(true)
      const res = await requestRecoveryCode(email)
      setLoading(false)
      setMessage(res.message || '')
      if (res.success) {
        setStage(2)
      }
    } else {
      if (password !== confirm) {
        setMessage('Las contraseñas no coinciden.')
        return
      }
      setLoading(true)
      const res = await resetPassword(email, code, password)
      setLoading(false)
      setMessage(res.message || '')
      if (res.success) {
        setTimeout(() => {
          navigate('/iniciar')
        }, 1200)
      }
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
          <span className="eyebrow">SEGURIDAD</span>
          <h1>Recuperar contraseña</h1>
          <p>Solicita un código y crea una nueva contraseña.</p>
        </div>

        <form id="forgotForm" className="auth-form" onSubmit={handleSubmit}>
          <label>
            Correo electrónico
            <input
              id="forgotEmail"
              type="email"
              required
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={stage === 2}
            />
          </label>

          {stage === 2 && (
            <>
              <label>
                Código de verificación
                <input
                  id="forgotCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </label>

              <label>
                Nueva contraseña
                <input
                  id="forgotPassword"
                  type="password"
                  minLength={6}
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <label>
                Confirmar contraseña
                <input
                  id="forgotConfirm"
                  type="password"
                  required
                  placeholder="Repite la nueva contraseña"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </label>
            </>
          )}

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading
              ? 'Procesando...'
              : stage === 1
              ? 'Enviar código'
              : 'Cambiar contraseña'}
          </button>

          {message && <p className="auth-message">{message}</p>}
        </form>

        <p className="auth-switch">
          <Link to="/iniciar">Volver a iniciar sesión</Link>
        </p>
        <Link className="back-home" to="/">
          ← Volver al inicio
        </Link>
      </section>
    </div>
  )
}
