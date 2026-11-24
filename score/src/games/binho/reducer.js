// Binho rules as modelled here:
//  • A goal is +1. First to `target` (default 7) wins.
//  • Kicking the ball out = a yellow card.
//  • 1st yellow: warning, nothing happens.
//  • 2nd yellow = RED. A coin is flipped; the opponent of the carded player calls it.
//    Call right  → the caller picks which of the carded player's pegs is pulled.
//    Call wrong  → the carded player picks which of their own pegs is pulled.
//    Yellows then reset to 0 (so two more outs = another red).

export const freshPlayer = () => ({ score: 0, yellows: 0, reds: 0, pegsOut: 0 })

export const freshMatch = (target = 7) => ({
  target,
  players: [freshPlayer(), freshPlayer()],
  winner: null, // 0 | 1 | null
  pendingRed: null, // index of player who just got a red, awaiting coin toss
})

const setPlayer = (state, i, patch) => ({
  ...state,
  players: state.players.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
})

function core(state, action) {
  const { type, player: i } = action
  const p = state.players[i]
  switch (type) {
    case 'GOAL': {
      if (state.winner != null) return state
      const score = p.score + 1
      const next = setPlayer(state, i, { score })
      return score >= state.target ? { ...next, winner: i } : next
    }
    case 'UNGOAL':
      if (p.score === 0) return state
      return { ...setPlayer(state, i, { score: p.score - 1 }), winner: null }
    case 'OUT': {
      if (state.winner != null) return state
      if (p.yellows + 1 >= 2) {
        return { ...setPlayer(state, i, { yellows: 0, reds: p.reds + 1 }), pendingRed: i }
      }
      return setPlayer(state, i, { yellows: p.yellows + 1 })
    }
    case 'RESOLVE_RED': {
      const r = state.pendingRed
      if (r == null) return state
      const carded = state.players[r]
      return { ...setPlayer(state, r, { pegsOut: carded.pegsOut + 1 }), pendingRed: null }
    }
    default:
      return state
  }
}

// History wrapper so every action can be undone.
export function reducer(h, action) {
  switch (action.type) {
    case 'UNDO': {
      if (!h.past.length) return h
      return { past: h.past.slice(0, -1), present: h.past[h.past.length - 1] }
    }
    case 'NEW': {
      return { past: [], present: freshMatch(action.target ?? h.present.target) }
    }
    case 'SET_TARGET': {
      const present = { ...h.present, target: action.target }
      const lead = present.players.findIndex((p) => p.score >= action.target)
      present.winner = lead === -1 ? null : lead
      return { past: [...h.past, h.present].slice(-200), present }
    }
    case 'RESOLVE_RED':
      // Replaces the pending state without a new history entry, so a single
      // undo rolls back the whole "out → red → coin toss" sequence.
      return { ...h, present: core(h.present, action) }
    default: {
      const present = core(h.present, action)
      if (present === h.present) return h
      return { past: [...h.past, h.present].slice(-200), present }
    }
  }
}
