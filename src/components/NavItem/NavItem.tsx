import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './NavItem.module.css'

export interface NavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
  count?: number
  /** Optional icon node — defaults to a clock icon */
  icon?: ReactNode
}

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 7v5l3 2 M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/>
  </svg>
)

export function NavItem({ label, active = false, count, icon, className, ...props }: NavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      className={[styles.item, active ? styles.active : '', className ?? ''].join(' ').trim()}
      {...props}
    >
      <span className={styles.icon}>{icon ?? <ClockIcon />}</span>
      <span className={styles.label}>{label}</span>
      {count !== undefined && (
        <span className={[styles.badge, active ? styles.badgeActive : ''].join(' ').trim()}>
          {count}
        </span>
      )}
    </button>
  )
}
