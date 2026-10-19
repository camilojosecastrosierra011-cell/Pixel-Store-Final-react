import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProfilePrueba() {
  const [data, setData] = useState({
    nombre: 'Juan David Coll Velez',
    usuario: '@juandavid',
    correo: 'juandavid@gmail.com',
    telefono: '+57 300 123 4567',
    ciudad: 'Bogotá, Colombia'
  })

  const [editingField, setEditingField] = useState(null)

  const toggleEdit = (field) => {
    setEditingField(editingField === field ? null : field)
  }

  const handleChange = (field, val) => {
    setData(prev => ({ ...prev, [field]: val }))
  }

  return (
    <main className="profile-container">
      <div className="profile-title">
        <div className="profile-avatar-box">
          <i className="fa-solid fa-user"></i>
        </div>
        <div>
          <h1>Mi Perfil</h1>
          <p>Administra la información de tu cuenta.</p>
        </div>
      </div>

      <section className="profile-card">
        <div className="card-header">
          <div>
            <h2>Información personal</h2>
            <p>Consulta y modifica tus datos personales.</p>
          </div>
        </div>

        {/* NOMBRE */}
        <div className="data-row">
          <div className="data-icon">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="data-content">
            <span>Nombre completo</span>
            <input
              type="text"
              id="nombre"
              value={data.nombre}
              disabled={editingField !== 'nombre'}
              onChange={(e) => handleChange('nombre', e.target.value)}
            />
          </div>
          <button
            className="edit-btn"
            type="button"
            onClick={() => toggleEdit('nombre')}
            title="Editar nombre"
          >
            <i className={`fa-solid ${editingField === 'nombre' ? 'fa-check' : 'fa-pen'}`}></i>
          </button>
        </div>

        {/* USUARIO */}
        <div className="data-row">
          <div className="data-icon">
            <i className="fa-solid fa-at"></i>
          </div>
          <div className="data-content">
            <span>Nombre de usuario</span>
            <input
              type="text"
              id="usuario"
              value={data.usuario}
              disabled={editingField !== 'usuario'}
              onChange={(e) => handleChange('usuario', e.target.value)}
            />
          </div>
          <button
            className="edit-btn"
            type="button"
            onClick={() => toggleEdit('usuario')}
            title="Editar usuario"
          >
            <i className={`fa-solid ${editingField === 'usuario' ? 'fa-check' : 'fa-pen'}`}></i>
          </button>
        </div>

        {/* CORREO */}
        <div className="data-row">
          <div className="data-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="data-content">
            <span>Correo electrónico</span>
            <input
              type="email"
              id="correo"
              value={data.correo}
              disabled={editingField !== 'correo'}
              onChange={(e) => handleChange('correo', e.target.value)}
            />
          </div>
          <button
            className="edit-btn"
            type="button"
            onClick={() => toggleEdit('correo')}
            title="Editar correo"
          >
            <i className={`fa-solid ${editingField === 'correo' ? 'fa-check' : 'fa-pen'}`}></i>
          </button>
        </div>

        {/* TELEFONO */}
        <div className="data-row">
          <div className="data-icon">
            <i className="fa-solid fa-phone"></i>
          </div>
          <div className="data-content">
            <span>Número de teléfono</span>
            <input
              type="text"
              id="telefono"
              value={data.telefono}
              disabled={editingField !== 'telefono'}
              onChange={(e) => handleChange('telefono', e.target.value)}
            />
          </div>
          <button
            className="edit-btn"
            type="button"
            onClick={() => toggleEdit('telefono')}
            title="Editar teléfono"
          >
            <i className={`fa-solid ${editingField === 'telefono' ? 'fa-check' : 'fa-pen'}`}></i>
          </button>
        </div>

        {/* CIUDAD */}
        <div className="data-row">
          <div className="data-icon">
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div className="data-content">
            <span>Ciudad</span>
            <input
              type="text"
              id="ciudad"
              value={data.ciudad}
              disabled={editingField !== 'ciudad'}
              onChange={(e) => handleChange('ciudad', e.target.value)}
            />
          </div>
          <button
            className="edit-btn"
            type="button"
            onClick={() => toggleEdit('ciudad')}
            title="Editar ciudad"
          >
            <i className={`fa-solid ${editingField === 'ciudad' ? 'fa-check' : 'fa-pen'}`}></i>
          </button>
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link className="continue-link" to="/perfil">
          ← Ir a la vista principal de perfil
        </Link>
      </div>
    </main>
  )
}
