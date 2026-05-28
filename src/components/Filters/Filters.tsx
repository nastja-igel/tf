import { Toggle } from '../Toggle/Toggle'
import { MonthPicker } from '../MonthPicker/MonthPicker'
import { SearchInput } from '../SearchInput/SearchInput'
import { Btn } from '../Btn/Btn'
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
  Calendar: ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z','M16 2v4','M8 2v4','M3 10h18'],
  Filter:   'M22 3H2l8 9.46V19l4 2v-8.54L22 3Z',
  TrendUp:  ['m23 6-9.5 9.5-5-5L1 18','M17 6h6v6'],
  Download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4','M7 10l5 5 5-5','M12 15V3'],
  Check:    'M20 6 9 17l-5-5',
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
  const VIEWS: Array<{ key: FiltersView; icon: string | string[]; label: string }> = [
    { key: 'list',     icon: IC.Filter,   label: 'List'     },
    { key: 'calendar', icon: IC.Calendar, label: 'Calendar' },
    { key: 'chart',    icon: IC.TrendUp,  label: 'Chart'    },
  ]

  return (
    <div className={[styles.bar, className ?? ''].join(' ').trim()}>

      {/* Toggle */}
      <Toggle label="Opened only" checked={openedOnly} onChange={onOpenedOnlyChange ?? (() => {})} />

      {/* Month picker — extracted sub-component */}
      <MonthPicker month={month} year={2026} label="Period" onMonthChange={onMonthChange} />

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

      {/* Search — extracted sub-component */}
      <SearchInput
        value={query}
        onChange={e => onQueryChange?.(e.target.value)}
        placeholder="Search employees, IDs…"
        showShortcut
      />

      <div className={styles.spacer} />

      {/* Export */}
      <Btn variant="ghost" onClick={onExport}>
        <Ico d={IC.Download} size={13} /> Export
      </Btn>

      {/* Approve all */}
      <Btn variant="primary" onClick={onApproveAll} disabled={!pendingCount}>
        <Ico d={IC.Check} size={13} />
        Approve All{pendingCount != null ? ` (${pendingCount})` : ''}
      </Btn>
    </div>
  )
}
