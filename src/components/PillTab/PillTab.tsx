import { ButtonHTMLAttributes } from 'react'
import styles from './PillTab.module.css'

export interface PillTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  count?: number
  active?: boolean
  dot?: boolean
  dotColor?: string
}

export function PillTab({ label, count, active = false, dot = false, dotColor, className, ...props }: PillTabProps) {
  return (
    <button
      type="button"
      aria-selected={active}
      className={[styles.tab, active ? styles.active : '', className ?? ''].join(' ').trim()}
      {...props}
    >
      {dot && (
        <span
          className={styles.dot}
          style={dotColor ? { background: dotColor } : undefined}
          aria-hidden="true"
        />
      )}
      <span className={styles.label}>{label}</span>
      {count !== undefined && (
        <span className={styles.count}>{count}</span>
      )}
    </button>
  )
}
