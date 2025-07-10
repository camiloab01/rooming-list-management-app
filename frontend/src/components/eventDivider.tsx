import { useState } from 'react'

const COLOR_STYLES = {
  teal: {
    bg: 'bg-teal-100/50',
    gradientLeft: 'bg-gradient-to-r from-transparent to-teal-300',
    gradientRight: 'bg-gradient-to-l from-transparent to-teal-300',
    text: 'text-teal-700',
    border: 'border-teal-700',
  },
  fuchsia: {
    bg: 'bg-fuchsia-100/50',
    gradientLeft: 'bg-gradient-to-r from-transparent to-fuchsia-300',
    gradientRight: 'bg-gradient-to-l from-transparent to-fuchsia-300',
    text: 'text-fuchsia-700',
    border: 'border-fuchsia-700',
  },
  blue: {
    bg: 'bg-blue-100/50',
    gradientLeft: 'bg-gradient-to-r from-transparent to-blue-300',
    gradientRight: 'bg-gradient-to-l from-transparent to-blue-300',
    text: 'text-blue-700',
    border: 'border-blue-700',
  },
} as const
type Color = keyof typeof COLOR_STYLES

interface EventDividerProps {
  eventName: string
}

export default function EventDivider({ eventName }: EventDividerProps) {
  // pick a color once on mount
  const [color] = useState<Color>(() => {
    const keys = Object.keys(COLOR_STYLES) as Color[]
    return keys[Math.floor(Math.random() * keys.length)]
  })
  const styles = COLOR_STYLES[color]

  return (
    <div className="flex items-center my-4">
      {/* left gradient line */}
      <div className={`flex-1 h-px ${styles.gradientLeft}`} />

      {/* colored pill */}
      <div
        className={`text-sm px-4 py-1 mx-4 font-bold rounded border
          ${styles.bg} ${styles.text} ${styles.border}`}
      >
        {eventName}
      </div>

      {/* right gradient line */}
      <div className={`flex-1 h-px ${styles.gradientRight}`} />
    </div>
  )
}
