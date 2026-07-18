import { useEffect, useState } from 'react'
import type { Video } from '../../types'

const CONSENT_KEY = 'focus-forge-youtube-consent'

function getEmbedUrl(link: string) {
  const url = new URL(link)
  const videoId = url.searchParams.get('v')
  return `https://www.youtube.com/embed/${videoId}`
}

export function UsefulVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [expandedLink, setExpandedLink] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [youtubeAllowed, setYoutubeAllowed] = useState(false)

  useEffect(() => {
    setYoutubeAllowed(localStorage.getItem(CONSENT_KEY) === 'true')
  }, [])

  useEffect(() => {
    fetch('/json/videos.json')
      .then((response) => response.json())
      .then((data: Video[]) => setVideos(data))
      .catch(() => setError(true))
  }, [])

  const toggle = (link: string) => {
    setExpandedLink((current) => (current === link ? null : link))
  }

  const handleConsentChange = (checked: boolean) => {
    setYoutubeAllowed(checked)
    localStorage.setItem(CONSENT_KEY, String(checked))
    if (!checked) setExpandedLink(null)
  }

  if (error) {
    return <p className="text-sm text-red-500">Could not load the video list.</p>
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <ul className="flex w-full flex-col gap-2">
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
                youtubeAllowed ? (
                  <div className="aspect-video w-full">
                    <iframe
                      src={getEmbedUrl(video.link)}
                      title={video.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 border-t border-slate-200 px-4 py-3 dark:border-slate-700">
                    <svg className="h-4 w-4 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-500">
                      YouTube is blocked. Enable the toggle below to load videos.
                    </p>
                  </div>
                )
              )}
            </li>
          )
        })}
      </ul>

      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          Allow Focus Forge to load the YouTube videos
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={youtubeAllowed}
          onClick={() => handleConsentChange(!youtubeAllowed)}
          className={`relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            youtubeAllowed ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-[27px] w-[27px] rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
              youtubeAllowed ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
