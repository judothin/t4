import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'motion/react'

// One motion vocabulary for the whole app.
export const spring = { type: 'spring', stiffness: 420, damping: 36, mass: 0.9 }
export const soft = { type: 'spring', stiffness: 240, damping: 30 }
export const snappy = { type: 'spring', stiffness: 600, damping: 38 }

export const screen = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: 'easeIn' } },
}

/** Number that rolls up/down like an odometer when it changes. */
export function Roll({ value, className }) {
  const prev = useRef(value)
  const dir = value >= prev.current ? 1 : -1
  useLayoutEffect(() => { prev.current = value })
  return (
    <span className="roll">
      <AnimatePresence initial={false} mode="popLayout" custom={dir}>
        <motion.span
          key={value}
          className={className}
          custom={dir}
          variants={{
            enter: (d) => ({ y: `${45 * d}%`, opacity: 0, scale: 0.9 }),
            center: { y: '0%', opacity: 1, scale: 1 },
            exit: (d) => ({ y: `${-45 * d}%`, opacity: 0, scale: 0.9 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ ...spring, opacity: { duration: 0.16, ease: 'easeOut' } }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Container whose height springs to fit its content whenever the content changes. */
export function AutoHeight({ children, className }) {
  const inner = useRef(null)
  const [h, setH] = useState('auto')
  useLayoutEffect(() => {
    const el = inner.current
    const ro = new ResizeObserver(() => setH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <motion.div className="auto-h" initial={false} animate={{ height: h }} transition={spring}>
      <div ref={inner} className={className}>{children}</div>
    </motion.div>
  )
}

/** Segmented control with a pill that slides to the selected option. */
export function Seg({ id, options, value, onChange }) {
  return (
    <div className="seg">
      {options.map((o) => (
        <button key={o} className={o === value ? 'on' : ''} onClick={() => onChange(o)}>
          {o === value && <motion.span layoutId={`seg-${id}`} className="seg-pill" transition={spring} />}
          <span className="seg-label">{o}</span>
        </button>
      ))}
    </div>
  )
}

/** Bottom sheet over a scrim. Render inside <AnimatePresence>. */
export function Sheet({ children, className = '', style, onClose, center = false }) {
  const dismissable = !!onClose
  const drag = useDragControls()
  return (
    <motion.div
      className={`scrim ${center ? 'center' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.22, delay: 0.05 } }}
      onClick={(e) => dismissable && e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={`sheet glass ${className}`}
        style={style}
        initial={{ y: 90, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1, transition: { ...spring, stiffness: 360 } }}
        exit={{ y: 70, opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
        drag={dismissable ? 'y' : false}
        dragControls={drag}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.7 }}
        onDragEnd={(_, i) => { if (i.offset.y > 90 || i.velocity.y > 600) onClose() }}
      >
        {dismissable && (
          <div className="sheet-grab-zone" onPointerDown={(e) => drag.start(e)}>
            <div className="sheet-grab" />
          </div>
        )}
        {children}
      </motion.div>
    </motion.div>
  )
}
