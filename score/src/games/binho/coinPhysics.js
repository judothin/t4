// A thumb-flipped coin: it spins end over end around its horizontal axis at a
// constant angular velocity while following a ballistic arc (gravity), grows
// as it rises toward the viewer, lands, takes one small bounce, then wobbles
// down like a settling disc. The final angle is chosen up front so it lands
// on `result`.

const DEG = Math.PI / 180
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export function tossCoin({ coin, shadow, result, reduced = false, onImpact, onDone }) {
  const CROUCH = reduced ? 0 : 0.14 // thumb loads the coin
  const FLIGHT = reduced ? 0.45 : 1.2
  const APEX = reduced ? 40 : 125 // px
  const SPINS = reduced ? 1 : 7
  const HOP = reduced ? 0 : 0.26
  const HOP_H = 14
  const SETTLE = reduced ? 0.15 : 0.6

  const end = SPINS * 360 + (result === 'tails' ? 180 : 0)
  const lean = (Math.random() * 2 - 1) * 9 // the toss is never perfectly straight
  const t1 = CROUCH
  const t2 = t1 + FLIGHT
  const t3 = t2 + HOP
  const t4 = t3 + SETTLE

  let start = 0
  let raf = 0
  let impacts = 0
  let announced = false

  const apply = (y, scale, z, x, w) => {
    coin.style.transform =
      `translate3d(0, ${-y}px, 0) scale(${scale}) rotateZ(${z}deg) rotateX(${x}deg) rotateY(${w}deg)`
    // Light falls off as the face turns edge-on; a glint sweeps across mid-turn.
    const c = Math.abs(Math.cos(x * DEG))
    coin.style.setProperty('--l', (0.42 + 0.58 * c).toFixed(3))
    coin.style.setProperty('--g', clamp(1 - Math.abs(c - 0.72) * 5, 0, 1).toFixed(3))
    const h = clamp(y / APEX, 0, 1)
    shadow.style.transform = `scale(${1 - 0.55 * h})`
    shadow.style.opacity = (0.6 - 0.4 * h).toFixed(3)
  }

  const frame = (now) => {
    if (!start) start = now
    const t = (now - start) / 1000

    if (t < t1) {
      // crouch: coin dips and squashes slightly before launch
      const k = Math.sin((t / CROUCH) * Math.PI)
      apply(-5 * k, 1 - 0.04 * k, lean * (t / CROUCH), 0, 0)
    } else if (t < t2) {
      // flight: y = v0·u − ½g·u², peak APEX at FLIGHT/2; constant spin
      const u = t - t1
      const y = (4 * APEX * u * (FLIGHT - u)) / (FLIGHT * FLIGHT)
      apply(y, 1 + 0.32 * (y / APEX), lean, (end * u) / FLIGHT, 0)
    } else if (t < t3) {
      if (impacts === 0) { impacts++; onImpact?.(1) }
      // one small bounce; the edge catches so it tips a little
      const u = t - t2
      const k = u / HOP
      const y = (4 * HOP_H * u * (HOP - u)) / (HOP * HOP)
      apply(y, 1 + 0.32 * (y / APEX), lean * (1 - k), end + 14 * Math.sin(k * Math.PI), 0)
    } else if (t < t4) {
      if (impacts === 1) { impacts++; onImpact?.(2) }
      // settle: precessing wobble, amplitude decays while its frequency rises
      const u = t - t3
      const k = u / SETTLE
      // reveal the result while it's still settling — no dead air
      if (!announced && k > 0.25) { announced = true; onDone?.() }
      const amp = 11 * Math.exp(-4 * k) * (1 - k)
      const phase = 2 * Math.PI * (3 * u + 7 * u * u)
      apply(0, 1, 0, end + amp * Math.sin(phase), amp * Math.cos(phase))
    } else {
      apply(0, 1, 0, end, 0)
      if (!announced) onDone?.()
      return
    }
    raf = requestAnimationFrame(frame)
  }

  raf = requestAnimationFrame(frame)
  return () => cancelAnimationFrame(raf)
}
