import Binho from './binho/Binho.jsx'

// Add new games here. `component` = null renders as "coming soon".
export const GAMES = [
  { id: 'binho', name: 'Binho', blurb: 'First to 7 · cards · coin toss', component: Binho },
  { id: 'pingpong', name: 'Ping Pong', blurb: 'Coming soon', component: null },
  { id: 'cornhole', name: 'Cornhole', blurb: 'Coming soon', component: null },
  { id: 'spikeball', name: 'Roundnet', blurb: 'Coming soon', component: null },
]
