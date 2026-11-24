import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { tossCoin } from './coinPhysics.js'
import { buzz } from '../../lib/storage.js'
import { Sheet, AutoHeight, spring } from '../../lib/ui.jsx'

const fairFlip = () => {
  const b = new Uint8Array(1)
  crypto.getRandomValues(b)
  return b[0] & 1 ? 'heads' : 'tails'
}

const step = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: spring },
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.14 } },
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
  const stage = !call ? 'call' : !landed ? 'flying' : 'result'

  return (
    <Sheet className="red-sheet">
      <div className="red-head">
        <span className="card-chip red big" aria-hidden />
        <div>
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
            Red card · second out
          </motion.p>
          <motion.h2 className="sheet-title" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0, transition: { ...spring, delay: 0.26 } }}>
            {carded.name}
          </motion.h2>
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

      <AutoHeight className="coin-steps">
        <AnimatePresence mode="popLayout" initial={false}>
          {stage === 'call' && (
            <motion.div key="call" className="step" {...step}>
              <p className="sheet-copy">
                <b style={{ color: caller.color }}>{caller.name}</b>, call it.
              </p>
              <div className="call-row">
                <motion.button whileTap={{ scale: 0.94 }} className="btn glass-btn call" onClick={() => pick('heads')}>Heads</motion.button>
                <motion.button whileTap={{ scale: 0.94 }} className="btn glass-btn call" onClick={() => pick('tails')}>Tails</motion.button>
              </div>
              <button className="btn text-btn" onClick={onCancel}>Wasn’t out — undo</button>
            </motion.div>
          )}

          {stage === 'flying' && (
            <motion.p key="flying" className="sheet-copy muted step" {...step}>
              {caller.name} called <b>{call}</b>…
            </motion.p>
          )}

          {stage === 'result' && (
            <motion.div key="result" className="step" {...step}>
              <p className="result-line">
                <span className="eyebrow">It’s</span>
                <motion.span
                  className="result-word"
                  initial={{ opacity: 0, y: 20, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { ...spring, stiffness: 500 } }}
                >
                  {result}
                </motion.span>
                <motion.span
                  className={`verdict ${won ? 'hit' : 'miss'}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, transition: { ...spring, delay: 0.12 } }}
                >
                  {won ? 'Called it' : 'Missed'}
                </motion.span>
              </p>
              <p className="sheet-copy">
                {won ? (
                  <><b style={{ color: caller.color }}>{caller.name}</b> picks which of {carded.name}’s pegs comes out.</>
                ) : (
                  <><b style={{ color: carded.color }}>{carded.name}</b> picks which of their own pegs comes out.</>
                )}
              </p>
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="btn solid-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.2 } }}
                onClick={onDone}
              >
                Peg pulled — play on
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </AutoHeight>
    </Sheet>
  )
}
