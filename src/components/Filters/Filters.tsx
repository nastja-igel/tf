import { useState, useRef, useEffect } from 'react'
import { Toggle } from '../Toggle/Toggle'
import styles from './Filters.module.css'

export type FiltersView = 'list' | 'calendar' | 'chart'

export interface FiltersProps {
  openedOnly?: boolean
  onOpenedOnlyChange?: (v: boolean) => void
  month?: number
  onMonthChange?: (m: number) => void
  view?: FiltersView
  onViewChange?: (v: FiltersView) => void
  query?: string
  onQueryChange?: (q: string) => void
  onExport?: () => void
  onApproveAll?: () => void
  pendingCount?: number
  className?: string
}

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const MONTHS_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December']

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

const IC = {
  Calendar:  ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z','M16 2v4','M8 2v4','M3 10h18'],
  ChevDown:  'm6 9 6 6 6-6',
  Filter:    'M22 3H2l8 9.46V19l4 2v-8.54L22 3Z',
  TrendUp:   ['m23 6-9.5 9.5-5-5L1 18','M17 6h6v6'],
  Search:    ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z','M21 21l-4.35-4.35'],
  Download:  ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4','M7 10l5 5 5-5','M12 15V3'],
  Check:     'M20 6 9 17l-5-5',
}

export function Filters({
  openedOnly = false,
  onOpenedOnlyChange,
  month = 3,
  onMonthChange,
  view = 'list',
  onViewChange,
  query = '',
  onQueryChange,
  onExport,
  onApproveAll,
  pendingCount,
  className,
}: FiltersProps) {
  const [monthOpen, setMonthOpen] = useState(false)
  const monthRef = useRef<HTMLDivElement>(null)

  // close dropdown on outside click
  useEffect(() => {
    if (!monthOpen) return
    const handler = (e: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(e.target as Node)) {
        setMonthOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [monthOpen])

  const VIEWS: Array<{ key: FiltersView; icon: string | string[]; label: string }> = [
    { key: 'list',     icon: IC.Filter,   label: 'List'     },
    { key: 'calendar', icon: IC.Calendar, label: 'Calendar' },
    { key: 'chart',    icon: IC.TrendUp,  label: 'Chart'    },
  ]

  return (
    <div className={[styles.bar, className ?? ''].join(' ').trim()}>

      {/* Toggle */}
      <Toggle label="Opened only" checked={openedOnly} onChange={onOpenedOnlyChange ?? (() => {})} />

      {/* Month picker */}
      <div className={styles.monthWrap} ref={monthRef}>
        <button
          className={styles.monthBtn}
          onClick={() => setMonthOpen(o => !o)}
          aria-haspopup="listbox"
          aria-expanded={monthOpen}
        >
          <Ico d={IC.Calendar} size={13} />
          <span className={styles.monthLabel}>Period</span>
          <b>{MONTHS_LONG[month]} 2026</b>
          <Ico d={IC.ChevDown} size={11} />
        </button>
        {monthOpen && (
          <div className={styles.monthMenu} role="listbox">
            {MONTHS_SHORT.map((m, i) => (
              <button
                key={i}
                className={[styles.monthOpt, i === month ? styles.monthOptActive : ''].join(' ')}
                role="option"
                aria-selected={i === month}
                onClick={() => { onMonthChange?.(i); setMonthOpen(false) }}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Segmented view control */}
      <div className={styles.seg} role="group" aria-label="View mode">
        {VIEWS.map(v => (
          <button
            key={v.key}
            className={[styles.segOpt, view === v.key ? styles.segActive : ''].join(' ')}
            onClick={() => onViewChange?.(v.key)}
            aria-pressed={view === v.key}
          >
            <Ico d={v.icon} size={11} />
            {v.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <Ico d={IC.Search} size={13} />
        <input
          className={styles.searchInput}
          placeholder="Search employees, IDs…"
          value={query}
          onChange={e => onQueryChange?.(e.target.value)}
          aria-label="Search"
        />
      </div>

      <div className={styles.spacer} />

      {/* Export */}
      <button className={styles.btnGhost} onClick={onExport}>
        <Ico d={IC.Download} size={13} /> Export
      </button>

      {/* Approve all */}
      <button className={styles.btnPrimary} onClick={onApproveAll} disabled={!pendingCount}>
        <Ico d={IC.Check} size={13} />
        Approve All{pendingCount != null ? ` (${pendingCount})` : ''}
      </button>
    </div>
  )
}
