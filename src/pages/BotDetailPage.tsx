import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/client'
import type { Bot, Workflow, WorkflowStatus } from '../api/types'
import { AppHeader } from '../components/AppHeader'
import { StatusBadge } from '../components/StatusBadge'

const WF_STATUSES: WorkflowStatus[] = ['INACTIVE', 'ACTIVE', 'ERROR']

export function BotDetailPage() {
  const { botId } = useParams<{ botId: string }>()
  const [bot, setBot] = useState<Bot | null>(null)
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [trigger, setTrigger] = useState('')
  const [creating, setCreating] = useState(false)

  const refresh = useCallback(async () => {
    if (!botId) return
    try {
      const [b, wf] = await Promise.all([
        api.getBot(botId),
        api.listWorkflows(botId),
      ])
      setBot(b)
      setWorkflows(wf)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bot')
    } finally {
      setLoading(false)
    }
  }, [botId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    if (!botId || !name.trim() || !trigger.trim()) return
    setCreating(true)
    setError(null)
    try {
      await api.createWorkflow(botId, {
        name: name.trim(),
        trigger: trigger.trim(),
      })
      setName('')
      setTrigger('')
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workflow')
    } finally {
      setCreating(false)
    }
  }

  async function handleStatus(wf: Workflow, status: WorkflowStatus) {
    if (!botId) return
    try {
      await api.updateWorkflow(botId, wf.id, { status })
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workflow')
    }
  }

  async function handleDelete(wf: Workflow) {
    if (!botId) return
    if (!confirm(`Delete workflow "${wf.name}"?`)) return
    try {
      await api.deleteWorkflow(botId, wf.id)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workflow')
    }
  }

  return (
    <div className="page">
      <AppHeader />
      <main className="container">
        <Link to="/" className="back-link">
          ← Back to bots
        </Link>

        {loading ? (
          <p className="muted">Loading…</p>
        ) : !bot ? (
          <div className="alert">Bot not found.</div>
        ) : (
          <>
            <div className="detail-head">
              <div>
                <h1>{bot.name}</h1>
                <p className="muted">{bot.description || 'No description'}</p>
              </div>
              <StatusBadge status={bot.status} />
            </div>

            <section className="panel">
              <h2>Add a workflow</h2>
              <form className="row-form" onSubmit={handleCreate}>
                <input
                  type="text"
                  placeholder="Workflow name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Trigger (e.g. user.signup)"
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  required
                />
                <button className="btn btn-primary" disabled={creating}>
                  {creating ? 'Adding…' : 'Add workflow'}
                </button>
              </form>
            </section>

            {error && <div className="alert">{error}</div>}

            <div className="section-head">
              <h2>Workflows</h2>
              <span className="count-pill">{workflows.length}</span>
            </div>

            {workflows.length === 0 ? (
              <div className="empty">
                <p>No workflows yet. Add one above.</p>
              </div>
            ) : (
              <table className="wf-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Trigger</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {workflows.map((wf) => (
                    <tr key={wf.id}>
                      <td>{wf.name}</td>
                      <td>
                        <code>{wf.trigger}</code>
                      </td>
                      <td>
                        <select
                          value={wf.status}
                          onChange={(e) =>
                            handleStatus(wf, e.target.value as WorkflowStatus)
                          }
                        >
                          {WF_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="wf-actions">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(wf)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
    </div>
  )
}
