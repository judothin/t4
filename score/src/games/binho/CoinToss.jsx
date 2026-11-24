import { useEffect, useRef, useState } from 'react'
import { tossCoin } from './coinPhysics.js'
import { buzz } from '../../lib/storage.js'

const fairFlip = () => {
  const b = new Uint8Array(1)
  crypto.getRandomValues(b)
  return b[0] & 1 ? 'heads' : 'tails'
}

export default function CoinToss({ carded, caller, onDone, onCancel }) {
  const [call, setCall] = useState(null)
  const [result, setResult] = useState(null)
  const [landed, setLanded] = useState(false)
  const coinRef = useRef(null)
  const shadowRef = useRef(null)

  useEffect(() => {
    if (!result) return
    return tossCoin({
      coin: coinRef.current,
      shadow: shadowRef.current,
      result,
      reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
      onImpact: (n) => buzz(n === 1 ? 35 : 15),
      onDone: () => {
        setLanded(true)
        buzz([30, 40, 30])
      },
    })
  }, [result])

  const pick = (side) => {
    buzz(20)
    setCall(side)
    setResult(fairFlip())
  }

  const won = landed && call === result

  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label="Red card coin toss">
      <div className="sheet glass red-sheet">
        <div className="sheet-grab" />
        <div className="red-head">
          <span className="card-chip red big" aria-hidden />
          <div>
            <p className="eyebrow">Red card · second out</p>
            <h2 className="sheet-title">{carded.name}</h2>
          </div>
        </div>

        <div className="coin-stage">
          <div className={`coin ${result ? '' : 'idle'}`} ref={coinRef}>
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} className="coin-edge" style={{ '--z': `${(i - 4) * 0.9}px` }} />
            ))}
            <div className="coin-face heads"><span>H</span></div>
            <div className="coin-face tails"><span>T</span></div>
          </div>
          <div className="coin-shadow" ref={shadowRef} />
        </div>

        {!call && (
          <>
            <p className="sheet-copy">
              <b style={{ color: caller.color }}>{caller.name}</b>, call it.
            </p>
            <div className="call-row">
              <button className="btn glass-btn call" onClick={() => pick('heads')}>Heads</button>
              <button className="btn glass-btn call" onClick={() => pick('tails')}>Tails</button>
            </div>
            <button className="btn text-btn" onClick={onCancel}>Wasn’t out — undo</button>
          </>
        )}

        {call && !landed && (
          <p className="sheet-copy muted">
            {caller.name} called <b>{call}</b>…
          </p>
        )}

        {landed && (
          <>
            <p className="result-line">
              <span className="eyebrow">It’s</span> <span className="result-word">{result}</span>
            </p>
            <p className="sheet-copy">
              {won ? (
                <>
                  <b style={{ color: caller.color }}>{caller.name}</b> called it. They pick which of{' '}
                  {carded.name}’s pegs comes out.
                </>
              ) : (
                <>
                  Missed. <b style={{ color: carded.color }}>{carded.name}</b> picks which of their own pegs comes
                  out.
                </>
              )}
            </p>
            <button className="btn solid-btn" onClick={onDone}>Peg pulled — play on</button>
          </>
        )}
      </div>
    </div>
  )
}
