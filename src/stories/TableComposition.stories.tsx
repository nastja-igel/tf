import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TableHead } from '../components/TableHead/TableHead'
import { TableRow } from '../components/TableRow/TableRow'
import { TableFoot } from '../components/TableFoot/TableFoot'
import type { StatusChipKind } from '../components/StatusChip/StatusChip'

// ── columns (shared with TableHead story) ──────────────────────────
const COLS = [
  { key: 'status',    label: '',           srLabel: 'Status'  },
  { key: 'user',      label: 'Employee',   sortable: true     },
  { key: 'period',    label: 'Period'                         },
  { key: 'vacations', label: 'Vac',        align: 'right' as const },
  { key: 'holidays',  label: 'Hol',        align: 'right' as const },
  { key: 'sick',      label: 'Sick',       align: 'right' as const },
  { key: 'hours',     label: 'Hours',      sortable: true     },
  { key: 'actions',   label: '',           srLabel: 'Actions' },
]

// ── sample data ────────────────────────────────────────────────────
const ROWS: Parameters<typeof TableRow>[0][] = [
  {
    id: 'AS02007', name: { full: 'Jordan Davis',    initials: 'JD' },
    avatarBg: 'linear-gradient(135deg,oklch(68% 0.12 260),oklch(48% 0.14 305))',
    status: 'Open',     period: 'Mar 2026', vacations: 0, holidays: 2, sickDays: 0, hours: 168, target: 168,
  },
  {
    id: 'AS03114', name: { full: 'Mia Hoffmann',    initials: 'MH' },
    avatarBg: 'linear-gradient(135deg,oklch(72% 0.13 340),oklch(55% 0.14 20))',
    status: 'Alert',    period: 'Mar 2026', vacations: 1, holidays: 2, sickDays: 3, hours: 140, target: 168,
  },
  {
    id: 'AS00891', name: { full: 'Carlos Reyes',    initials: 'CR' },
    avatarBg: 'linear-gradient(135deg,oklch(65% 0.14 160),oklch(50% 0.12 200))',
    status: 'Approved',  period: 'Mar 2026', vacations: 2, holidays: 2, sickDays: 0, hours: 176, target: 168,
  },
  {
    id: 'AS01255', name: { full: 'Elena Sokolova',  initials: 'ES' },
    avatarBg: 'linear-gradient(135deg,oklch(75% 0.10 280),oklch(60% 0.13 320))',
    status: 'Locked',   period: 'Feb 2026', vacations: 0, holidays: 1, sickDays: 2, hours: 152, target: 160,
  },
  {
    id: 'AS04330', name: { full: 'Tom Bergman',     initials: 'TB' },
    avatarBg: 'linear-gradient(135deg,oklch(70% 0.11 40),oklch(55% 0.13 70))',
    status: 'Open',     period: 'Mar 2026', vacations: 0, holidays: 2, sickDays: 0, hours: 80, target: 168,
  },
  {
    id: 'AS02889', name: { full: 'Priya Nair',      initials: 'PN' },
    avatarBg: 'linear-gradient(135deg,oklch(68% 0.15 120),oklch(52% 0.12 160))',
    status: 'Approved', period: 'Mar 2026', vacations: 5, holidays: 2, sickDays: 0, hours: 168, target: 168,
  },
]

// ── interactive table ──────────────────────────────────────────────
function FullTable() {
  const [selected, setSelected] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState('user')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)

  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = [...ROWS].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1
    if (sortKey === 'user')  return a.name.full.localeCompare(b.name.full) * dir
    if (sortKey === 'hours') return (a.hours - b.hours) * dir
    return 0
  })

  return (
    <div style={{ background: 'var(--color-bg-default, #e8f0f7)', padding: 0 }}>
      <div role="table" aria-label="Worktime approvals">
        <div role="rowgroup">
          <TableHead columns={COLS} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
        </div>
        <div role="rowgroup">
          {sorted.map(row => (
            <TableRow
              key={row.id}
              {...row}
              selected={selected === row.id}
              onSelect={id => setSelected(s => s === id ? null : id)}
            />
          ))}
        </div>
      </div>
      <TableFoot page={page} totalPages={4} totalItems={24} onPage={setPage} />
    </div>
  )
}

// ── meta ───────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Patterns/Table',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: `
Full worktime approvals table: \`TableHead\` + \`TableRow\` × N + \`TableFoot\`.

### Assembly
\`\`\`tsx
<div role="table" aria-label="Worktime approvals">
  <div role="rowgroup">
    <TableHead columns={COLS} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
  </div>
  <div role="rowgroup">
    {rows.map(row => <TableRow key={row.id} {...row} />)}
  </div>
</div>
<TableFoot page={page} totalPages={n} totalItems={n} onPage={setPage} />
\`\`\`

### Behavior
- **Sort** — click a sortable column header; \`sortKey\` + \`sortDir\` state lives in the parent.
- **Select** — click a row to toggle selection (accent left bar + \`aria-selected\`).
- **Actions** — each row shows context-aware buttons based on status; clicks do not trigger row selection.
- **Pagination** — \`TableFoot\` handles page navigation; data filtering is parent responsibility.
        `,
      },
    },
  },
}
export default meta
type Story = StoryObj

export const FullComposition: Story = {
  name: 'Full Table',
  render: () => <FullTable />,
}

export const AllStatusRows: Story = {
  name: 'All Status Variants',
  render: () => (
    <div style={{ background: 'var(--color-bg-default, #e8f0f7)' }}>
      <div role="table" aria-label="Status variants">
        <div role="rowgroup">
          <TableHead columns={COLS} />
        </div>
        <div role="rowgroup">
          {(['Open', 'Alert', 'Approved', 'Locked'] as StatusChipKind[]).map((status, i) => (
            <TableRow
              key={status}
              id={`DEMO${i}`}
              name={{ full: `${status} Employee`, initials: status[0] + 'E' }}
              status={status}
              period="Mar 2026"
              hours={168}
              target={168}
            />
          ))}
        </div>
      </div>
    </div>
  ),
}
