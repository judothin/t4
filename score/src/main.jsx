import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque/standard.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'
import './styles.css'
import App from './App.jsx'

// iOS home-screen apps with a translucent status bar report a viewport that is
// short by the status-bar height. Measure the real screen and expose it as --app-h.
const standalone = window.navigator.standalone || matchMedia('(display-mode: standalone)').matches
function fitScreen() {
  if (!standalone) return
  const portrait = innerHeight >= innerWidth
  const full = portrait ? Math.max(screen.width, screen.height) : Math.min(screen.width, screen.height)
  const gap = full - innerHeight
  // Only correct a status-bar-sized gap; anything else (split view, etc.) uses the CSS default.
  if (gap > 0 && gap <= 80) document.documentElement.style.setProperty('--app-h', `${full}px`)
  else document.documentElement.style.removeProperty('--app-h')
}
fitScreen()
addEventListener('resize', fitScreen)
addEventListener('orientationchange', () => setTimeout(fitScreen, 300))

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
