import { ButtonHTMLAttributes } from 'react'
import styles from './NavItem.module.css'

export interface NavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
  count?: number
}

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6"/>
    <path d="M8 5v3l2 1.5"/>
  </svg>
)

export function NavItem({ label, active = false, count, className, ...props }: NavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      className={[styles.item, active ? styles.active : '', className ?? ''].join(' ').trim()}
      {...props}
    >
      <span className={styles.icon}><ClockIcon /></span>
      <span className={styles.label}>{label}</span>
      {count !== undefined && (
        <span className={[styles.badge, active ? styles.badgeActive : ''].join(' ').trim()}>
          {count}
        </span>
      )}
    </button>
  )
}
