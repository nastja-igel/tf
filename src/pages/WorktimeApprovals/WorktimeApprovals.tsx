import { useState } from 'react'
import { NavItem } from '../../components/NavItem/NavItem'
import { StatCard } from '../../components/StatCard/StatCard'
import { StatusChip } from '../../components/StatusChip/StatusChip'
import { HoursBar } from '../../components/HoursBar/HoursBar'
import { ActionBtn } from '../../components/ActionBtn/ActionBtn'
import { PillTab } from '../../components/PillTab/PillTab'
import { SegOption } from '../../components/SegOption/SegOption'
import { Toggle } from '../../components/Toggle/Toggle'
import { PagerBtn } from '../../components/PagerBtn/PagerBtn'
import { IconBtn } from '../../components/IconBtn/IconBtn'
import type { StatusChipKind } from '../../components/StatusChip/StatusChip'
import type { HoursBarState } from '../../components/HoursBar/HoursBar'
import styles from './WorktimeApprovals.module.css'

/* ── Demo data ──────────────────────────────── */
interface Row {
  id: number
  name: string
  department: string
  status: StatusChipKind
  hours: string
  hoursState: HoursBarState
  fill: number
  week: string
}

const ROWS: Row[] = [
  { id: 1, name: 'Anna Kowalski',    department: 'Engineering', status: 'Open',     hours: '183:00', hoursState: 'good',   fill: 0.98, week: 'W22' },
  { id: 2, name: 'Ben Fischer',      department: 'Design',      status: 'Open',     hours: '140:00', hoursState: 'normal', fill: 0.75, week: 'W22' },
  { id: 3, name: 'Clara Müller',     department: 'Marketing',   status: 'Alert',    hours: '103:00', hoursState: 'warn',   fill: 0.55, week: 'W22' },
  { id: 4, name: 'David Schmitt',    department: 'Engineering', status: 'Approved', hours: '160:00', hoursState: 'good',   fill: 0.86, week: 'W22' },
  { id: 5, name: 'Eva Novak',        department: 'HR',          status: 'Locked',   hours: '00:00',  hoursState: 'empty',  fill: 0,    week: 'W22' },
  { id: 6, name: 'Frank Weber',      department: 'Finance',     status: 'Open',     hours: '155:30', hoursState: 'normal', fill: 0.83, week: 'W22' },
  { id: 7, name: 'Greta Hoffmann',   department: 'Engineering', status: 'Alert',    hours: '98:00',  hoursState: 'warn',   fill: 0.52, week: 'W22' },
  { id: 8, name: 'Hans Braun',       department: 'Design',      status: 'Approved', hours: '176:00', hoursState: 'good',   fill: 0.94, week: 'W22' },
]

const TABS = [
  { label: 'All',      count: 24 },
  { label: 'Open',     count: 12, dot: true, dotColor: 'var(--accent)' },
  { label: 'Alerts',   count: 5,  dot: true, dotColor: 'var(--warn)' },
  { label: 'Approved', count: 64, dot: true, dotColor: 'var(--good)' },
  { label: 'Locked',   count: 12, dot: true, dotColor: 'var(--locked)' },
]

export function WorktimeApprovals() {
  const [activeTab, setActiveTab] = useState(0)
  const [view, setView]           = useState<'List' | 'Grid'>('List')
  const [openedOnly, setOpenedOnly] = useState(false)
  const [activePage, setActivePage] = useState(1)

  const filteredRows = ROWS.filter(r => {
    if (openedOnly && r.status !== 'Open') return false
    if (activeTab === 0) return true
    const tabLabel = TABS[activeTab].label
    return r.status === tabLabel
  })

  return (
    <div className={styles.layout}>
      {/* ── Sidebar ─────────────────────────────── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo} aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="17" stroke="#334155" strokeWidth="2.5"/>
            <circle cx="20" cy="20" r="11" stroke="#94A3B8" strokeWidth="2.5"/>
            <line x1="20" y1="20" x2="20" y2="12" stroke="#334155" strokeWidth="2"/>
            <line x1="20" y1="20" x2="26" y2="24" stroke="#334155" strokeWidth="2"/>
            <circle cx="20" cy="20" r="1.5" fill="#334155"/>
          </svg>
        </div>
        <nav className={styles.sidebarNav}>
          <NavItem label="Worktime"  active count={12} />
          <NavItem label="Approvals" />
          <NavItem label="Reports"   />
          <NavItem label="Settings"  />
        </nav>
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <main className={styles.main}>

        {/* Top bar */}
        <header className={styles.topBar}>
          <div className={styles.topBarTitle}>
            <h1 className={styles.pageTitle}>Worktime Approvals</h1>
            <p className={styles.pageSubtitle}>Week 22 · May 2026</p>
          </div>
          <div className={styles.topBarActions}>
            <Toggle label="Opened only" checked={openedOnly} onChange={setOpenedOnly} />
            <IconBtn badge={5} />
          </div>
        </header>

        {/* Stat cards */}
        <section className={styles.stats}>
          <StatCard kind="Pending"  value={28} delta="+3"  deltaPositive />
          <StatCard kind="Approved" value={64} delta="+12" deltaPositive />
          <StatCard kind="Locked"   value={12} delta="+1"  deltaPositive />
          <StatCard kind="Alerts"   value={5}  delta="-1"  deltaPositive={false} />
        </section>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.tabs}>
            {TABS.map((t, i) => (
              <PillTab
                key={t.label}
                label={t.label}
                count={t.count}
                dot={t.dot}
                dotColor={t.dotColor}
                active={activeTab === i}
                onClick={() => setActiveTab(i)}
              />
            ))}
          </div>
          <div className={styles.segControl}>
            {(['List', 'Grid'] as const).map(v => (
              <SegOption key={v} label={v} active={view === v} onClick={() => setView(v)} />
            ))}
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Employee</th>
                <th className={styles.th}>Department</th>
                <th className={styles.th}>Week</th>
                <th className={styles.th}>Hours</th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(row => (
                <tr key={row.id} className={styles.tr}>
                  <td className={styles.td}>
                    <StatusChip status={row.status} />
                  </td>
                  <td className={styles.td}>
                    <span className={styles.name}>{row.name}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.dept}>{row.department}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.week}>{row.week}</span>
                  </td>
                  <td className={styles.td}>
                    <HoursBar state={row.hoursState} hours={row.hours} fill={row.fill} />
                  </td>
                  <td className={styles.tdAction}>
                    {row.status === 'Open' && <ActionBtn variant="default" />}
                    {row.status === 'Alert' && <ActionBtn variant="primary" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <footer className={styles.pagination}>
          <span className={styles.pageInfo}>Showing {filteredRows.length} of 24</span>
          <div className={styles.pagerRow}>
            {[1, 2, 3, 4].map(p => (
              <PagerBtn key={p} page={p} active={activePage === p} onClick={() => setActivePage(p)} />
            ))}
          </div>
        </footer>

      </main>
    </div>
  )
}
