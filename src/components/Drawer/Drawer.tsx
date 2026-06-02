import { exportPayrollPdf } from '../../utils/exportPayrollPdf'
import { SummaryCard } from '../SummaryCard/SummaryCard'
import type { SummaryCardKind } from '../SummaryCard/SummaryCard'
import { CalendarDay } from '../CalendarDay/CalendarDay'
import type { CalendarDayState } from '../CalendarDay/CalendarDay'
import { TimelineRow } from '../TimelineRow/TimelineRow'
import { Button } from '../Button/Button'
import { CloseBtn } from '../CloseBtn/CloseBtn'
import { AlertBanner } from '../AlertBanner/AlertBanner'
import styles from './Drawer.module.css'

/* ── Types ──────────────────────────────────────────────────────── */
export type DrawerStatus = 'Open' | 'Alert' | 'Approved' | 'Locked'

export interface DrawerSummaryItem {
  label: string
  value: string | number
  kind?: SummaryCardKind
}

export interface DrawerCalCell {
  day: number | null
  state: CalendarDayState
}

export interface DrawerEntry {
  day: number | string
  dayName: string
  hours: string
  project: string
}

export interface DrawerProps {
  /** null = closed */
  row: {
    id: string
    name: { full: string; initials: string }
    /** CSS gradient or color string */
    avatarBg?: string
    status: DrawerStatus
    subtitle?: string
    summary: DrawerSummaryItem[]
    calendarCells?: DrawerCalCell[]
    calendarLabel?: string
    dailyEntries?: DrawerEntry[]
    alertMessage?: string
  } | null
  onClose?: () => void
  onAction?: (id: string, action: DrawerAction) => void
  /** render as a static panel (no slide-in overlay), useful for Storybook */
  static?: boolean
  className?: string
}

export type DrawerAction = 'sendback' | 'lock' | 'unlock' | 'approve' | 'download'

/* ── SVG icons (inline, no external dep) ───────────────────────── */
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
  X:        ['M18 6 6 18', 'M6 6l12 12'],
  Lock:     ['M5 11h14v10H5z', 'M8 11V7a4 4 0 1 1 8 0v4'],
  Unlock:   ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 7-2.83'],
  Check:    'M20 6 9 17l-5-5',
  Send:     ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4 20-7Z'],
  Download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  Upload:   ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
  Alert:    ['m12 3 10 18H2L12 3Z', 'M12 10v5', 'M12 18h.01'],
}

const WDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/* ── Component ─────────────────────────────────────────────────── */
export function Drawer({ row, onClose, onAction, static: isStatic = false, className }: DrawerProps) {
  const open = row !== null

  const statusMeta: Record<DrawerStatus, { label: string; chipCls: string }> = {
    Open:     { label: 'Open',     chipCls: styles.chipOpen     },
    Alert:    { label: 'Alert',    chipCls: styles.chipAlert    },
    Approved: { label: 'Approved', chipCls: styles.chipApproved },
    Locked:   { label: 'Locked',   chipCls: styles.chipLocked   },
  }

  const content = row ? (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar} style={{ background: row.avatarBg ?? 'var(--accent-tint)' }}>
          {row.name.initials}
        </div>
        <div className={styles.meta}>
          <b className={styles.name}>{row.name.full}</b>
          <span className={styles.sub}>{row.subtitle ?? row.id}</span>
        </div>
        <div
          className={[styles.chip, statusMeta[row.status].chipCls].join(' ')}
          aria-disabled={row.status === 'Locked' ? 'true' : undefined}
        >
          {row.status === 'Open'     && <Ico d={IC.Unlock} size={12} />}
          {row.status === 'Alert'    && <Ico d={IC.Alert}  size={12} />}
          {row.status === 'Approved' && <Ico d={IC.Check}  size={12} />}
          {row.status === 'Locked'   && <Ico d={IC.Lock}   size={12} />}
          {statusMeta[row.status].label}
        </div>
        <CloseBtn onClick={onClose} />
      </div>

      {/* Body */}
      <div className={styles.body}>

        {/* Summary grid */}
        <div className={styles.summaryGrid}>
          {row.summary.map((s, i) => (
            <SummaryCard key={i} label={s.label} value={s.value} kind={s.kind} />
          ))}
        </div>

        {/* Calendar */}
        {row.calendarCells && (
          <div className={styles.calSection}>
            <p className={styles.sectH}>{row.calendarLabel ?? 'THIS WEEK'}</p>
            <div className={styles.calGrid}>
              {WDAYS.map((d, i) => (
                <div key={i} className={styles.dayName}>{d}</div>
              ))}
              {row.calendarCells.map((c, i) => (
                <CalendarDay key={i} day={c.day ?? undefined} state={c.state} />
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {row.dailyEntries && row.dailyEntries.length > 0 && (
          <div className={styles.tlSection}>
            <p className={styles.sectH}>DAILY BREAKDOWN</p>
            <div className={styles.timeline}>
              {row.dailyEntries.map((e, i) => (
                <TimelineRow key={i} day={e.day} dayName={e.dayName} hours={e.hours} project={e.project} />
              ))}
            </div>
          </div>
        )}

        {/* Alert banner */}
        {row.status === 'Alert' && (
          <AlertBanner
            variant="warn"
            message={row.alertMessage ?? 'Hours are irregular — review before approving.'}
          />
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerSpacer} />
        {row.status === 'Open' && <>
          <Button variant="ghost" size="sm" onClick={() => onAction?.(row.id, 'sendback')}>
            <Ico d={IC.Send} size={13} /> Send Back
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onAction?.(row.id, 'lock')}>
            <Ico d={IC.Lock} size={13} /> Lock
          </Button>
          <Button variant="primary" size="sm" onClick={() => onAction?.(row.id, 'approve')}>
            <Ico d={IC.Check} size={13} /> Approve &amp; Lock
          </Button>
        </>}
        {row.status === 'Alert' && <>
          <Button variant="ghost" size="sm" onClick={() => onAction?.(row.id, 'sendback')}>
            <Ico d={IC.Send} size={13} /> Send Back
          </Button>
          <Button variant="primary" size="sm" onClick={() => onAction?.(row.id, 'approve')}>
            <Ico d={IC.Check} size={13} /> Approve Anyway
          </Button>
        </>}
        {row.status === 'Approved' && <>
          <Button variant="ghost" size="sm" onClick={() => onAction?.(row.id, 'unlock')}>
            <Ico d={IC.Unlock} size={13} /> Reopen
          </Button>
          <Button variant="primary" size="sm" onClick={() => { exportPayrollPdf(row); onAction?.(row.id, 'download') }}>
            <Ico d={IC.Upload} size={13} /> Export Payroll
          </Button>
        </>}
        {row.status === 'Locked' && <>
          <Button variant="ghost" size="sm" onClick={() => onAction?.(row.id, 'unlock')}>
            <Ico d={IC.Unlock} size={13} /> Unlock
          </Button>
          <Button variant="primary" size="sm" onClick={() => { exportPayrollPdf(row); onAction?.(row.id, 'download') }}>
            <Ico d={IC.Download} size={13} /> Download Report
          </Button>
        </>}
      </div>
    </>
  ) : null

  if (isStatic) {
    return (
      <div className={[styles.panel, className ?? ''].join(' ').trim()}>
        {content}
      </div>
    )
  }

  return (
    <>
      <div
        className={[styles.scrim, open ? styles.scrimOpen : ''].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={[styles.panel, styles.slide, open ? styles.slideOpen : '', className ?? ''].join(' ').trim()}
        role="dialog"
        aria-modal="true"
        aria-label={row ? `Drawer: ${row.name.full}` : 'Detail drawer'}
      >
        {content}
      </div>
    </>
  )
}

