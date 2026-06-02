import type { Meta, StoryObj } from '@storybook/react'
import { StatusChip } from '../components/StatusChip/StatusChip'
import type { StatusChipKind } from '../components/StatusChip/StatusChip'

// ── data ───────────────────────────────────────────────────────────
const STATUSES: { kind: StatusChipKind; label: string; description: string; when: string }[] = [
  {
    kind: 'Open',
    label: 'Open',
    description: 'Timesheet submitted and awaiting review.',
    when: 'Employee submitted hours; manager has not yet acted.',
  },
  {
    kind: 'Alert',
    label: 'Alert',
    description: 'Hours outside expected range — needs attention.',
    when: 'Worked hours differ significantly from target (under or over).',
  },
  {
    kind: 'Approved',
    label: 'Approved',
    description: 'Timesheet reviewed and accepted.',
    when: 'Manager approved the submitted hours. Final state.',
  },
  {
    kind: 'Locked',
    label: 'Locked',
    description: 'Record is locked — no further edits allowed.',
    when: 'Period closed or record exported. Read-only.',
  },
]

// ── row ────────────────────────────────────────────────────────────
function StatusRow({ kind, label, description, when }: typeof STATUSES[0]) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '48px 120px 1fr 1fr',
      gap: 24,
      alignItems: 'start',
      padding: '16px 0',
      borderBottom: '1px solid rgba(20,40,70,0.07)',
    }}>
      {/* icon chip */}
      <StatusChip status={kind} variant="icon" />
      {/* text chip */}
      <StatusChip status={kind} variant="text" />
      {/* description */}
      <div style={{ fontSize: 13, color: '#373b40', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.5 }}>
        {description}
      </div>
      {/* when */}
      <div style={{ fontSize: 12, color: '#575e66', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.5 }}>
        {when}
      </div>
    </div>
  )
}

function StatusSetPage() {
  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif', padding: '32px 40px 64px', maxWidth: 1100 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#161616', marginBottom: 6 }}>Status Set</h1>
      <p style={{ fontSize: 14, color: '#575e66', marginBottom: 40, lineHeight: 1.6 }}>
        Four statuses cover the full lifecycle of a timesheet approval. Each has an icon variant (32×32) and a text variant (pill with label).
      </p>

      {/* header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '48px 120px 1fr 1fr',
        gap: 24,
        padding: '8px 0',
        borderBottom: '2px solid rgba(20,40,70,0.1)',
        marginBottom: 4,
      }}>
        {['Icon', 'Text', 'Description', 'When to show'].map(h => (
          <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#80878f', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {h}
          </div>
        ))}
      </div>

      {STATUSES.map(s => <StatusRow key={s.kind} {...s} />)}

      {/* color reference */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#161616', margin: '48px 0 16px', paddingBottom: 10, borderBottom: '1px solid rgba(20,40,70,0.08)' }}>
        Token reference
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { kind: 'Open',     fg: '--text-accent',   bg: '--accent-2',  border: 'rgba(74,63,203,.22)' },
          { kind: 'Alert',    fg: '--text-warning',  bg: '--warn-bg',   border: '--warn' },
          { kind: 'Approved', fg: '--text-success',  bg: '--good-bg',   border: '--good' },
          { kind: 'Locked',   fg: '--text-disabled', bg: '--locked-bg', border: '--border-subtle' },
        ].map(({ kind, fg, bg, border }) => (
          <div key={kind} style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#161616', marginBottom: 10 }}>{kind}</div>
            {[
              ['foreground', fg],
              ['background', bg],
              ['border', border],
            ].map(([role, token]) => (
              <div key={role} style={{ fontSize: 11, color: '#575e66', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>
                <span style={{ color: '#9da6ae' }}>{role}: </span>{token}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── meta ───────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Patterns/Status',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: `
The four status values used across the worktime approvals system.

\`Open → Alert → Approved | Locked\`

### Rules
- Use **icon variant** in table rows (compact, always 32×32).
- Use **text variant** in drawers, detail panels, and anywhere a label adds clarity.
- Never invent custom status values — all business states map to one of these four.
- Status pairs: always use matching foreground/background tokens (never mix across statuses).
        `,
      },
    },
  },
}
export default meta
type Story = StoryObj

export const AllStatuses: Story = {
  name: 'All Statuses',
  render: () => <StatusSetPage />,
}

// Individual exports for autodocs
export const Open: Story = {
  render: () => <div style={{ display: 'flex', gap: 12, padding: 24 }}>
    <StatusChip status="Open" variant="icon" />
    <StatusChip status="Open" variant="text" />
  </div>,
}
export const Alert: Story = {
  render: () => <div style={{ display: 'flex', gap: 12, padding: 24 }}>
    <StatusChip status="Alert" variant="icon" />
    <StatusChip status="Alert" variant="text" />
  </div>,
}
export const Approved: Story = {
  render: () => <div style={{ display: 'flex', gap: 12, padding: 24 }}>
    <StatusChip status="Approved" variant="icon" />
    <StatusChip status="Approved" variant="text" />
  </div>,
}
export const Locked: Story = {
  render: () => <div style={{ display: 'flex', gap: 12, padding: 24 }}>
    <StatusChip status="Locked" variant="icon" />
    <StatusChip status="Locked" variant="text" />
  </div>,
}
