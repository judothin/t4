import { useState } from 'react'
import { PALETTE, loadRoster, forgetPlayer } from '../../lib/players.js'
import { buzz } from '../../lib/storage.js'

const TARGETS = [5, 7, 10, 11]

function SideCard({ idx, side, other, roster, onChange, onForget }) {
  const pickPlayer = (p) => {
    buzz(8)
    const colorFree = p.color && p.color !== other.color
    onChange({ name: p.name, color: colorFree ? p.color : side.color })
  }

  return (
    <section className="side-card glass" style={{ '--c': side.color, '--i': idx }}>
      <p className="eyebrow">Side {idx === 0 ? 'A' : 'B'}</p>
      <input
        className="side-name"
        value={side.name}
        placeholder={`Player ${idx + 1}`}
        onChange={(e) => onChange({ ...side, name: e.target.value })}
        maxLength={18}
        spellCheck={false}
        autoComplete="off"
        enterKeyHint="done"
        aria-label={`Side ${idx === 0 ? 'A' : 'B'} name`}
      />

      {roster.length > 0 && (
        <div className="roster" role="list" aria-label="Saved players">
          {roster.map((p) => {
            const taken = p.name.toLowerCase() === other.name.trim().toLowerCase()
            const active = p.name.toLowerCase() === side.name.trim().toLowerCase()
            return (
              <span key={p.name} role="listitem" className={`chip ${active ? 'on' : ''} ${taken ? 'taken' : ''}`}>
                <button onClick={() => pickPlayer(p)} disabled={taken}>
                  <i style={{ background: p.color }} />
                  {p.name}
                </button>
                {active && (
                  <button className="chip-x" onClick={() => onForget(p.name)} aria-label={`Forget ${p.name}`}>
                    ×
                  </button>
                )}
              </span>
            )
          })}
        </div>
      )}

      <div className="swatches" role="radiogroup" aria-label="Color">
        {PALETTE.map((c) => {
          const taken = c.hex === other.color
          return (
            <button
              key={c.id}
              role="radio"
              aria-checked={side.color === c.hex}
              aria-label={c.id}
              disabled={taken}
              className={`swatch ${side.color === c.hex ? 'on' : ''}`}
              style={{ '--s': c.hex }}
              onClick={() => { buzz(6); onChange({ ...side, color: c.hex }) }}
            />
          )
        })}
      </div>
    </section>
  )
}

export default function Setup({ sides, setSides, target, setTarget, onStart, onExit }) {
  const [roster, setRoster] = useState(loadRoster)
  const setSide = (i) => (v) => setSides((s) => s.map((x, j) => (j === i ? v : x)))
  const forget = (name) => setRoster(forgetPlayer(name))

  return (
    <div className="setup" style={{ '--a': sides[0].color, '--b': sides[1].color }}>
      <header className="setup-head">
        <button className="dock-btn back" onClick={onExit} aria-label="All games">
          <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <div>
          <p className="eyebrow">Binho · new match</p>
          <h1 className="setup-title">Who’s up?</h1>
        </div>
      </header>

      <div className="sides">
        <SideCard idx={0} side={sides[0]} other={sides[1]} roster={roster} onChange={setSide(0)} onForget={forget} />
        <button
          className="vs glass"
          onClick={() => { buzz(10); setSides(([a, b]) => [b, a]) }}
          aria-label="Swap sides"
        >
          <span>vs</span>
          <svg viewBox="0 0 24 24"><path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" /></svg>
        </button>
        <SideCard idx={1} side={sides[1]} other={sides[0]} roster={roster} onChange={setSide(1)} onForget={forget} />
      </div>

      <div className="setup-foot">
        <div className="target-pick">
          <p className="eyebrow">First to</p>
          <div className="seg">
            {TARGETS.map((t) => (
              <button key={t} className={t === target ? 'on' : ''} onClick={() => setTarget(t)}>{t}</button>
            ))}
          </div>
        </div>
        <button className="btn start-btn" onClick={onStart}>
          Start match
        </button>
      </div>
    </div>
  )
}
