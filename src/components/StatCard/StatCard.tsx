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

// Delta colour is kind-based per Figma: Approved=green, Alerts=red, others=ink-2
const deltaKindClass: Record<StatCardKind, string> = {
  Pending:  'deltaInk',
  Approved: 'deltaGood',
  Locked:   'deltaInk',
  Alerts:   'deltaBad',
}

export function StatCard({ kind, value, delta, deltaPositive, label, className }: StatCardProps) {
  // deltaPositive override still honoured when explicitly passed
  const kindCls = deltaPositive === true ? 'deltaGood' : deltaPositive === false ? 'deltaBad' : deltaKindClass[kind]

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
        <span className={[styles.delta, styles[kindCls]].join(' ')}>
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
              background: i === sparkBars.length - 1 ? barColors[kind] : 'rgba(20,40,70,.15)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
