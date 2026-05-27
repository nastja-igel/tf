import styles from './SummaryCard.module.css'

export type SummaryCardKind = 'pending' | 'approved' | 'locked' | 'alerts' | 'generic'

export interface SummaryCardProps {
  label: string
  value: string | number
  kind?: SummaryCardKind
  className?: string
}

export function SummaryCard({ label, value, kind = 'generic', className }: SummaryCardProps) {
  return (
    <div className={[styles.card, styles[kind], className ?? ''].join(' ').trim()}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
