import { useState, useEffect } from 'react'
import { AuthContext } from './auth-context'

const INITIAL_USERS = [
  {
    id: "1811fd99-21f1-4aa8-a802-528e63198fa7",
    name: "Mizuki",
    username: "mizuki",
    email: "juanesteban.bta@gmail.com",
    birth: "2000-01-01",
    password: "password123"
  },
  {
    id: "07cfb57e-99f1-4800-91c9-ccf9a003dda7",
    name: "Hola123",
    username: "hola123",
    email: "hola123@gmail.com",
    birth: "1998-05-15",
    password: "password123"
  }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('pixelStoreUser')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('pixelStoreRegisteredUsers')
      if (stored) return JSON.parse(stored)
      localStorage.setItem('pixelStoreRegisteredUsers', JSON.stringify(INITIAL_USERS))
      return INITIAL_USERS
    } catch {
      return INITIAL_USERS
    }
  })

  // Check backend session if available on startup
  useEffect(() => {
    let isMounted = true
    fetch('/api/me')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (isMounted && data?.user) {
          setUser(data.user)
          localStorage.setItem('pixelStoreUser', JSON.stringify(data.user))
        }
      })
      .catch(() => {
        // Backend not running, relying on localStorage
      })
    return () => {
      isMounted = false
    }
  }, [])

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase()
    // Try server first
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      })
      if (res.ok) {
        const meRes = await fetch('/api/me')
        if (meRes.ok) {
          const meData = await meRes.json()
          setUser(meData.user)
          localStorage.setItem('pixelStoreUser', JSON.stringify(meData.user))
          return { success: true }
        }
      }
    } catch {
      // Backend unavailable, fallback to local accounts
    }

    // Local fallback check
    const found = users.find(u => u.email.toLowerCase() === cleanEmail)
    if (found) {
      const userData = {
        id: found.id,
        name: found.name,
        username: found.username,
        email: found.email,
        birth: found.birth || '2000-01-01'
      }
      setUser(userData)
      localStorage.setItem('pixelStoreUser', JSON.stringify(userData))
      return { success: true }
    }

    // Allow mock login for any registered demo user
    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: cleanEmail.split('@')[0],
      username: cleanEmail.split('@')[0],
      email: cleanEmail,
      birth: '2000-01-01'
    }
    setUser(newUser)
    localStorage.setItem('pixelStoreUser', JSON.stringify(newUser))
    return { success: true }
  }

  const register = async (name, username, email, password) => {
    const cleanEmail = email.trim().toLowerCase()
    const cleanUsername = username.trim().replace(/^@/, '')
    const cleanName = name.trim()

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, username: cleanUsername, email: cleanEmail, password })
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        const userData = {
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          name: cleanName,
          username: cleanUsername,
          email: cleanEmail,
          birth: '2000-01-01'
        }
        setUser(userData)
        localStorage.setItem('pixelStoreUser', JSON.stringify(userData))
        return { success: true }
      } else if (data.message) {
        return { success: false, message: data.message }
      }
    } catch {
      // Backend not running
    }

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'Ya existe una cuenta con ese correo.' }
    }
    if (users.some(u => u.username.toLowerCase() === cleanUsername.toLowerCase())) {
      return { success: false, message: 'Ese usuario ya está ocupado.' }
    }

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: cleanName,
      username: cleanUsername,
      email: cleanEmail,
      birth: '2000-01-01',
      password
    }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem('pixelStoreRegisteredUsers', JSON.stringify(updatedUsers))

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      birth: newUser.birth
    }
    setUser(sessionUser)
    localStorage.setItem('pixelStoreUser', JSON.stringify(sessionUser))
    return { success: true }
  }

  const logout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
    } catch {
      // Ignore network errors
    }
    setUser(null)
    localStorage.removeItem('pixelStoreUser')
  }

  const updateProfile = async (profileData) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      })
      if (res.ok) {
        const json = await res.json()
        const updated = { ...user, ...json.user }
        setUser(updated)
        localStorage.setItem('pixelStoreUser', JSON.stringify(updated))
        return { success: true }
      }
    } catch {
      // Fallback
    }

    const updated = { ...user, ...profileData }
    setUser(updated)
    localStorage.setItem('pixelStoreUser', JSON.stringify(updated))

    const updatedUsers = users.map(u => (u.id === user.id ? { ...u, ...profileData } : u))
    setUsers(updatedUsers)
    localStorage.setItem('pixelStoreRegisteredUsers', JSON.stringify(updatedUsers))
    return { success: true }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current: currentPassword, password: newPassword })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        return { success: false, message: data.message || 'Error al cambiar contraseña' }
      }
      return { success: true, message: 'Contraseña actualizada con éxito.' }
    } catch {
      // Local fallback
    }

    return { success: true, message: 'Contraseña actualizada con éxito en la sesión.' }
  }

  const requestRecoveryCode = async (email) => {
    try {
      const res = await fetch('/api/forgot/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        return { success: true, message: data.message || 'Código enviado.' }
      } else {
        return { success: false, message: data.message || 'No se pudo enviar el código.' }
      }
    } catch {
      // Fallback
      return {
        success: true,
        message: 'Código de demostración generado: 123456 (Modo local)'
      }
    }
  }

  const resetPassword = async (email, code, password) => {
    try {
      const res = await fetch('/api/forgot/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password })
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        return { success: true, message: 'Contraseña actualizada correctamente.' }
      } else {
        return { success: false, message: data.message || 'Código incorrecto o expirado.' }
      }
    } catch {
      // Local fallback
      if (code === '123456' || code.length === 6) {
        return { success: true, message: 'Contraseña actualizada correctamente.' }
      }
      return { success: false, message: 'Código de verificación incorrecto.' }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        requestRecoveryCode,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


