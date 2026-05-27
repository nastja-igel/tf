import { ButtonHTMLAttributes } from 'react'
import styles from './PagerBtn.module.css'

export interface PagerBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  page: number | string
  active?: boolean
}

export function PagerBtn({ page, active = false, className, ...props }: PagerBtnProps) {
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      className={[styles.btn, active ? styles.active : '', className ?? ''].join(' ').trim()}
      {...props}
    >
      {page}
    </button>
  )
}
