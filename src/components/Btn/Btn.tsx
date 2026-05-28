import { ButtonHTMLAttributes, forwardRef } from 'react'
import styles from './Btn.module.css'

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'primary'
  size?: 'sm' | 'md'
}

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(
  function Btn({ variant = 'ghost', size = 'md', className, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={[
          styles.btn,
          styles[variant],
          styles[size],
          className ?? '',
        ].join(' ').trim()}
        {...props}
      >
        {children}
      </button>
    )
  }
)
