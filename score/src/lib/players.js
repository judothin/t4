import { load, save } from './storage.js'

// Player colors. Deliberately no pure yellow/red so they never read as cards.
export const PALETTE = [
  { id: 'mint', hex: '#3dffb5' },
  { id: 'periwinkle', hex: '#7b93ff' },
  { id: 'cyan', hex: '#3dd6ff' },
  { id: 'violet', hex: '#b483ff' },
  { id: 'pink', hex: '#ff5fa8' },
  { id: 'orange', hex: '#ff9440' },
  { id: 'lime', hex: '#c6ff4a' },
  { id: 'pearl', hex: '#e9edf5' },
]

const KEY = 'players'
const MAX = 24

/** Saved players, most recently played first. Shared across all games. */
export const loadRoster = () => load(KEY, [])

export function rememberPlayers(sides) {
  const now = Date.now()
  let roster = loadRoster()
  for (const s of sides) {
    const name = s.name.trim()
    if (!name) continue
    roster = roster.filter((p) => p.name.toLowerCase() !== name.toLowerCase())
    roster.unshift({ name, color: s.color, last: now })
  }
  roster = roster.slice(0, MAX)
  save(KEY, roster)
  return roster
}

export function forgetPlayer(name) {
  const roster = loadRoster().filter((p) => p.name !== name)
  save(KEY, roster)
  return roster
}
