import { useLocalStorage } from './useLocalStorage'
import type { Addiction } from '../types'

const ADDICTIONS_KEY = 'focus-forge-addictions'

const DEFAULT_ADDICTIONS: Addiction[] = [
  { id: 'social-media', name: 'Social Media' },
  { id: 'video-games', name: 'Video Games' }
]

export function useAddictions() {
  const [addictions, setAddictions] = useLocalStorage<Addiction[]>(
    ADDICTIONS_KEY,
    DEFAULT_ADDICTIONS,
  )

  const addAddiction = (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const alreadyExists = addictions.some(
      (addiction) => addiction.name.toLowerCase() === trimmed.toLowerCase(),
    )
    if (alreadyExists) return
    setAddictions((current) => [...current, { id: crypto.randomUUID(), name: trimmed }])
  }

  const removeAddiction = (id: string) => {
    setAddictions((current) => current.filter((addiction) => addiction.id !== id))
  }

  return { addictions, addAddiction, removeAddiction }
}
