import { HoursBar } from '../HoursBar/HoursBar'
import { StatusChip } from '../StatusChip/StatusChip'
import type { StatusChipKind } from '../StatusChip/StatusChip'
import type { HoursBarState } from '../HoursBar/HoursBar'
import styles from './TableRow.module.css'

export interface TableRowProps {
  id: string
  name: { full: string; initials: string }
  avatarBg?: string
  status: StatusChipKind
  period: string
  vacations?: number
  holidays?: number
  sickDays?: number
  hours: number
  target?: number
  department?: string
  selected?: boolean
  onSelect?: (id: string) => void
  onAction?: (id: string, action: string) => void
  className?: string
}

function Ico({ d, size = 14 }: { d: string | string[]; size?: number }) {
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
  Lock:   ['M5 11h14v10H5z', 'M8 11V7a4 4 0 1 1 8 0v4'],
  Unlock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 7-2.83'],
  Check:  'M20 6 9 17l-5-5',
  Send:   ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4 20-7Z'],
  Upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
  Eye:    ['M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  More:   ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'],
}

function fmtHours(h: number) {
  const hh = Math.floor(h), mm = Math.round((h - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

function hoursState(h: number, t: number): HoursBarState {
  if (h === 0) return 'empty'
  if (h < t * 0.85) return 'warn'
  if (h >= t * 0.97 && h <= t * 1.12) return 'good'
  return 'normal'
}

export function TableRow({
  id, name, avatarBg, status, period,
  vacations = 0, holidays = 0, sickDays = 0,
  hours, target = 168,
  department,
  selected = false,
  onSelect,
  onAction,
  className,
}: TableRowProps) {
  const pct = target ? Math.min(1, hours / target) : 0
  const state = hoursState(hours, target)

  return (
    <div
      className={[styles.row, selected ? styles.selected : '', className ?? ''].join(' ').trim()}
      onClick={() => onSelect?.(id)}
      role="row"
      aria-selected={selected}
    >
      {selected && <div className={styles.accentBar} aria-hidden="true" />}

      {/* Status chip */}
      <div className={styles.colStatus} role="cell">
        <StatusChip status={status} />
      </div>

      {/* Employee */}
      <div className={styles.colUser} role="cell">
        <div
          className={styles.avatar}
          style={{ background: avatarBg ?? 'var(--accent-2)' }}
          aria-hidden="true"
        >
          {name.initials}
        </div>
        <div className={styles.nameStack}>
          <b className={styles.fullName}>{name.full}</b>
          <span className={styles.meta}>{id}{department ? ` · ${department}` : ''}</span>
        </div>
      </div>

      {/* Period */}
      <div className={[styles.cell, styles.colPeriod].join(' ')} role="cell">{period}</div>

      {/* Vac */}
      <div className={[styles.numCell, vacations === 0 ? styles.zero : ''].join(' ')} role="cell">
        {vacations}
      </div>

      {/* Hol */}
      <div className={[styles.numCell, holidays === 0 ? styles.zero : ''].join(' ')} role="cell">
        {holidays}
      </div>

      {/* Sick */}
      <div className={[styles.numCell, sickDays === 0 ? styles.zero : sickDays > 10 ? styles.warn : ''].join(' ')} role="cell">
        {sickDays}
      </div>

      {/* Hours bar */}
      <div className={styles.colHours} role="cell">
        <HoursBar state={state} hours={fmtHours(hours)} fill={pct} />
      </div>

      {/* Actions */}
      <div
        className={styles.colActions}
        role="cell"
        onClick={e => e.stopPropagation()}
      >
        {status === 'Open' && <>
          <button className={styles.act} title="Lock"          onClick={() => onAction?.(id, 'lock')}>
            <Ico d={IC.Lock}  size={14} />
          </button>
          <button className={[styles.act, styles.actPrimary].join(' ')} title="Approve" onClick={() => onAction?.(id, 'approve')}>
            <Ico d={IC.Check} size={14} />
          </button>
        </>}
        {status === 'Alert' && <>
          <button className={styles.act} title="View">
            <Ico d={IC.Eye}  size={14} />
          </button>
          <button className={[styles.act, styles.actPrimary].join(' ')} title="Send back" onClick={() => onAction?.(id, 'sendback')}>
            <Ico d={IC.Send} size={14} />
          </button>
        </>}
        {status === 'Locked' && <>
          <button className={styles.act} title="Unlock" onClick={() => onAction?.(id, 'unlock')}>
            <Ico d={IC.Unlock}  size={14} />
          </button>
          <button className={styles.act} title="Export">
            <Ico d={IC.Upload} size={14} />
          </button>
        </>}
        {status === 'Approved' && <>
          <button className={styles.act} title="Lock" onClick={() => onAction?.(id, 'lock')}>
            <Ico d={IC.Lock} size={14} />
          </button>
          <button className={styles.act} title="More">
            <Ico d={IC.More} size={14} />
          </button>
        </>}
      </div>
    </div>
  )
}
