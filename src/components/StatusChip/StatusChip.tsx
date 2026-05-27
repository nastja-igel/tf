import styles from './StatusChip.module.css'

export type StatusChipKind = 'Open' | 'Locked' | 'Alert' | 'Approved'

export interface StatusChipProps {
  status: StatusChipKind
  className?: string
}

const icons: Record<StatusChipKind, JSX.Element> = {
  Open: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="8" width="12" height="7" rx="2"/>
      <path d="M5 8V5a3 3 0 0 1 6 0"/>
    </svg>
  ),
  Locked: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="12" height="8" rx="2"/>
      <path d="M5 7V5a3 3 0 0 1 6 0v2"/>
    </svg>
  ),
  Alert: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2 L14 13 H2 Z"/>
      <line x1="8" y1="6" x2="8" y2="9.5"/>
      <circle cx="8" cy="11.5" r="0.5" fill="currentColor"/>
    </svg>
  ),
  Approved: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 5"/>
    </svg>
  ),
}

export function StatusChip({ status, className }: StatusChipProps) {
  return (
    <div
      className={[styles.chip, styles[status.toLowerCase()], className ?? ''].join(' ').trim()}
      title={status}
      aria-label={`Status: ${status}`}
    >
      {icons[status]}
    </div>
  )
}
