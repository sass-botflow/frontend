import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api, clearToken, getToken, setToken } from '../api/client'
import type { User } from '../api/types'
import { AuthContext } from './context'

const USER_KEY = 'botflow_user'

function loadStoredUser(): User | null {
  if (!getToken()) return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadStoredUser)
  const [loading] = useState(false)

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }, [user])

  async function login(email: string, password: string) {
    const res = await api.login(email, password)
    setToken(res.token)
    setUser(res.user)
  }

  async function register(email: string, name: string, password: string) {
    const res = await api.register(email, name, password)
    setToken(res.token)
    setUser(res.user)
  }

  function logout() {
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
