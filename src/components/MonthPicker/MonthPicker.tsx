import { useState, useRef, useEffect } from 'react'
import styles from './MonthPicker.module.css'

export interface MonthPickerProps {
  month?: number
  year?: number
  label?: string
  onMonthChange?: (month: number) => void
  className?: string
}

const MONTHS_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December']
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function Ico({ d, size = 13 }: { d: string | string[]; size?: number }) {
  const paths = Array.isArray(d) ? d : [d]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

const IC_CALENDAR = ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z','M16 2v4','M8 2v4','M3 10h18']
const IC_CHEVDOWN = 'm6 9 6 6 6-6'

export function MonthPicker({
  month = 3,
  year = 2026,
  label = 'Period',
  onMonthChange,
  className,
}: MonthPickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className={[styles.wrap, className ?? ''].join(' ').trim()} ref={ref}>
      <button
        className={[styles.trigger, open ? styles.triggerOpen : ''].join(' ')}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Ico d={IC_CALENDAR} />
        <span className={styles.label}>{label}</span>
        <b className={styles.value}>{MONTHS_LONG[month]} {year}</b>
        <span style={{ display: 'flex', transition: 'transform .15s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <Ico d={IC_CHEVDOWN} size={11} />
        </span>
      </button>

      {open && (
        <div className={styles.dropdown} role="listbox" aria-label="Select month">
          {MONTHS_SHORT.map((m, i) => (
            <button
              key={i}
              className={[styles.opt, i === month ? styles.optActive : ''].join(' ')}
              role="option"
              aria-selected={i === month}
              onClick={() => { onMonthChange?.(i); setOpen(false) }}
            >
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
