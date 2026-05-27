import styles from './StatCard.module.css'

export type StatCardKind = 'Pending' | 'Approved' | 'Locked' | 'Alerts'

export interface StatCardProps {
  kind: StatCardKind
  value: number | string
  delta: string
  deltaPositive?: boolean
  label?: string
  className?: string
}

const dotColors: Record<StatCardKind, string> = {
  Pending:  'var(--accent)',
  Approved: 'var(--good)',
  Locked:   'var(--locked)',
  Alerts:   'var(--warn)',
}

const barColors: Record<StatCardKind, string> = {
  Pending:  'var(--accent)',
  Approved: 'var(--good)',
  Locked:   'var(--locked)',
  Alerts:   'var(--warn)',
}

// Sparkline heights per kind (last bar is the accent one)
const sparkBars = [8, 14, 11, 17, 14, 20, 23]

export function StatCard({ kind, value, delta, deltaPositive, label, className }: StatCardProps) {
  const isNegative = delta.startsWith('-')
  const positive = deltaPositive ?? !isNegative

  return (
    <div className={[styles.card, className ?? ''].join(' ').trim()}>
      {/* Header row: dot + label */}
      <div className={styles.header}>
        <span className={styles.dot} style={{ background: dotColors[kind] }} aria-hidden="true" />
        <span className={styles.kindLabel}>{(label ?? kind).toUpperCase()}</span>
      </div>

      {/* Big number */}
      <p className={styles.value}>{value}</p>

      {/* Delta row */}
      <div className={styles.deltaRow}>
        <span className={[styles.delta, positive ? styles.deltaGood : styles.deltaBad].join(' ')}>
          {delta}
        </span>
        <span className={styles.deltaCaption}>vs last month</span>
      </div>

      {/* Sparkline */}
      <div className={styles.spark} aria-hidden="true">
        {sparkBars.map((h, i) => (
          <span
            key={i}
            className={styles.bar}
            style={{
              height: h,
              background: i === sparkBars.length - 1 ? barColors[kind] : 'var(--color-navy)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
