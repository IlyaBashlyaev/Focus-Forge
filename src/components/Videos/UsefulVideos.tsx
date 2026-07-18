import { useEffect, useState } from 'react'
import type { Video } from '../../types'

function getEmbedUrl(link: string) {
  const url = new URL(link)
  const videoId = url.searchParams.get('v')
  return `https://www.youtube.com/embed/${videoId}`
}

export function UsefulVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [expandedLink, setExpandedLink] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/json/videos.json')
      .then((response) => response.json())
      .then((data: Video[]) => setVideos(data))
      .catch(() => setError(true))
  }, [])

  const toggle = (link: string) => {
    setExpandedLink((current) => (current === link ? null : link))
  }

  if (error) {
    return <p className="text-sm text-red-500">Could not load the video list.</p>
  }

  return (
    <ul className="flex w-full max-w-2xl flex-col gap-2">
      {videos.map((video) => {
        const isExpanded = expandedLink === video.link
        return (
          <li
            key={video.link}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              type="button"
              onClick={() => toggle(video.link)}
              aria-expanded={isExpanded}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-slate-800 transition hover:bg-blue-50 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <span>{video.name}</span>
              <span className={`shrink-0 text-blue-600 transition-transform dark:text-blue-400 ${isExpanded ? 'rotate-180' : ''}`}>
                &#9662;
              </span>
            </button>
            {isExpanded && (
              <div className="aspect-video w-full">
                <iframe
                  src={getEmbedUrl(video.link)}
                  title={video.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
