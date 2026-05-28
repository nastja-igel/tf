import { ButtonHTMLAttributes, forwardRef } from 'react'
import styles from './CloseBtn.module.css'

export type CloseBtnProps = ButtonHTMLAttributes<HTMLButtonElement>

export const CloseBtn = forwardRef<HTMLButtonElement, CloseBtnProps>(
  function CloseBtn({ className, 'aria-label': ariaLabel = 'Close', ...props }, ref) {
    return (
      <button
        ref={ref}
        className={[styles.btn, className ?? ''].join(' ').trim()}
        aria-label={ariaLabel}
        {...props}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    )
  }
)
