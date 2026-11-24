import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { GAMES } from './games/registry.js'
import { useStored } from './lib/storage.js'
import { screen, spring } from './lib/ui.jsx'

function Backdrop() {
  return (
    <div className="backdrop" aria-hidden>
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <svg className="pitch" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
        <rect x="20" y="20" width="360" height="760" rx="28" />
        <line x1="20" y1="400" x2="380" y2="400" />
        <circle cx="200" cy="400" r="70" />
        <circle cx="200" cy="400" r="4" className="dot" />
        <path d="M130 20v70a70 70 0 0 0 140 0V20" />
        <path d="M130 780v-70a70 70 0 0 1 140 0v70" />
      </svg>
      <div className="grain" />
    </div>
  )
}

function Home({ onPick }) {
  return (
    <motion.main className="home" {...screen}>
      <header className="home-head">
        <p className="eyebrow">Scorekeeper · v0.2</p>
        <h1 className="wordmark">score<span>.</span></h1>
        <p className="home-sub">Pick a game. Keep it honest.</p>
      </header>
      <ul className="game-list">
        {GAMES.map((g, i) => (
          <motion.li
            key={g.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { ...spring, delay: 0.08 + i * 0.06 } }}
          >
            <motion.button
              className={`game-card glass ${g.component ? '' : 'soon'}`}
              disabled={!g.component}
              onClick={() => onPick(g.id)}
              whileHover={g.component ? { y: -3, scale: 1.01 } : undefined}
              whileTap={g.component ? { scale: 0.97 } : undefined}
              transition={spring}
            >
              <span className="game-index">0{i + 1}</span>
              <span className="game-name">{g.name}</span>
              <span className="game-blurb">{g.blurb}</span>
              <span className="game-arrow" aria-hidden>{g.component ? '→' : '·'}</span>
            </motion.button>
          </motion.li>
        ))}
      </ul>
      <p className="home-foot">Tip: Share → Add to Home Screen for the full-screen app.</p>
    </motion.main>
  )
}

export default function App() {
  const [gameId, setGameId] = useStored('activeGame', null)
  const game = GAMES.find((g) => g.id === gameId && g.component)

  return (
    <MotionConfig reducedMotion="user" transition={spring}>
      <Backdrop />
      <AnimatePresence initial={false}>
        {game ? (
          <game.component key={game.id} onExit={() => setGameId(null)} />
        ) : (
          <Home key="home" onPick={setGameId} />
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
