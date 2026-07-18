import { useEffect, useRef, useState } from 'react'
import type { Addiction } from '../../types'
import { CircularProgress } from './CircularProgress'

interface FocusTimerProps {
  addictions: Addiction[]
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function FocusTimer({ addictions }: FocusTimerProps) {
  const [minutesInput, setMinutesInput] = useState(1)
  const [secondsInput, setSecondsInput] = useState(0)
  const [addictionId, setAddictionId] = useState(addictions[0]?.id ?? '')

  const [totalSeconds, setTotalSeconds] = useState(minutesInput * 60 + secondsInput)
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const intervalRef = useRef<number | undefined>(undefined)
  const finishSoundRef = useRef<HTMLAudioElement | null>(null)

  if (finishSoundRef.current === null) {
    finishSoundRef.current = new Audio('/sounds/timer_finish.wav')
  }

  const selectedAddictionId = addictions.some((addiction) => addiction.id === addictionId)
    ? addictionId
    : (addictions[0]?.id ?? '')

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(intervalRef.current)
          setIsRunning(false)
          setIsComplete(true)
          finishSoundRef.current?.play().catch(() => {})
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalRef.current)
  }, [isRunning])

  const handleStart = () => {
    if (remainingSeconds === 0) return
    setIsComplete(false)
    setIsRunning(true)
  }

  const handlePause = () => setIsRunning(false)

  const handleReset = () => {
    setIsRunning(false)
    setIsComplete(false)
    if (finishSoundRef.current) {
      finishSoundRef.current.pause()
      finishSoundRef.current.currentTime = 0
    }
    setRemainingSeconds(totalSeconds)
  }

  const handleTimeChange = (minutes: number, seconds: number) => {
    const clampedMinutes = Math.min(99, Math.max(0, minutes))
    const clampedSeconds = Math.min(59, Math.max(0, seconds))
    const nextTotal = clampedMinutes * 60 + clampedSeconds
    setMinutesInput(clampedMinutes)
    setSecondsInput(clampedSeconds)
    setTotalSeconds(nextTotal)
    setRemainingSeconds(nextTotal)
    setIsRunning(false)
    setIsComplete(false)
  }

  const progress = totalSeconds === 0 ? 0 : (totalSeconds - remainingSeconds) / totalSeconds
  const selectedAddiction = addictions.find((addiction) => addiction.id === selectedAddictionId)

  return (
    <div className="flex flex-col items-center gap-10">
      <CircularProgress progress={progress}>
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-5xl font-semibold tabular-nums text-slate-900 dark:text-slate-50">
            {formatTime(remainingSeconds)}
          </span>
          {selectedAddiction && (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              resisting {selectedAddiction.name}
            </span>
          )}
          {isComplete && (
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Loop broken. Well done.
            </span>
          )}
        </div>
      </CircularProgress>

      <div className="grid w-full max-w-sm grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
          Focus time (min)
          <input
            type="number"
            min={0}
            max={99}
            value={minutesInput}
            disabled={isRunning}
            onChange={(event) => handleTimeChange(Number(event.target.value), secondsInput)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
          Focus time (sec)
          <input
            type="number"
            min={0}
            max={59}
            value={secondsInput}
            disabled={isRunning}
            onChange={(event) => handleTimeChange(minutesInput, Number(event.target.value))}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
          />
        </label>
        <label className="col-span-2 flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
          Addiction to be prevented
          <select
            value={selectedAddictionId}
            disabled={isRunning}
            onChange={(event) => setAddictionId(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
          >
            {addictions.length === 0 && <option value="">Add an addiction first</option>}
            {addictions.map((addiction) => (
              <option key={addiction.id} value={addiction.id}>
                {addiction.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex gap-3">
        {!isRunning ? (
          <button
            type="button"
            onClick={handleStart}
            disabled={totalSeconds === 0}
            className="rounded-full bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            className="rounded-full bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Pause
          </button>
        )}
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-slate-300 px-6 py-2 font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
