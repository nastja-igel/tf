import { ButtonHTMLAttributes } from 'react'
import styles from './SegOption.module.css'

export interface SegOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
}

export function SegOption({ label, active = false, className, ...props }: SegOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[styles.option, active ? styles.active : '', className ?? ''].join(' ').trim()}
      {...props}
    >
      {label}
    </button>
  )
}
