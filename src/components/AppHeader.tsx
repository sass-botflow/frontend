import { useAuth } from '../auth/useAuth'

export function AppHeader() {
  const { user, logout } = useAuth()
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark">◆</span>
        <span className="brand-name">Sass Botflow</span>
      </div>
      <div className="header-right">
        {user && <span className="muted">{user.email}</span>}
        <button className="btn btn-ghost" onClick={logout}>
          Sign out
        </button>
      </div>
    </header>
  )
}
