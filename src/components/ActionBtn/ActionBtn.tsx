import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './ActionBtn.module.css'

export type ActionBtnVariant = 'default' | 'primary'

export interface ActionBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionBtnVariant
  /** Icon to render inside the button. Defaults to a check mark. */
  children?: ReactNode
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 5" />
    </svg>
  )
}

export function ActionBtn({ variant = 'default', className, children, 'aria-label': ariaLabel, ...props }: ActionBtnProps) {
  return (
    <button
      type="button"
      className={[styles.btn, styles[variant], className ?? ''].join(' ').trim()}
      aria-label={ariaLabel ?? (variant === 'primary' ? 'Approve' : 'Action')}
      {...props}
    >
      {children ?? <CheckIcon />}
    </button>
  )
}
