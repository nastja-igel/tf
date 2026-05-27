import styles from './HoursBar.module.css'

export type HoursBarState = 'normal' | 'warn' | 'good' | 'empty'

export interface HoursBarProps {
  state?: HoursBarState
  hours: string
  /** fill 0–1 */
  fill?: number
  className?: string
}

const fillWidths: Record<HoursBarState, number> = {
  normal: 48 / 64,
  warn:   35 / 64,
  good:   63 / 64,
  empty:  0,
}

export function HoursBar({ state = 'normal', hours, fill, className }: HoursBarProps) {
  const pct = fill ?? fillWidths[state]

  return (
    <div className={[styles.wrap, className ?? ''].join(' ').trim()}>
      <div className={styles.track}>
        {state !== 'empty' && (
          <span
            className={[styles.fill, styles[state]].join(' ')}
            style={{ width: `${Math.min(pct, 1) * 100}%` }}
            aria-hidden="true"
          />
        )}
      </div>
      <span className={[styles.label, styles[state]].join(' ')}>{hours}</span>
    </div>
  )
}
