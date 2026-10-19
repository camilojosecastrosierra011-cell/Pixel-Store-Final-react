import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Profile() {
  const { user, isAuthenticated, logout, updateProfile, changePassword } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('account')
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  // Profile form state initialized directly from user prop
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    birth: user?.birth || '2000-01-01'
  })
  const [profileMessage, setProfileMessage] = useState('')

  // Password form state
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')

  // Notifications switch
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/iniciar?return=perfil')
    }
  }, [isAuthenticated, navigate])

  const startEditing = () => {
    setFormData({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      birth: user?.birth || '2000-01-01'
    })
    setIsEditing(true)
    setProfileMessage('')
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setProfileMessage('')
    const res = await updateProfile(formData)
    if (res.success) {
      setProfileMessage('Datos guardados correctamente.')
      setIsEditing(false)
    } else {
      setProfileMessage(res.message || 'No se pudo guardar.')
    }
  }

  const handleCancelProfile = () => {
    setFormData({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      birth: user?.birth || '2000-01-01'
    })
    setIsEditing(false)
    setProfileMessage('')
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordMessage('')

    if (newPw !== confirmPw) {
      setPasswordMessage('Las contraseñas no coinciden.')
      return
    }

    const res = await changePassword(currentPw, newPw)
    setPasswordMessage(res.message || '')
    if (res.success) {
      setCurrentPw('')
      setNewPw('')
      setConfirmPw('')
      setShowPasswordForm(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const displayName = isEditing ? formData.name : user?.name || 'Usuario Pixel'
  const displayUsername = isEditing ? formData.username : user?.username || 'usuario'
  const displayEmail = isEditing ? formData.email : user?.email || 'correo@ejemplo.com'
  const displayBirth = isEditing ? formData.birth : user?.birth || '2000-01-01'

  const avatarInitial = displayName.charAt(0).toUpperCase()

  return (
    <main>
      <section className="profile-page">
        <div className="profile-heading">
          <span className="eyebrow">CUENTA</span>
          <h1>Mi perfil</h1>
          <p>Administra tus datos, seguridad y pedidos desde un solo lugar.</p>
        </div>

        <div className="profile-layout">
          <aside className="profile-sidebar">
            <div className="profile-card-mini">
              <div className="avatar" id="profileAvatar">
                {avatarInitial}
              </div>
              <div>
                <strong id="sidebarName">{displayName}</strong>
                <span id="sidebarUser">@{displayUsername}</span>
              </div>
            </div>

            <button
              className={`profile-tab ${activeTab === 'account' ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab('account')}
            >
              <i className="fa-solid fa-user"></i> Información
            </button>

            <button
              className={`profile-tab ${activeTab === 'security' ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab('security')}
            >
              <i className="fa-solid fa-shield-halved"></i> Seguridad
            </button>

            <button
              className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab('orders')}
            >
              <i className="fa-solid fa-bag-shopping"></i> Pedidos
            </button>

            <button
              className={`profile-tab ${activeTab === 'favorites' ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab('favorites')}
            >
              <i className="fa-solid fa-heart"></i> Favoritos
            </button>

            <button className="profile-logout" type="button" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
            </button>
          </aside>

          <div className="profile-content">
            {/* TAB: ACCOUNT */}
            <section
              className={`profile-panel ${activeTab === 'account' ? 'active' : ''}`}
            >
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">DATOS PERSONALES</span>
                  <h2>Información de cuenta</h2>
                </div>
                {!isEditing && (
                  <button
                    className="btn btn-secondary"
                    id="editProfileBtn"
                    type="button"
                    onClick={startEditing}
                  >
                    Editar
                  </button>
                )}
              </div>

              <form id="profileForm" className="profile-form" onSubmit={handleSaveProfile}>
                <label>
                  Nombre completo
                  <input
                    id="profileName"
                    value={isEditing ? formData.name : displayName}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Nombre de usuario
                  <input
                    id="profileUsername"
                    value={isEditing ? formData.username : displayUsername}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Correo electrónico
                  <input
                    id="profileEmail"
                    type="email"
                    value={isEditing ? formData.email : displayEmail}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Fecha de nacimiento
                  <input
                    id="profileBirth"
                    type="date"
                    value={isEditing ? formData.birth : displayBirth}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
                  />
                </label>

                {isEditing && (
                  <div className="form-actions" id="profileActions">
                    <button type="submit" className="btn btn-primary">
                      Guardar cambios
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      id="cancelProfile"
                      onClick={handleCancelProfile}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </form>

              {profileMessage && <p className="save-message">{profileMessage}</p>}
            </section>

            {/* TAB: SECURITY */}
            <section
              className={`profile-panel ${activeTab === 'security' ? 'active' : ''}`}
            >
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">SEGURIDAD</span>
                  <h2>Protege tu cuenta</h2>
                </div>
              </div>

              <div className="security-list">
                <div className="security-item">
                  <span className="security-icon">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <div>
                    <strong>Contraseña</strong>
                    <p>Actualiza tu contraseña periódicamente.</p>
                  </div>
                  <button
                    className="btn btn-secondary"
                    id="changePasswordBtn"
                    type="button"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                  >
                    {showPasswordForm ? 'Ocultar' : 'Cambiar'}
                  </button>
                </div>

                <div className="security-item">
                  <span className="security-icon">
                    <i className="fa-solid fa-bell"></i>
                  </span>
                  <div>
                    <strong>Notificaciones</strong>
                    <p>Recibe avisos sobre pedidos y promociones.</p>
                  </div>
                  <label className="switch">
                    <input
                      id="notificationsToggle"
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    />
                    <span></span>
                  </label>
                </div>
              </div>

              {showPasswordForm && (
                <form id="passwordForm" className="password-form" onSubmit={handleChangePassword}>
                  <label>
                    Contraseña actual (opcional)
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                    />
                  </label>

                  <label>
                    Nueva contraseña
                    <div className="password-input">
                      <input
                        id="newPassword"
                        type={showNewPw ? 'text' : 'password'}
                        minLength={6}
                        required
                        placeholder="Mínimo 6 caracteres"
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPw(!showNewPw)}
                      >
                        <i className={`fa-solid ${showNewPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </label>

                  <label>
                    Confirmar contraseña
                    <div className="password-input">
                      <input
                        id="confirmPassword"
                        type={showConfirmPw ? 'text' : 'password'}
                        minLength={6}
                        required
                        placeholder="Repite la nueva contraseña"
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPw(!showConfirmPw)}
                      >
                        <i className={`fa-solid ${showConfirmPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </label>

                  <button className="btn btn-primary" type="submit">
                    Actualizar contraseña
                  </button>

                  {passwordMessage && <p className="save-message">{passwordMessage}</p>}
                </form>
              )}
            </section>

            {/* TAB: ORDERS */}
            <section
              className={`profile-panel ${activeTab === 'orders' ? 'active' : ''}`}
            >
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">HISTORIAL</span>
                  <h2>Mis pedidos</h2>
                </div>
              </div>
              <div className="empty-state">
                <i className="fa-solid fa-box-open"></i>
                <h3>Aún no tienes pedidos</h3>
                <p>Cuando realices una compra aparecerá aquí.</p>
                <Link className="btn btn-primary" to="/explorar">
                  Explorar juegos
                </Link>
              </div>
            </section>

            {/* TAB: FAVORITES */}
            <section
              className={`profile-panel ${activeTab === 'favorites' ? 'active' : ''}`}
            >
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">GUARDADOS</span>
                  <h2>Mis favoritos</h2>
                </div>
              </div>
              <div className="empty-state">
                <i className="fa-solid fa-heart"></i>
                <h3>Tu lista está vacía</h3>
                <p>Pulsa el corazón en un juego para guardarlo.</p>
                <Link className="btn btn-primary" to="/explorar">
                  Ver catálogo
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
