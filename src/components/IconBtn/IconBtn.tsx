import { ButtonHTMLAttributes } from 'react'
import styles from './IconBtn.module.css'

export interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  badge?: number
}

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 11H3l1.5-3V6a3.5 3.5 0 0 1 7 0v2L13 11Z"/>
    <path d="M6.5 11a1.5 1.5 0 0 0 3 0"/>
  </svg>
)

export function IconBtn({ badge, className, ...props }: IconBtnProps) {
  return (
    <button
      type="button"
      className={[styles.btn, className ?? ''].join(' ').trim()}
      aria-label={badge ? `Notifications (${badge})` : 'Notifications'}
      {...props}
    >
      <BellIcon />
      {badge !== undefined && badge > 0 && (
        <span className={styles.badge} aria-hidden="true">{badge > 9 ? '9+' : badge}</span>
      )}
    </button>
  )
}
