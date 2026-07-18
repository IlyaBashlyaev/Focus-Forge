import type { Section } from '../types'

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'timer', label: 'Focus Timer' },
  { id: 'addictions', label: 'Addictions' },
  { id: 'videos', label: 'Useful Videos' },
]

interface NavProps {
  active: Section
  onChange: (section: Section) => void
}

export function Nav({ active, onChange }: NavProps) {
  return (
    <nav className="flex gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onChange(section.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            active === section.id
              ? 'bg-blue-600 text-white shadow'
              : 'text-slate-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}
