import { useState } from 'react'
import type { Section } from './types'
import { useTheme } from './hooks/useTheme'
import { useAddictions } from './hooks/useAddictions'
import { Nav } from './components/Nav'
import { ThemeToggle } from './components/ThemeToggle'
import { FocusTimer } from './components/FocusTimer/FocusTimer'
import { Addictions } from './components/Addictions/Addictions'
import { UsefulVideos } from './components/UsefulVideos/UsefulVideos'

function App() {
  const [section, setSection] = useState<Section>('timer')
  const { theme, toggleTheme } = useTheme()
  const { addictions, addAddiction, removeAddiction } = useAddictions()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center gap-10 px-6 py-10">
        <header className="flex w-full items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Focus Forge</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <Nav active={section} onChange={setSection} />

        <main className="flex w-full flex-1 flex-col items-center">
          {section === 'timer' && <FocusTimer addictions={addictions} />}
          {section === 'addictions' && (
            <Addictions addictions={addictions} onAdd={addAddiction} onRemove={removeAddiction} />
          )}
          {section === 'videos' && <UsefulVideos />}
        </main>
      </div>
    </div>
  )
}

export default App
