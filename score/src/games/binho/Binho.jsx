import { useEffect, useReducer, useState } from 'react'
import { reducer, freshMatch } from './reducer.js'
import CoinToss from './CoinToss.jsx'
import { load, save, useStored, buzz } from '../../lib/storage.js'

const COLORS = ['var(--p1)', 'var(--p2)']
const TARGETS = [5, 7, 10, 11]

function PlayerPanel({ idx, player, name, onName, target, dispatch, flipped, isWinner, done }) {
  const [bump, setBump] = useState(0)
  const goal = () => {
    if (done) return
    buzz(15)
    setBump((b) => b + 1)
    dispatch({ type: 'GOAL', player: idx })
  }

  return (
    <section
      className={`panel glass p${idx + 1} ${flipped ? 'flipped' : ''} ${isWinner ? 'winner' : ''}`}
      style={{ '--c': COLORS[idx] }}
    >
      <header className="panel-top">
        <input
          className="name"
          value={name}
          onChange={(e) => onName(e.target.value)}
          onFocus={(e) => e.target.select()}
          maxLength={18}
          spellCheck={false}
          aria-label={`Player ${idx + 1} name`}
        />
        <div className="discipline" aria-label="Cards">
          <span className={`card-chip yellow ${player.yellows ? 'on' : ''}`} title="Yellow (warning)" />
          <span className={`card-chip red ${player.reds ? 'on' : ''}`} title="Reds">
            {player.reds > 0 && <i>{player.reds}</i>}
          </span>
          {player.pegsOut > 0 && <span className="pegs">−{player.pegsOut} peg{player.pegsOut > 1 ? 's' : ''}</span>}
        </div>
      </header>

      <button className="score-hit" onClick={goal} aria-label={`Goal for ${name}`}>
        <span key={bump} className={`score ${bump ? 'pop' : ''}`}>{player.score}</span>
      </button>

      <div className="pips" aria-hidden>
        {Array.from({ length: target }, (_, i) => (
          <span key={i} className={i < player.score ? 'on' : ''} />
        ))}
      </div>

      <div className="controls">
        <button
          className="btn glass-btn icon"
          onClick={() => { buzz(8); dispatch({ type: 'UNGOAL', player: idx }) }}
          disabled={player.score === 0}
          aria-label="Remove goal"
        >
          −
        </button>
        <button
          className="btn glass-btn out"
          onClick={() => { buzz(25); dispatch({ type: 'OUT', player: idx }) }}
          disabled={done}
        >
          <span className="card-chip yellow on sm" aria-hidden />
          Out
          <small>{player.yellows ? 'next = red' : 'warning'}</small>
        </button>
        <button className="btn solid-btn goal" onClick={goal} disabled={done}>
          Goal
        </button>
      </div>
    </section>
  )
}

export default function Binho({ onExit }) {
  const [names, setNames] = useStored('binho:names', ['Player 1', 'Player 2'])
  const [faceOff, setFaceOff] = useStored('binho:faceoff', false)
  const [h, dispatch] = useReducer(reducer, null, () => ({
    past: [],
    present: load('binho:match', null) ?? freshMatch(load('binho:target', 7)),
  }))
  const [menu, setMenu] = useState(false)
  const m = h.present

  useEffect(() => save('binho:match', m), [m])
  useEffect(() => save('binho:target', m.target), [m.target])

  const setName = (i) => (v) => setNames((n) => n.map((x, j) => (j === i ? v : x)))
  const label = (i) => names[i]?.trim() || `Player ${i + 1}`
  const done = m.winner != null

  const swap = () => setNames(([a, b]) => [b, a])

  return (
    <div className={`binho ${faceOff ? 'face-off' : ''}`}>
      {[0, 1].map((i) => (
        <PlayerPanel
          key={i}
          idx={i}
          player={m.players[i]}
          name={names[i]}
          onName={setName(i)}
          target={m.target}
          dispatch={dispatch}
          flipped={faceOff && i === 0}
          isWinner={m.winner === i}
          done={done}
        />
      ))}

      <nav className="dock glass" aria-label="Match controls">
        <button className="dock-btn" onClick={onExit} aria-label="All games">
          <svg viewBox="0 0 24 24"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>
        </button>
        <button className="dock-btn" onClick={() => { buzz(8); dispatch({ type: 'UNDO' }) }} disabled={!h.past.length} aria-label="Undo">
          <svg viewBox="0 0 24 24"><path d="M9 14 4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 0 10h-3" /></svg>
        </button>
        <span className="dock-target" aria-label={`First to ${m.target}`}>
          <small>to</small>{m.target}
        </span>
        <button className="dock-btn" onClick={() => setMenu(true)} aria-label="Settings">
          <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
        </button>
        <button className="dock-btn" onClick={() => dispatch({ type: 'NEW' })} aria-label="New match">
          <svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v5h-5" /></svg>
        </button>
      </nav>

      {m.pendingRed != null && (
        <CoinToss
          carded={{ name: label(m.pendingRed), color: COLORS[m.pendingRed] }}
          caller={{ name: label(1 - m.pendingRed), color: COLORS[1 - m.pendingRed] }}
          onDone={() => dispatch({ type: 'RESOLVE_RED' })}
          onCancel={() => dispatch({ type: 'UNDO' })}
        />
      )}

      {done && m.pendingRed == null && (
        <div className="scrim win-scrim">
          <div className="sheet glass win-sheet" style={{ '--c': COLORS[m.winner] }}>
            <div className="rings" aria-hidden><i /><i /><i /></div>
            <p className="eyebrow">Winner</p>
            <h2 className="win-name">{label(m.winner)}</h2>
            <p className="win-score">
              {m.players[m.winner].score}<span>–</span>{m.players[1 - m.winner].score}
            </p>
            <div className="call-row">
              <button className="btn glass-btn" onClick={() => dispatch({ type: 'UNDO' })}>Undo goal</button>
              <button className="btn solid-btn" onClick={() => dispatch({ type: 'NEW' })}>Rematch</button>
            </div>
          </div>
        </div>
      )}

      {menu && (
        <div className="scrim" onClick={(e) => e.target === e.currentTarget && setMenu(false)}>
          <div className="sheet glass">
            <div className="sheet-grab" />
            <h2 className="sheet-title">Match settings</h2>

            <p className="eyebrow">First to</p>
            <div className="seg">
              {TARGETS.map((t) => (
                <button
                  key={t}
                  className={t === m.target ? 'on' : ''}
                  onClick={() => dispatch({ type: 'SET_TARGET', target: t })}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="toggle">
              <span>
                Face-off mode
                <small>Flip the top player so you can play across the board</small>
              </span>
              <input type="checkbox" checked={faceOff} onChange={(e) => setFaceOff(e.target.checked)} />
              <i aria-hidden />
            </label>

            <div className="call-row">
              <button className="btn glass-btn" onClick={swap}>Swap names</button>
              <button className="btn glass-btn" onClick={() => { dispatch({ type: 'NEW' }); setMenu(false) }}>
                Reset match
              </button>
            </div>

            <details className="rules">
              <summary>House rules</summary>
              <ul>
                <li>Goal = 1 point. First to {m.target} wins.</li>
                <li>Kick the ball out = yellow card. First one is a warning.</li>
                <li>Second out = red. Coin toss — the opponent calls it.</li>
                <li>Call it right: they choose which of your pegs comes out. Call it wrong: you choose.</li>
              </ul>
            </details>

            <button className="btn solid-btn" onClick={() => setMenu(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
