import { useEffect, useState } from 'react'

const PREFIX = 'score:'

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* storage full or blocked — app still works, just won't remember */
  }
}

/** useState that persists to localStorage. */
export function useStored(key, initial) {
  const [value, setValue] = useState(() => load(key, typeof initial === 'function' ? initial() : initial))
  useEffect(() => save(key, value), [key, value])
  return [value, setValue]
}

export const buzz = (ms = 12) => {
  try { navigator.vibrate?.(ms) } catch { /* not supported */ }
}
