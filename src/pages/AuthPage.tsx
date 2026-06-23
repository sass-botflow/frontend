import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

interface Props {
  mode: 'login' | 'register'
}

export function AuthPage({ mode }: Props) {
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const isRegister = mode === 'register'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (isRegister) {
        await register(email, name, password)
      } else {
        await login(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="brand">
          <span className="brand-mark">◆</span>
          <span className="brand-name">Sass Botflow</span>
        </div>
        <h1>{isRegister ? 'Create your account' : 'Welcome back'}</h1>
        <p className="muted">
          {isRegister
            ? 'Start building automation bots in minutes.'
            : 'Sign in to manage your bots and workflows.'}
        </p>

        <form onSubmit={handleSubmit} className="form">
          {isRegister && (
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                required
              />
            </label>
          )}
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegister ? 'At least 8 characters' : '••••••••'}
              minLength={isRegister ? 8 : undefined}
              required
            />
          </label>

          {error && <div className="alert">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting
              ? 'Please wait…'
              : isRegister
                ? 'Create account'
                : 'Sign in'}
          </button>
        </form>

        <p className="switch">
          {isRegister ? (
            <>
              Already have an account? <Link to="/login">Sign in</Link>
            </>
          ) : (
            <>
              New to Botflow? <Link to="/register">Create one</Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
