import { useState } from 'react'
import type { Addiction } from '../../types'

interface AddictionsProps {
  addictions: Addiction[]
  onAdd: (name: string) => void
  onRemove: (id: string) => void
}

export function Addictions({ addictions, onAdd, onRemove }: AddictionsProps) {
  const [name, setName] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onAdd(name)
    setName('')
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Doomscrolling"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {addictions.map((addiction) => (
          <li
            key={addiction.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="text-slate-800 dark:text-slate-100">{addiction.name}</span>
            <button
              type="button"
              onClick={() => onRemove(addiction.id)}
              aria-label={`Remove ${addiction.name}`}
              className="text-slate-400 transition hover:text-red-500"
            >
              &times;
            </button>
          </li>
        ))}
        {addictions.length === 0 && (
          <li className="rounded-lg border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-400 dark:border-slate-600">
            No addictions tracked yet.
          </li>
        )}
      </ul>
    </div>
  )
}
