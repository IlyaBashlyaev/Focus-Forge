export type Section = 'timer' | 'addictions' | 'videos'

export type Theme = 'light' | 'dark'

export interface Addiction {
  id: string
  name: string
}

export interface Video {
  name: string
  link: string
}
