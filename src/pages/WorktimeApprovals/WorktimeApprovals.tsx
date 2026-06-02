import { useState, useMemo, useCallback } from 'react'
import { exportPayrollPdf } from '../../utils/exportPayrollPdf'
import { PillTab } from '../../components/PillTab/PillTab'
import { Toggle } from '../../components/Toggle/Toggle'
import { StatCard } from '../../components/StatCard/StatCard'
import { HoursBar } from '../../components/HoursBar/HoursBar'
import { StatusChip } from '../../components/StatusChip/StatusChip'
import { NavItem } from '../../components/NavItem/NavItem'
import type { StatusChipKind } from '../../components/StatusChip/StatusChip'
import type { HoursBarState } from '../../components/HoursBar/HoursBar'
import styles from './WorktimeApprovals.module.css'

/* ─── Inline SVG helper ─────────────────────────────────────── */
function Ic({
  d, sw = 1.6, size = 16, className, style,
}: {
  d: string | string[]
  sw?: number
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  const paths = Array.isArray(d) ? d : [d]
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true"
    >
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

/* ─── Icon paths ────────────────────────────────────────────── */
const IC = {
  Clock:    'M12 7v5l3 2 M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z',
  Plane:    'M3 16l18-6-7 12-2-5-9-1Z',
  Users:    ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2','M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8','M22 21v-2a4 4 0 0 0-3-3.87','M16 3.13a4 4 0 0 1 0 7.75'],
  Folder:   'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
  Pin:      ['M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12Z','M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  Settings: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z','M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z'],
  TrendUp:  ['m23 6-9.5 9.5-5-5L1 18','M17 6h6v6'],
  Calendar: ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z','M16 2v4','M8 2v4','M3 10h18'],
  Search:   ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z','M21 21l-4.35-4.35'],
  ChevDown: 'm6 9 6 6 6-6',
  ChevLeft: 'm15 6-6 6 6 6',
  ChevRight:'m9 6 6 6-6 6',
  Lock:     ['M5 11h14v10H5z','M8 11V7a4 4 0 1 1 8 0v4'],
  Unlock:   ['M5 11h14v10H5z','M8 11V7a4 4 0 0 1 7-2.83'],
  Alert:    ['m12 3 10 18H2L12 3Z','M12 10v5','M12 18h.01'],
  Check:    'M20 6 9 17l-5-5',
  X:        ['M18 6 6 18','M6 6l12 12'],
  Upload:   ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4','M17 8l-5-5-5 5','M12 3v12'],
  Download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4','M7 10l5 5 5-5','M12 15V3'],
  More:     ['M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z','M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z','M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'],
  Filter:   'M22 3H2l8 9.46V19l4 2v-8.54L22 3Z',
  Bell:     ['M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9','M13.7 21a2 2 0 0 1-3.4 0'],
  ArrowUp:  ['M12 19V5','M5 12l7-7 7 7'],
  ArrowDn:  ['M12 5v14','M19 12l-7 7-7-7'],
  Help:     ['M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z','M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3','M12 17h.01'],
  Send:     ['M22 2 11 13','M22 2 15 22l-4-9-9-4 20-7Z'],
  Eye:      ['M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8Z','M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  Sun:      ['M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z','M12 1v2','M12 21v2','M4.2 4.2l1.4 1.4','M18.4 18.4l1.4 1.4','M1 12h2','M21 12h2','M4.2 19.8l1.4-1.4','M18.4 5.6l1.4-1.4'],
  Moon:     'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  Logout:   ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4','M16 17l5-5-5-5','M21 12H9'],
  Sidebar:  ['M3 6h13','M3 12h13','M3 18h13','M21 6l-3 3 3 3','M21 18l-3-3 3-3'],
  SidebarExpand: ['M3 6h13','M3 12h13','M3 18h13','M14 6l3 3-3 3','M14 18l3-3-3-3'],
}

/* ─── Data types ────────────────────────────────────────────── */
type RowStatus = StatusChipKind  // 'Open'|'Locked'|'Alert'|'Approved'

interface RowName { full: string; initials: string }
interface Row {
  id: string
  name: RowName
  avatarBg: string
  status: RowStatus
  vacations: number
  holidays: number
  sickDays: number
  hours: number
  target: number
  department: string
  location: string
}

/* ─── Synthetic data ────────────────────────────────────────── */
const FIRST = ['Anna','Marcus','Leon','Sophie','Jonas','Lina','Felix','Mia','Paul','Hannah','Noah','Emma','Lukas','Clara','Tim','Lea','David','Nora','Max','Julia','Erik','Maja','Tobias','Greta']
const LAST  = ['Schmidt','Bauer','Wagner','Müller','Klein','Becker','Hoffmann','Schulz','Weber','Koch','Richter','Schwarz','Zimmermann','Lange','Krüger','Vogel','Stein','Berger','Werner','Frank','Otto','Kraus','Hartmann','Roth']
const STATUS_LIST: RowStatus[] = ['Open','Open','Open','Approved','Approved','Alert','Locked','Open','Approved','Locked','Open','Approved','Alert','Approved','Open','Locked','Open','Open','Approved','Open','Alert','Approved','Open','Locked']
const TARGET = 168

function makeRow(i: number): Row {
  const seed = i * 13 + 7
  const f = FIRST[seed % FIRST.length], l = LAST[(seed * 7 + 3) % LAST.length]
  const status = STATUS_LIST[i % STATUS_LIST.length]
  const vac = [0,0,0,0,1,0,0,2,0,3,0,0,0,5,0,0,0,1,0,0][i % 20]
  const hol = [0,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1,1,0,1,0][i % 20]
  const sick = [0,0,0,0,0,0,30,0,0,0,2,0,0,0,0,0,0,0,3,0][i % 20]
  let hours: number
  if (status === 'Locked' && i % 4 === 0) hours = 0
  else if (status === 'Alert') hours = TARGET - 30 + (i % 7)
  else if (sick > 10) hours = 20 + (seed % 12)
  else hours = TARGET - 28 + (seed % 56)
  const hue = (seed * 37) % 360
  return {
    id: `AS${String(2000 + i).padStart(5, '0')}`,
    name: { full: `${f} ${l}`, initials: f[0] + l[0] },
    avatarBg: `linear-gradient(135deg,oklch(68% 0.12 ${hue}),oklch(48% 0.14 ${(hue+45)%360}))`,
    status, vacations: vac, holidays: hol, sickDays: sick,
    hours, target: TARGET,
    department: ['Engineering','Operations','Logistics','Finance','HR','Sales','Production'][i % 7],
    location: ['Berlin','Munich','Hamburg','Frankfurt','Stuttgart','Cologne'][i % 6],
  }
}

const ALL_ROWS: Row[] = Array.from({ length: 24 }, (_, i) => makeRow(i))

/* ─── Helpers ───────────────────────────────────────────────── */
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmtHours(h: number) {
  const hh = Math.floor(h), mm = Math.round((h - hh) * 60)
  return `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`
}
function hoursState(h: number, t: number): HoursBarState {
  if (h === 0) return 'empty'
  if (h < t * 0.85) return 'warn'
  if (h >= t * 0.97 && h <= t * 1.12) return 'good'
  return 'normal'
}

/* calendar — April 2026 offset=2 (Wed), others filled from there */
const CAL_OFFSETS = [3,6,6,2,4,0,2,5,1,3,6,1]
const MONTH_LENS  = [31,28,31,30,31,30,31,31,30,31,30,31]
const WDAYS = ['M','T','W','T','F','S','S']

function makeCalendar(month: number) {
  const offset = CAL_OFFSETS[month]
  const len = MONTH_LENS[month]
  const cells: Array<{ day: number | null; weekend: boolean }> = []
  for (let i = 0; i < offset; i++) cells.push({ day: null, weekend: false })
  for (let d = 1; d <= len; d++) {
    const dow = (offset + d - 1) % 7
    cells.push({ day: d, weekend: dow >= 5 })
  }
  return cells
}

function makeDailyEntries(row: Row) {
  const projects = ['KLR-204 Worksite A','INT-118 Internal','RND-330 Research','OPS-007 Maintenance','CST-555 Customer']
  const wds = ['Mon','Tue','Wed','Thu','Fri']
  const entries: Array<{ day: number; dayName: string; hours: string; project: string }> = []
  for (let d = 1; d <= 14; d++) {
    const offset = CAL_OFFSETS[3] // April
    const dow = (offset + d - 1) % 7
    if (dow >= 5) continue
    const seed = (row.id.charCodeAt(2) + d) * 13
    const h = 7.5 + ((seed % 20) - 10) / 10
    entries.push({ day: d, dayName: wds[dow % 5], hours: `${h.toFixed(1)}h`, project: projects[seed % 5] })
  }
  return entries.slice(-7).reverse()
}

/* ─── Toast system ──────────────────────────────────────────── */
interface ToastItem { id: number; msg: string }
let _tid = 0

/* ─── Sidebar ───────────────────────────────────────────────── */
function Sidebar({ counts, collapsed, onCollapse }: {
  counts: { pending: number; approved: number; locked: number; alerts: number }
  collapsed: boolean
  onCollapse: () => void
}) {
  const navItems = [
    { key: 'worktime',  label: 'Worktime',  icon: IC.Clock,    count: counts.pending, active: true },
    { key: 'absence',   label: 'Absence',   icon: IC.Plane,    count: 4 },
    { key: 'users',     label: 'Users',     icon: IC.Users },
    { key: 'projects',  label: 'Projects',  icon: IC.Folder },
    { key: 'locations', label: 'Locations', icon: IC.Pin },
    { key: 'admin',     label: 'Admin',     icon: IC.Settings },
  ]
  const reportItems = [
    { key: 'hours',  label: 'Hours Report', icon: IC.TrendUp },
    { key: 'period', label: 'Period Report', icon: IC.Calendar },
  ]

  return (
    <aside className={[styles.side, collapsed ? styles.sideCollapsed : ''].join(' ')}>
      {/* Brand */}
      <div className={styles.brand}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className={styles.brandMark}>
            <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" width="30" height="30">
              <path d="M 32 6 A 26 26 0 1 1 12.5 53.2" stroke="#334155" strokeWidth="3.5"/>
              <path d="M 16 55.5 A 26 26 0 0 1 6.5 35" stroke="#94A3B8" strokeWidth="3.5"/>
              <path d="M 32 13 A 19 19 0 1 0 51 32.8" stroke="#94A3B8" strokeWidth="3.5"/>
              <path d="M 49.5 36 A 19 19 0 0 1 35.5 50" stroke="#334155" strokeWidth="3.5"/>
              <line x1="32" y1="32" x2="32" y2="21" stroke="#334155" strokeWidth="2.5"/>
              <line x1="32" y1="32" x2="40.5" y2="37" stroke="#334155" strokeWidth="2.5"/>
              <circle cx="32" cy="32" r="1.8" fill="#334155"/>
            </svg>
          </div>
          <div>
            <div className={styles.brandName}>Klar Time</div>
            <div className={styles.brandSub}>WORKFORCE OPS</div>
          </div>
        </div>
        <button className={styles.sidebarToggle} onClick={onCollapse} title="Collapse sidebar">
          <Ic d={IC.Sidebar} size={14} />
        </button>
      </div>

      {/* Workspace nav */}
      <div className={styles.navSection}>WORKSPACE</div>
      <nav className={styles.nav} aria-label="Workspace">
        {navItems.map(it => (
          <NavItem
            key={it.key}
            label={it.label}
            active={it.active}
            count={it.count}
            icon={<Ic d={it.icon} size={16} />}
          />
        ))}
      </nav>

      {/* Reports nav */}
      <div className={styles.navSection}>REPORTS</div>
      <nav className={styles.nav} aria-label="Reports">
        {reportItems.map(it => (
          <NavItem
            key={it.key}
            label={it.label}
            icon={<Ic d={it.icon} size={16} />}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.sideFoot}>
        <div className={styles.avatar}>JB</div>
        <div className={styles.whoInfo}>
          <span className={styles.whoName}>J. Bauer</span>
          <span className={styles.whoId}>JB38388</span>
        </div>
        <button className={styles.iconBtn} title="Log out">
          <Ic d={IC.Logout} size={14} />
        </button>
      </div>
    </aside>
  )
}

/* ─── Topbar ────────────────────────────────────────────────── */
function Topbar({ collapsed, onExpand, theme, onToggleTheme }: {
  collapsed: boolean
  onExpand: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}) {
  return (
    <div className={styles.topbar}>
      {collapsed && (
        <button className={styles.iconBtn} onClick={onExpand} title="Show sidebar"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <Ic d={IC.SidebarExpand} size={14} />
        </button>
      )}
      <div className={styles.crumbs}>
        <span>Workspace</span>
        <span className={styles.crumbSep}>/</span>
        <span>Approvals</span>
        <span className={styles.crumbSep}>/</span>
        <b>Worktime</b>
      </div>
      <div className={styles.topSpacer} />
      <div className={styles.searchBar}>
        <Ic d={IC.Search} size={13} style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
        <input placeholder="Search employees, IDs…" className={styles.searchInput} />
        <kbd className={styles.kbd}>⌘K</kbd>
      </div>
      <button className={styles.iconBtn} onClick={onToggleTheme} title="Toggle theme">
        <Ic d={theme === 'dark' ? IC.Sun : IC.Moon} size={14} />
      </button>
      <button className={styles.iconBtnBadge} title="Notifications">
        <Ic d={IC.Bell} size={14} />
        <span className={styles.notifDot} />
      </button>
      <button className={styles.iconBtn} title="Help">
        <Ic d={IC.Help} size={14} />
      </button>
    </div>
  )
}

/* ─── Drawer ────────────────────────────────────────────────── */
function Drawer({ row, month, onClose, onAction }: {
  row: Row | null
  month: number
  onClose: () => void
  onAction: (id: string, action: string) => void
}) {
  const open = row !== null
  const calCells = useMemo(() => makeCalendar(month), [month])
  const daily = useMemo(() => row ? makeDailyEntries(row) : [], [row])

  const statusMeta: Record<RowStatus, { label: string; cls: string }> = {
    Open:     { label: 'Open',     cls: styles.chipOpen },
    Locked:   { label: 'Locked',   cls: styles.chipLocked },
    Alert:    { label: 'Alert',    cls: styles.chipAlert },
    Approved: { label: 'Approved', cls: styles.chipApproved },
  }

  return (
    <>
      <div className={[styles.scrim, open ? styles.scrimOpen : ''].join(' ')} onClick={onClose} />
      <div className={[styles.drawer, open ? styles.drawerOpen : ''].join(' ')}>
        {row && (
          <>
            {/* Header */}
            <div className={styles.drawerHd}>
              <div className={styles.drawerAv} style={{ background: row.avatarBg }}>{row.name.initials}</div>
              <div className={styles.drawerMeta}>
                <b>{row.name.full}</b>
                <span>{row.id} · {row.department} · {row.location}</span>
              </div>
              <div className={[styles.statusPill, statusMeta[row.status].cls].join(' ')}>
                {row.status}
              </div>
              <button className={styles.iconBtn} onClick={onClose}><Ic d={IC.X} size={14} /></button>
            </div>

            {/* Body */}
            <div className={styles.drawerBody}>
              {/* Summary cards */}
              <div className={styles.summaryGrid}>
                {[
                  { l: 'WORKED',   v: `${Math.round(row.hours)}h` },
                  { l: 'TARGET',   v: `${row.target}h` },
                  { l: 'VACATION', v: `${row.vacations}d` },
                  { l: 'SICK',     v: `${row.sickDays}d` },
                ].map(c => (
                  <div key={c.l} className={styles.smCard}>
                    <span className={styles.smLabel}>{c.l}</span>
                    <span className={styles.smValue}>{c.v}</span>
                  </div>
                ))}
              </div>

              {/* Calendar */}
              <div className={styles.sectH}>{MONTHS[month]} 2026 — Calendar</div>
              <div className={styles.calGrid}>
                {WDAYS.map((d, i) => (
                  <div key={i} className={styles.calHeader}>{d}</div>
                ))}
                {calCells.map((c, i) => (
                  <div key={i} className={[styles.calDay, c.day === null ? styles.calEmpty : '', c.weekend ? styles.calWeekend : ''].join(' ')}>
                    {c.day ?? ''}
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className={styles.sectH}>Recent entries</div>
              <div className={styles.timeline}>
                {daily.map((e, i) => (
                  <div key={i} className={styles.tlRow}>
                    <span className={styles.tlDay}>{String(e.day).padStart(2, '0')}</span>
                    <span className={styles.tlDow}>{e.dayName}</span>
                    <span className={styles.tlHours}>{e.hours}</span>
                    <span className={styles.tlProject}>{e.project}</span>
                  </div>
                ))}
              </div>

              {/* Alert notice */}
              {row.status === 'Alert' && (
                <div className={styles.alertBox}>
                  <Ic d={IC.Alert} size={14} style={{ color: 'var(--warn)', flexShrink: 0, marginTop: 2 }} />
                  <span><b>Timesheet anomaly detected. </b>Hours are significantly below target — please review before approval.</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={styles.drawerFoot}>
              {row.status === 'Open' && <>
                <button className={styles.btnGhost} onClick={() => onAction(row.id, 'sendback')}>
                  <Ic d={IC.Send} size={12} /> Send back
                </button>
                <button className={styles.btnGhost} onClick={() => onAction(row.id, 'lock')}>
                  <Ic d={IC.Lock} size={12} /> Lock
                </button>
                <button className={styles.btnPrimary} onClick={() => onAction(row.id, 'approve')}>
                  <Ic d={IC.Check} size={12} /> Approve &amp; lock
                </button>
              </>}
              {row.status === 'Approved' && <>
                <button className={styles.btnGhost} onClick={() => onAction(row.id, 'unlock')}>
                  <Ic d={IC.Unlock} size={12} /> Reopen
                </button>
                <button className={styles.btnPrimary} onClick={() => exportPayrollPdf({
                  id: row.id,
                  name: row.name,
                  status: row.status,
                  subtitle: `${row.department} · ${MONTHS[month]} 2026`,
                  summary: [
                    { label: 'WORKED',   value: `${Math.round(row.hours)}h` },
                    { label: 'TARGET',   value: `${row.target}h` },
                    { label: 'VACATION', value: `${row.vacations}d` },
                    { label: 'SICK',     value: `${row.sickDays}d` },
                  ],
                  dailyEntries: daily,
                })}>
                  <Ic d={IC.Upload} size={12} /> Export to payroll
                </button>
              </>}
              {row.status === 'Locked' && <>
                <button className={styles.btnGhost} onClick={() => onAction(row.id, 'unlock')}>
                  <Ic d={IC.Unlock} size={12} /> Unlock
                </button>
                <button className={styles.btnPrimary} onClick={() => exportPayrollPdf({
                  id: row.id,
                  name: row.name,
                  status: row.status,
                  subtitle: `${row.department} · ${MONTHS[month]} 2026`,
                  summary: [
                    { label: 'WORKED',   value: `${Math.round(row.hours)}h` },
                    { label: 'TARGET',   value: `${row.target}h` },
                    { label: 'VACATION', value: `${row.vacations}d` },
                    { label: 'SICK',     value: `${row.sickDays}d` },
                  ],
                  dailyEntries: daily,
                })}>
                  <Ic d={IC.Download} size={12} /> Download report
                </button>
              </>}
              {row.status === 'Alert' && <>
                <button className={styles.btnGhost} onClick={() => onAction(row.id, 'sendback')}>
                  <Ic d={IC.Send} size={12} /> Send back
                </button>
                <button className={styles.btnPrimary} onClick={() => onAction(row.id, 'approve')}>
                  <Ic d={IC.Check} size={12} /> Approve anyway
                </button>
              </>}
            </div>
          </>
        )}
      </div>
    </>
  )
}

/* ─── Toast list ────────────────────────────────────────────── */
function ToastList({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className={styles.toasts}>
      {toasts.map(t => (
        <div key={t.id} className={styles.toast}>
          <Ic d={IC.Check} size={14} style={{ color: 'var(--good)' }} />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Table row ─────────────────────────────────────────────── */
function TblRow({ row, month, selected, onSelect, onAction }: {
  row: Row
  month: number
  selected: boolean
  onSelect: (id: string) => void
  onAction: (id: string, action: string, e: React.MouseEvent) => void
}) {
  const pct = row.target ? Math.min(1, row.hours / row.target) : 0
  const state = hoursState(row.hours, row.target)

  return (
    <div
      className={[styles.tblRow, selected ? styles.tblRowSelected : ''].join(' ')}
      onClick={() => onSelect(row.id)}
    >
      {/* Status */}
      <div className={styles.rowStatus}>
        <StatusChip status={row.status} />
      </div>

      {/* User */}
      <div className={styles.rowUser}>
        <div className={styles.rowAv} style={{ background: row.avatarBg }}>{row.name.initials}</div>
        <div className={styles.rowNm}>
          <b>{row.name.full}</b>
          <span>{row.id} · {row.department}</span>
        </div>
      </div>

      {/* Period */}
      <div className={[styles.rowMonth, styles.colPeriod].join(' ')}>
        {MONTHS[month]} <span className={styles.yr}>2026</span>
      </div>

      {/* Vacation */}
      <div className={[styles.numCell, styles.colVac, row.vacations === 0 ? styles.numZero : ''].join(' ')}>
        {row.vacations}
      </div>

      {/* Holiday */}
      <div className={[styles.numCell, styles.colHol, row.holidays === 0 ? styles.numZero : ''].join(' ')}>
        {row.holidays}
      </div>

      {/* Sick days */}
      <div className={[styles.numCell, styles.colSick, row.sickDays === 0 ? styles.numZero : row.sickDays > 10 ? styles.numWarn : ''].join(' ')}>
        {row.sickDays}
      </div>

      {/* Hours */}
      <div className={styles.hoursCell}>
        <HoursBar state={state} hours={fmtHours(row.hours)} fill={pct} />
      </div>

      {/* Actions */}
      <div className={styles.rowActions} onClick={e => e.stopPropagation()}>
        {row.status === 'Open' && <>
          <button className={styles.act} title="Lock" onClick={e => onAction(row.id, 'lock', e)}>
            <Ic d={IC.Lock} size={14} />
          </button>
          <button className={[styles.act, styles.actPrimary].join(' ')} title="Approve & lock" onClick={e => onAction(row.id, 'approve', e)}>
            <Ic d={IC.Check} size={14} />
          </button>
        </>}
        {row.status === 'Alert' && <>
          <button className={styles.act} title="View">
            <Ic d={IC.Eye} size={14} />
          </button>
          <button className={[styles.act, styles.actPrimary].join(' ')} title="Send back" onClick={e => onAction(row.id, 'sendback', e)}>
            <Ic d={IC.Send} size={14} />
          </button>
        </>}
        {row.status === 'Locked' && <>
          <button className={styles.act} title="Unlock" onClick={e => onAction(row.id, 'unlock', e)}>
            <Ic d={IC.Unlock} size={14} />
          </button>
          <button className={styles.act} title="Export">
            <Ic d={IC.Upload} size={14} />
          </button>
        </>}
        {row.status === 'Approved' && <>
          <button className={styles.act} title="Lock" onClick={e => onAction(row.id, 'lock', e)}>
            <Ic d={IC.Lock} size={14} />
          </button>
          <button className={styles.act} title="More">
            <Ic d={IC.More} size={14} />
          </button>
        </>}
      </div>
    </div>
  )
}

/* ─── Main component ────────────────────────────────────────── */
export function WorktimeApprovals() {
  const [rows, setRows] = useState<Row[]>(ALL_ROWS)
  const [tab, setTab] = useState<'all'|'open'|'alert'|'approved'|'locked'>('all')
  const [openedOnly, setOpenedOnly] = useState(false)
  const [month, setMonth] = useState(3)  // April
  const [monthOpen, setMonthOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sort, setSort] = useState<{ key: string; dir: 'asc'|'desc' }>({ key: 'user', dir: 'asc' })
  const [toasts, setToasts] = useState<ToastItem[]>([])
  // Default to collapsed on mobile (< 900px)
  const [collapsed, setCollapsed] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 900 : false
  )
  const [theme, setTheme] = useState<'light'|'dark'>('light')
  const [page, setPage] = useState(1)

  const counts = useMemo(() => ({
    pending:  rows.filter(r => r.status === 'Open').length,
    approved: rows.filter(r => r.status === 'Approved').length,
    locked:   rows.filter(r => r.status === 'Locked').length,
    alerts:   rows.filter(r => r.status === 'Alert').length,
  }), [rows])

  const filtered = useMemo(() => {
    let r = rows
    if (tab !== 'all') r = r.filter(x => x.status.toLowerCase() === tab)
    if (openedOnly) r = r.filter(x => x.status === 'Open' || x.status === 'Alert')
    if (query.trim()) {
      const q = query.toLowerCase()
      r = r.filter(x => x.id.toLowerCase().includes(q) || x.name.full.toLowerCase().includes(q) || x.department.toLowerCase().includes(q))
    }
    const dir = sort.dir === 'asc' ? 1 : -1
    const keyfn: Record<string, (x: Row) => string|number> = {
      user:  x => x.name.full,
      hours: x => x.hours,
    }
    const fn = keyfn[sort.key] ?? ((x: Row) => x.name.full)
    return [...r].sort((a, b) => {
      const av = fn(a), bv = fn(b)
      return av < bv ? -1 * dir : av > bv ? 1 * dir : 0
    })
  }, [rows, tab, openedOnly, query, sort])

  const addToast = useCallback((msg: string) => {
    const id = ++_tid
    setToasts(ts => [...ts, { id, msg }])
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 2200)
  }, [])

  const onAction = useCallback((id: string, action: string) => {
    setRows(rs => rs.map(r => {
      if (r.id !== id) return r
      const next: Record<string, RowStatus> = { approve: 'Approved', lock: 'Locked', unlock: 'Open', sendback: 'Open' }
      return next[action] ? { ...r, status: next[action] } : r
    }))
    const msgs: Record<string, string> = {
      approve: 'Timesheet approved & locked',
      lock: 'Timesheet locked',
      unlock: 'Timesheet reopened',
      sendback: 'Sent back for revision',
    }
    addToast(msgs[action] ?? 'Updated')
  }, [addToast])

  const onRowAction = useCallback((id: string, action: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onAction(id, action)
  }, [onAction])

  const approveAllOpen = useCallback(() => {
    const n = rows.filter(r => r.status === 'Open').length
    setRows(rs => rs.map(r => r.status === 'Open' ? { ...r, status: 'Approved' } : r))
    addToast(`${n} timesheets approved & locked`)
  }, [rows, addToast])

  const selectedRow = rows.find(r => r.id === selectedId) ?? null

  const TABS = [
    { key: 'all',      label: 'All',      count: rows.length,     dot: false, dotColor: '' },
    { key: 'open',     label: 'Open',     count: counts.pending,  dot: true, dotColor: 'var(--accent)' },
    { key: 'alert',    label: 'Alert',    count: counts.alerts,   dot: true, dotColor: 'var(--warn)' },
    { key: 'approved', label: 'Approved', count: counts.approved, dot: true, dotColor: 'var(--good)' },
    { key: 'locked',   label: 'Locked',   count: counts.locked,   dot: true, dotColor: 'var(--locked)' },
  ] as const

  return (
    <div className={[styles.layout, theme === 'dark' ? styles.dark : ''].join(' ')}>
      <div className={[styles.shell, collapsed ? styles.shellCollapsed : ''].join(' ')}>

        {/* Mobile scrim — shown when sidebar open on small screens */}
        {!collapsed && (
          <div className={styles.mobileSidebarScrim} onClick={() => setCollapsed(true)} />
        )}

        <Sidebar counts={counts} collapsed={collapsed} onCollapse={() => setCollapsed(true)} />

        <div className={styles.main}>

          <Topbar
            collapsed={collapsed}
            onExpand={() => setCollapsed(false)}
            theme={theme}
            onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          />

          <div className={styles.page}>

            {/* ── Page head ── */}
            <div className={styles.pageHead}>
              <div>
                <h1 className={styles.pageTitle}>Worktime Approvals</h1>
                <p className={styles.pageSub}>
                  Showing <b style={{ color: 'var(--ink-2)' }}>{counts.pending} pending</b> · Period{' '}
                  <b style={{ color: 'var(--ink-2)' }}>{MONTHS[month]} 2026</b>
                </p>
              </div>
              <div className={styles.pillTabs} role="tablist" aria-label="Filter timesheets">
                {TABS.map(tb => (
                  <PillTab
                    key={tb.key}
                    label={tb.label}
                    count={tb.count}
                    dot={tb.dot}
                    dotColor={tb.dotColor}
                    active={tab === tb.key}
                    onClick={() => setTab(tb.key as typeof tab)}
                  />
                ))}
              </div>
            </div>

            {/* ── Stats ── */}
            <div className={styles.statsGrid}>
              <StatCard kind="Pending"  value={counts.pending}  delta="+3"  deltaPositive />
              <StatCard kind="Approved" value={counts.approved} delta="+12" deltaPositive />
              <StatCard kind="Locked"   value={counts.locked}   delta="+1"  deltaPositive />
              <StatCard kind="Alerts"   value={counts.alerts}   delta="-1"  deltaPositive={false} />
            </div>

            {/* ── Filters ── */}
            <div className={styles.filters}>
              <Toggle label="Opened only" checked={openedOnly} onChange={setOpenedOnly} />

              {/* Month picker */}
              <div style={{ position: 'relative' }}>
                <button className={styles.monthPick} onClick={() => setMonthOpen(o => !o)}>
                  <Ic d={IC.Calendar} size={13} style={{ color: 'var(--ink-3)' }} />
                  <span className={styles.monthLabel}>Period</span>
                  <b>{MONTHS[month]} 2026</b>
                  <Ic d={IC.ChevDown} size={11} style={{ color: 'var(--ink-3)' }} />
                </button>
                {monthOpen && (
                  <div className={styles.monthMenu}>
                    {MONTHS_SHORT.map((m, i) => (
                      <button
                        key={i}
                        className={[styles.monthOpt, i === month ? styles.monthOptActive : ''].join(' ')}
                        onClick={() => { setMonth(i); setMonthOpen(false) }}
                      >{m}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Seg control */}
              <div className={styles.seg}>
                <button className={[styles.segOpt, styles.segOptActive].join(' ')}>
                  <Ic d={IC.Filter} size={11} /> List
                </button>
                <button className={styles.segOpt}>
                  <Ic d={IC.Calendar} size={11} /> Calendar
                </button>
                <button className={styles.segOpt}>
                  <Ic d={IC.TrendUp} size={11} /> Chart
                </button>
              </div>

              {/* Filter search */}
              <div className={styles.filterSearch}>
                <Ic d={IC.Search} size={12} style={{ color: 'var(--ink-3)' }} />
                <input
                  placeholder="Filter by employee…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className={styles.filterSearchInput}
                />
              </div>

              <div style={{ flex: 1 }} />

              <button className={styles.btnGhost}>
                <Ic d={IC.Download} size={12} /> Export
              </button>
              <button className={styles.btnPrimary} onClick={approveAllOpen}>
                <Ic d={IC.Check} size={12} /> Approve all open
              </button>
            </div>

            {/* ── Table ── */}
            <div className={styles.tblWrap} role="table" aria-label="Worktime approvals">
              {/* Head */}
              <div role="rowgroup">
                <div className={styles.tblHead} role="row">
                  <div role="columnheader"><span style={{position:'absolute',width:1,height:1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap'}}>Status</span></div>
                  <div
                    role="columnheader"
                    className={styles.sortable}
                    onClick={() => setSort(s => ({ key: 'user', dir: s.key === 'user' && s.dir === 'asc' ? 'desc' : 'asc' }))}
                  >
                    {sort.key === 'user' && <Ic d={sort.dir === 'asc' ? IC.ArrowUp : IC.ArrowDn} size={11} style={{ color: 'var(--accent)' }} />}
                    <span>Employee</span>
                  </div>
                  <div role="columnheader" className={styles.colPeriod}>Period</div>
                  <div role="columnheader" className={[styles.numHead, styles.colVac].join(' ')}>Vac.</div>
                  <div role="columnheader" className={[styles.numHead, styles.colHol].join(' ')}>Hol.</div>
                  <div role="columnheader" className={[styles.numHead, styles.colSick].join(' ')}>Sick</div>
                  <div
                    role="columnheader"
                    className={[styles.numHead, styles.sortable].join(' ')}
                    onClick={() => setSort(s => ({ key: 'hours', dir: s.key === 'hours' && s.dir === 'asc' ? 'desc' : 'asc' }))}
                  >
                    {sort.key === 'hours' && <Ic d={sort.dir === 'asc' ? IC.ArrowUp : IC.ArrowDn} size={11} style={{ color: 'var(--accent)' }} />}
                    <span>Hours</span>
                  </div>
                  <div role="columnheader"><span style={{position:'absolute',width:1,height:1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap'}}>Actions</span></div>
                </div>
              </div>

              {/* Rows */}
              <div role="rowgroup">
              {filtered.length === 0 ? (
                <div role="row">
                  <div role="cell" className={styles.empty}>No timesheets match the current filter.</div>
                </div>
              ) : filtered.map(r => (
                  <TblRow
                    key={r.id + '-' + r.status}
                    row={r}
                    month={month}
                    selected={selectedId === r.id}
                    onSelect={id => setSelectedId(prev => prev === id ? null : id)}
                    onAction={onRowAction}
                  />
              ))}
              </div>
            </div>{/* /role=table */}

            {/* Footer — intentionally outside role=table */}
            <div className={styles.tblFoot}>
                <span>Showing <b style={{ color: 'var(--ink)' }}>{filtered.length}</b> of {rows.length} timesheets</span>
                <div className={styles.pager}>
                  <button className={styles.pg} onClick={() => setPage(p => Math.max(1, p - 1))} aria-label="Previous page">
                    <Ic d={IC.ChevLeft} size={11} />
                  </button>
                  {[1, 2, 3].map(p => (
                    <button
                      key={p}
                      className={[styles.pg, page === p ? styles.pgActive : ''].join(' ')}
                      onClick={() => setPage(p)}
                    >{p}</button>
                  ))}
                  <button className={styles.pg} onClick={() => setPage(p => Math.min(3, p + 1))} aria-label="Next page">
                    <Ic d={IC.ChevRight} size={11} />
                  </button>
                </div>
              </div>

          </div>{/* /page */}
        </div>{/* /main */}
      </div>{/* /shell */}

      <Drawer
        row={selectedRow}
        month={month}
        onClose={() => setSelectedId(null)}
        onAction={(id, action) => { onAction(id, action); setSelectedId(null) }}
      />

      <ToastList toasts={toasts} />
    </div>
  )
}
