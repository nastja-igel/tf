import { ButtonHTMLAttributes } from 'react'
import styles from './ActionBtn.module.css'

export type ActionBtnType = 'default' | 'primary'

export interface ActionBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionBtnType
}

export function ActionBtn({ variant = 'default', className, ...props }: ActionBtnProps) {
  return (
    <button
      type="button"
      className={[styles.btn, styles[variant], className ?? ''].join(' ').trim()}
      aria-label={variant === 'primary' ? 'Approve' : 'Action'}
      {...props}
    >
      {/* Check icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 8.5 6.5 12 13 5"/>
      </svg>
    </button>
  )
}
