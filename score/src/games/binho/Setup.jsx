import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { PALETTE, loadRoster, forgetPlayer } from '../../lib/players.js'
import { buzz } from '../../lib/storage.js'
import { Seg, screen, spring, soft } from '../../lib/ui.jsx'

const TARGETS = [5, 7, 10, 11]

function SideCard({ slot, side, other, roster, onChange, onForget }) {
  const pickPlayer = (p) => {
    buzz(8)
    const colorFree = p.color && p.color !== other.color
    onChange({ ...side, name: p.name, color: colorFree ? p.color : side.color })
  }

  return (
    <motion.section
      layout
      transition={soft}
      className="side-card glass"
      style={{ '--c': side.color }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.p layout="position" className="eyebrow">Side {slot === 0 ? 'A' : 'B'}</motion.p>
      <input
        className="side-name"
        value={side.name}
        placeholder={`Player ${slot + 1}`}
        onChange={(e) => onChange({ ...side, name: e.target.value })}
        maxLength={18}
        spellCheck={false}
        autoComplete="off"
        enterKeyHint="done"
        aria-label={`Side ${slot === 0 ? 'A' : 'B'} name`}
      />

      {roster.length > 0 && (
        <div className="roster" role="list" aria-label="Saved players">
          <AnimatePresence initial={false}>
            {roster.map((p) => {
              const taken = p.name.toLowerCase() === other.name.trim().toLowerCase()
              const active = p.name.toLowerCase() === side.name.trim().toLowerCase()
              return (
                <motion.span
                  key={p.name}
                  role="listitem"
                  className={`chip ${active ? 'on' : ''} ${taken ? 'taken' : ''}`}
                  initial={{ opacity: 0, scale: 0.6, width: 0 }}
                  animate={{ opacity: taken ? 0.3 : 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.6, width: 0, marginRight: -6 }}
                  transition={spring}
                >
                  <motion.button whileTap={{ scale: 0.92 }} onClick={() => pickPlayer(p)} disabled={taken}>
                    <i style={{ background: p.color }} />
                    {p.name}
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.button
                        className="chip-x"
                        onClick={() => onForget(p.name)}
                        aria-label={`Forget ${p.name}`}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 0.55 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={spring}
                      >
                        ×
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.span>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      <div className="swatches" role="radiogroup" aria-label="Color">
        {PALETTE.map((c) => {
          const taken = c.hex === other.color
          const on = side.color === c.hex
          return (
            <motion.button
              key={c.id}
              role="radio"
              aria-checked={on}
              aria-label={c.id}
              disabled={taken}
              className="swatch"
              style={{ '--s': c.hex }}
              animate={{ scale: taken ? 0.7 : on ? 1.1 : 1, opacity: taken ? 0.18 : 1 }}
              whileTap={{ scale: 0.85 }}
              transition={spring}
              onClick={() => { buzz(6); onChange({ ...side, color: c.hex }) }}
            >
              {on && <motion.span layoutId={`ring-${side.id}`} className="swatch-ring" transition={spring} />}
            </motion.button>
          )
        })}
      </div>
    </motion.section>
  )
}

export default function Setup({ sides, setSides, target, setTarget, onStart, onExit }) {
  const [roster, setRoster] = useState(loadRoster)
  const [spin, setSpin] = useState(0)
  const setSide = (i) => (v) => setSides(sides.map((x, j) => (j === i ? v : x)))
  const forget = (name) => setRoster(forgetPlayer(name))

  return (
    <motion.div className="setup" style={{ '--a': sides[0].color, '--b': sides[1].color }} {...screen}>
      <header className="setup-head">
        <motion.button whileTap={{ scale: 0.85, x: -3 }} className="dock-btn back" onClick={onExit} aria-label="All games">
          <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
        </motion.button>
        <div>
          <p className="eyebrow">Binho · new match</p>
          <h1 className="setup-title">Who’s up?</h1>
        </div>
      </header>

      <LayoutGroup>
        <div className="sides">
          {/* Cards are keyed by side id, so "swap" physically moves them past each other. */}
          {[0, 1].flatMap((slot) => {
            const card = (
              <SideCard
                key={sides[slot].id}
                slot={slot}
                side={sides[slot]}
                other={sides[1 - slot]}
                roster={roster}
                onChange={setSide(slot)}
                onForget={forget}
              />
            )
            if (slot === 1) return [card]
            return [
              card,
              <motion.button
                key="vs"
                layout
                className="vs glass"
                whileTap={{ scale: 0.92 }}
                onClick={() => { buzz(10); setSpin((s) => s + 180); setSides([sides[1], sides[0]]) }}
                aria-label="Swap sides"
              >
                <span>vs</span>
                <motion.svg viewBox="0 0 24 24" animate={{ rotate: spin }} transition={soft}>
                  <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />
                </motion.svg>
              </motion.button>,
            ]
          })}
        </div>
      </LayoutGroup>

      <motion.div
        className="setup-foot"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { ...soft, delay: 0.15 } }}
      >
        <div className="target-pick">
          <p className="eyebrow">First to</p>
          <Seg id="setup-target" options={TARGETS} value={target} onChange={setTarget} />
        </div>
        <motion.button
          className="btn start-btn"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
        >
          Start match
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
