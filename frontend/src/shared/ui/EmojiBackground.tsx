import { useEffect, useMemo, useState } from 'react'

type EmojiParticle = {
  id: string
  leftPct: number
  delay: number
  duration: number
  size: number
  opacity: number
  emoji: string
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function EmojiBackground(props: {
  enabled?: boolean
  density?: number // сколько эмодзи (пример: 24-48)
  emojis?: string[]
}) {
  const { enabled = true, density = 36, emojis = ['🐷', '🐽', '🌸', '💗', '✨'] } = props

  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const onChange = () => setReduceMotion(!!mq.matches)
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  const items = useMemo<EmojiParticle[]>(() => {
    return Array.from({ length: density }).map((_, i) => ({
      id: `${Date.now()}-${i}-${Math.random().toString(16).slice(2)}`,
      leftPct: rand(0, 100),
      delay: rand(0, 8),
      duration: rand(10, 22),
      size: rand(14, 28),
      opacity: rand(0.15, 0.45),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
  }, [density, emojis])

  if (!enabled || reduceMotion) return null

  return (
    <div className="emoji-bg" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className="emoji-bg__item"
          style={{
            left: `${p.leftPct}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
