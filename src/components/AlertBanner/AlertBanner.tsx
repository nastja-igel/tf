import { ReactNode } from 'react'
import styles from './AlertBanner.module.css'

export type AlertVariant = 'warn' | 'info' | 'error'

export interface AlertBannerProps {
  variant?: AlertVariant
  message: ReactNode
  onDismiss?: () => void
  className?: string
}

function Ico({ d, size = 14 }: { d: string | string[]; size?: number }) {
  const paths = Array.isArray(d) ? d : [d]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

const ICONS: Record<AlertVariant, string[]> = {
  warn:  ['M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z', 'M12 9v4', 'M12 17h.01'],
  info:  ['M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z', 'M12 8v4', 'M12 16h.01'],
  error: ['M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z', 'M15 9l-6 6', 'M9 9l6 6'],
}

const IC_X = 'M18 6 6 18M6 6l12 12'

export function AlertBanner({ variant = 'warn', message, onDismiss, className }: AlertBannerProps) {
  return (
    <div
      className={[styles.banner, styles[variant], className ?? ''].join(' ').trim()}
      role="alert"
    >
      <span className={styles.icon}>
        <Ico d={ICONS[variant]} />
      </span>
      <span className={styles.message}>{message}</span>
      {onDismiss && (
        <button className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
          <Ico d={IC_X} size={12} />
        </button>
      )}
    </div>
  )
}
