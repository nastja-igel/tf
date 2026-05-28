import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './SegOption.module.css'

export interface SegOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
  icon?: ReactNode
}

export function SegOption({ label, active = false, icon, className, ...props }: SegOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[styles.option, active ? styles.active : '', icon ? styles.withIcon : '', className ?? ''].join(' ').trim()}
      {...props}
    >
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      {label}
    </button>
  )
}
