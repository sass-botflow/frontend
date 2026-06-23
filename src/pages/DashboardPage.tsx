import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import type { Bot, BotStatus } from '../api/types'
import { AppHeader } from '../components/AppHeader'
import { StatusBadge } from '../components/StatusBadge'

const STATUSES: BotStatus[] = ['DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED']

export function DashboardPage() {
  const [bots, setBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [creating, setCreating] = useState(false)

  async function refresh() {
    try {
      setBots(await api.listBots())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bots')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setCreating(true)
    setError(null)
    try {
      await api.createBot({
        name: name.trim(),
        description: description.trim() || undefined,
      })
      setName('')
      setDescription('')
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create bot')
    } finally {
      setCreating(false)
    }
  }

  async function handleStatusChange(bot: Bot, status: BotStatus) {
    setBots((prev) =>
      prev.map((b) => (b.id === bot.id ? { ...b, status } : b)),
    )
    try {
      await api.updateBot(bot.id, { status })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update bot')
      await refresh()
    }
  }

  async function handleDelete(bot: Bot) {
    if (!confirm(`Delete bot "${bot.name}"? This cannot be undone.`)) return
    try {
      await api.deleteBot(bot.id)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete bot')
    }
  }

  return (
    <div className="page">
      <AppHeader />
      <main className="container">
        <section className="panel">
          <h2>Create a bot</h2>
          <form className="row-form" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Bot name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="btn btn-primary" disabled={creating}>
              {creating ? 'Creating…' : 'Add bot'}
            </button>
          </form>
        </section>

        {error && <div className="alert">{error}</div>}

        <section>
          <div className="section-head">
            <h2>Your bots</h2>
            <span className="count-pill">{bots.length}</span>
          </div>

          {loading ? (
            <p className="muted">Loading…</p>
          ) : bots.length === 0 ? (
            <div className="empty">
              <p>No bots yet. Create your first one above.</p>
            </div>
          ) : (
            <div className="bot-grid">
              {bots.map((bot) => (
                <article className="bot-card" key={bot.id}>
                  <div className="bot-card-head">
                    <Link to={`/bots/${bot.id}`} className="bot-name">
                      {bot.name}
                    </Link>
                    <StatusBadge status={bot.status} />
                  </div>
                  <p className="muted bot-desc">
                    {bot.description || 'No description'}
                  </p>
                  <div className="bot-meta">
                    <span>{bot.workflows?.length ?? 0} workflow(s)</span>
                  </div>
                  <div className="bot-actions">
                    <select
                      value={bot.status}
                      onChange={(e) =>
                        handleStatusChange(bot, e.target.value as BotStatus)
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <Link className="btn btn-ghost" to={`/bots/${bot.id}`}>
                      Open
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(bot)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
