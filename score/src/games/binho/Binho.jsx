import { useEffect, useReducer, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { reducer, freshMatch } from './reducer.js'
import CoinToss from './CoinToss.jsx'
import Setup from './Setup.jsx'
import { load, save, useStored, buzz } from '../../lib/storage.js'
import { PALETTE, rememberPlayers } from '../../lib/players.js'
import { Roll, Seg, Sheet, AutoHeight, screen, spring, soft } from '../../lib/ui.jsx'

const COLORS = ['var(--p1)', 'var(--p2)']
const TARGETS = [5, 7, 10, 11]

const defaultSides = () => {
  const old = load('binho:names', null) // migrate from v0.1
  return [
    { id: 'a', name: old?.[0] ?? '', color: PALETTE[0].hex },
    { id: 'b', name: old?.[1] ?? '', color: PALETTE[1].hex },
  ]
}

const inProgress = (m) =>
  m.players.some((p) => p.score || p.yellows || p.reds || p.pegsOut) || m.pendingRed != null

function PlayerPanel({ idx, player, opp, name, target, dispatch, flipped, winner, done }) {
  const goal = () => {
    if (done) return
    buzz(15)
    dispatch({ type: 'GOAL', player: idx })
  }
  const onYellow = player.yellows > 0
  // The winner's panel takes the stage.
  const grow = winner === idx ? 1.55 : winner != null ? 0.9 : 1

  return (
    <motion.section
      className={`panel glass p${idx + 1} ${winner === idx ? 'winner' : ''}`}
      style={{ '--c': COLORS[idx], flexGrow: grow }}
      initial={{ opacity: 0, y: idx ? 18 : -18 }}
      animate={{ opacity: 1, y: 0, rotate: flipped ? 180 : 0 }}
      transition={{ ...soft, delay: 0.05 + idx * 0.05, rotate: { ...soft, delay: 0 } }}
    >
      <header className="panel-top">
        <h2 className="name">{name}</h2>
        <div className="discipline" aria-label="Cards">
          <span className={`card-chip yellow ${onYellow ? 'on' : ''}`} title="Yellow (warning)" />
          <span className={`card-chip red ${player.reds ? 'on' : ''}`} title="Reds">
            {player.reds > 0 && <Roll value={player.reds} className="chip-n" />}
          </span>
          <AnimatePresence initial={false}>
            {player.pegsOut > 0 && (
              <motion.span
                key="pegs"
                className="pegs"
                initial={{ opacity: 0, scale: 0.6, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.6, x: 10 }}
              >
                −<Roll value={player.pegsOut} /> peg{player.pegsOut > 1 ? 's' : ''}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </header>

      <motion.button className="score-hit" onClick={goal} whileTap={{ scale: 0.95 }} aria-label={`Goal for ${name}`}>
        <Roll value={player.score} className="score" />
      </motion.button>

      <div className="pips" aria-hidden>
        <AnimatePresence initial={false}>
          {Array.from({ length: target }, (_, i) => (
            <motion.span
              key={i}
              className={i < player.score ? 'on' : ''}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ ...spring, delay: i * 0.015 }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="controls">
        <motion.button
          className="btn glass-btn icon"
          whileTap={{ scale: 0.9 }}
          onClick={() => { buzz(8); dispatch({ type: 'UNGOAL', player: idx }) }}
          disabled={player.score === 0}
          aria-label="Remove goal"
        >
          −
        </motion.button>
        <motion.button
          className={`btn glass-btn out ${onYellow ? 'danger' : ''}`}
          whileTap={{ scale: 0.94 }}
          onClick={() => { buzz(25); dispatch({ type: 'OUT', player: idx }) }}
          disabled={done}
          aria-label={onYellow ? 'Out — second yellow, red card' : 'Out — yellow card'}
        >
          <span className={`card-chip sm yellow on ${onYellow ? 'red' : ''}`} aria-hidden />
          Out
        </motion.button>
        <motion.button className="btn solid-btn goal" whileTap={{ scale: 0.94 }} onClick={goal} disabled={done}>
          Goal
        </motion.button>
      </div>
    </motion.section>
  )
}

function Rules({ target }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rules">
      <button className={`rules-toggle ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
        House rules <span aria-hidden>+</span>
      </button>
      <AutoHeight>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            >
              <li>Goal = 1 point. First to {target} wins.</li>
              <li>Kick the ball out = yellow card. First one is a warning.</li>
              <li>Second out = red. Coin toss — the opponent calls it.</li>
              <li>Call it right: they choose which of your pegs comes out. Call it wrong: you choose.</li>
            </motion.ul>
          )}
        </AnimatePresence>
      </AutoHeight>
    </div>
  )
}

export default function Binho({ onExit }) {
  const [sides, setSidesRaw] = useStored('binho:sides', defaultSides)
  const [faceOff, setFaceOff] = useStored('binho:faceoff', false)
  const [h, dispatch] = useReducer(reducer, null, () => ({
    past: [],
    present: load('binho:match', null) ?? freshMatch(load('binho:target', 7)),
  }))
  const [phase, setPhase] = useState(() => (inProgress(h.present) ? 'play' : 'setup'))
  const [menu, setMenu] = useState(false)
  const m = h.present

  // sides saved by older versions have no id
  const sidesWithId = sides.map((s, i) => (s.id ? s : { ...s, id: 'ab'[i] }))
  const setSides = setSidesRaw

  useEffect(() => save('binho:match', m), [m])
  useEffect(() => save('binho:target', m.target), [m.target])

  // Theme the whole app (background glow included). --p1/--p2 are registered
  // @property colors, so they cross-fade instead of snapping.
  useEffect(() => {
    const root = document.documentElement.style
    root.setProperty('--p1', sides[0].color)
    root.setProperty('--p2', sides[1].color)
  }, [sides])
  useEffect(() => () => {
    const root = document.documentElement.style
    root.removeProperty('--p1')
    root.removeProperty('--p2')
  }, [])

  const label = (i) => sides[i].name.trim() || `Player ${i + 1}`
  const done = m.winner != null

  const start = () => {
    buzz(20)
    rememberPlayers(sides)
    dispatch({ type: 'NEW' })
    setPhase('play')
  }
  const toSetup = () => { setMenu(false); setPhase('setup') }

  return (
    <motion.div className="game-root" {...screen}>
      <AnimatePresence initial={false}>
        {phase === 'setup' ? (
          <Setup
            key="setup"
            sides={sidesWithId}
            setSides={setSides}
            target={m.target}
            setTarget={(t) => dispatch({ type: 'NEW', target: t })}
            onStart={start}
            onExit={onExit}
          />
        ) : (
          <motion.div key="play" className={`binho ${faceOff ? 'face-off' : ''}`} {...screen}>
            {[0, 1].map((i) => (
              <PlayerPanel
                key={i}
                idx={i}
                player={m.players[i]}
                opp={m.players[1 - i]}
                name={label(i)}
                target={m.target}
                dispatch={dispatch}
                flipped={faceOff && i === 0}
                winner={m.winner}
                done={done}
              />
            ))}

            <motion.nav
              className="dock glass"
              aria-label="Match controls"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { ...spring, delay: 0.14 } }}
            >
              <motion.button whileTap={{ scale: 0.85 }} className="dock-btn" onClick={onExit} aria-label="All games">
                <svg viewBox="0 0 24 24"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85, rotate: -40 }}
                className="dock-btn"
                onClick={() => { buzz(8); dispatch({ type: 'UNDO' }) }}
                disabled={!h.past.length}
                aria-label="Undo"
              >
                <svg viewBox="0 0 24 24"><path d="M9 14 4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 0 10h-3" /></svg>
              </motion.button>
              <span className="dock-target" aria-label={`First to ${m.target}`}>
                <small>to</small><Roll value={m.target} />
              </span>
              <motion.button whileTap={{ scale: 0.85 }} className="dock-btn" onClick={() => setMenu(true)} aria-label="Settings">
                <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
              </motion.button>
              <motion.button whileTap={{ scale: 0.85, rotate: 120 }} className="dock-btn" onClick={toSetup} aria-label="New match">
                <svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v5h-5" /></svg>
              </motion.button>
            </motion.nav>

            <AnimatePresence>
              {m.pendingRed != null && (
                <CoinToss
                  key="coin"
                  carded={{ name: label(m.pendingRed), color: COLORS[m.pendingRed] }}
                  caller={{ name: label(1 - m.pendingRed), color: COLORS[1 - m.pendingRed] }}
                  onDone={() => dispatch({ type: 'RESOLVE_RED' })}
                  onCancel={() => dispatch({ type: 'UNDO' })}
                />
              )}

              {done && m.pendingRed == null && (
                <Sheet key="win" center className="win-sheet" style={{ '--c': COLORS[m.winner] }}>
                  <div className="rings" aria-hidden><i /><i /><i /></div>
                  <motion.p className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}>
                    Winner
                  </motion.p>
                  <motion.h2
                    className="win-name"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { ...spring, delay: 0.16 } }}
                  >
                    {label(m.winner)}
                  </motion.h2>
                  <motion.p className="win-score" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.28 } }}>
                    {m.players[m.winner].score}<span>–</span>{m.players[1 - m.winner].score}
                  </motion.p>
                  <motion.div
                    className="call-row"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.34 } }}
                  >
                    <motion.button whileTap={{ scale: 0.95 }} className="btn glass-btn" onClick={() => dispatch({ type: 'UNDO' })}>
                      Undo goal
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} className="btn solid-btn" onClick={() => dispatch({ type: 'NEW' })}>
                      Rematch
                    </motion.button>
                  </motion.div>
                  <button className="btn text-btn" onClick={toSetup}>New players</button>
                </Sheet>
              )}

              {menu && (
                <Sheet key="menu" onClose={() => setMenu(false)}>
                  <h2 className="sheet-title">Match settings</h2>

                  <p className="eyebrow">First to</p>
                  <Seg id="menu-target" options={TARGETS} value={m.target} onChange={(t) => dispatch({ type: 'SET_TARGET', target: t })} />

                  <label className="toggle">
                    <span>
                      Face-off mode
                      <small>Flip the top player so you can play across the board</small>
                    </span>
                    <input type="checkbox" checked={faceOff} onChange={(e) => setFaceOff(e.target.checked)} />
                    <i aria-hidden />
                  </label>

                  <div className="call-row">
                    <motion.button whileTap={{ scale: 0.95 }} className="btn glass-btn" onClick={toSetup}>Change players</motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="btn glass-btn"
                      onClick={() => { dispatch({ type: 'NEW' }); setMenu(false) }}
                    >
                      Reset score
                    </motion.button>
                  </div>

                  <Rules target={m.target} />

                  <motion.button whileTap={{ scale: 0.96 }} className="btn solid-btn" onClick={() => setMenu(false)}>Done</motion.button>
                </Sheet>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
