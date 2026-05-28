import type { Meta, StoryObj } from '@storybook/react'
import { PillTab } from './PillTab'
import type { PillTabVariant } from './PillTab'

const meta: Meta<typeof PillTab> = {
  title: 'Navigation/PillTab',
  component: PillTab,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Pill-shaped filter tab with an optional count badge and status dot. Groups of PillTabs form the status filter bar above the worktime approvals table.

- Use \`variant\` for preset status tabs — sets the label and dot color automatically.
- \`active\` highlights the currently selected tab (one active tab per bar).
- \`count\` shows the number of records matching that filter.

| Variant | Label | Dot color |
|---|---|---|
| \`open\` | Open | Accent (indigo) |
| \`needs-review\` | Needs Review | Amber |
| \`approved\` | Approved | Green |
| \`locked\` | Locked | Gray |

Without \`variant\`, pass \`label\` + \`dot\` manually (e.g. the "All" catch-all tab has no dot).

### Accessibility
- Currently renders as a plain \`<button>\` — for full tab semantics, wrap the group in \`role="tablist"\` and give each PillTab \`role="tab"\` and \`aria-selected\` at the consumer level.
- The status dot is \`aria-hidden="true"\` — status meaning is also communicated by the label text (set via \`variant\`), so color is not the sole indicator.
- Count badge is visible text — consider appending it to the \`aria-label\` (e.g. \`"Open, 8 items"\`) for screen readers that don't linearize adjacent text naturally.
      `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'open', 'needs-review', 'approved', 'locked'] satisfies (PillTabVariant | undefined)[],
      description: 'Preset status variant — sets label and dot colour automatically',
      table: { defaultValue: { summary: '—' } },
    },
    active:   { control: 'boolean' },
    count:    { control: 'number' },
    dot:      { control: 'boolean' },
    dotColor: { table: { disable: true } },
    label:    { table: { disable: true } },
  },
  args: { label: 'All', count: 24 },
}
export default meta
type Story = StoryObj<typeof meta>

/* ── Base ─────────────────────────────────────────────────────── */

export const Default: Story = {}
export const Active: Story  = { args: { active: true } }

/* ── Status variants (via variant prop) ──────────────────────── */

export const Open: Story = {
  name: 'Variant — Open',
  args: { variant: 'open', count: 8 },
}

export const NeedsReview: Story = {
  name: 'Variant — Needs Review',
  args: { variant: 'needs-review', count: 5 },
}

export const Approved: Story = {
  name: 'Variant — Approved',
  args: { variant: 'approved', count: 6 },
}

export const Locked: Story = {
  name: 'Variant — Locked',
  args: { variant: 'locked', count: 5 },
}

/* ── Manual dot (no variant) ──────────────────────────────────── */

export const WithDot: Story   = { args: { dot: true } }
export const ActiveDot: Story = { args: { active: true, dot: true } }
export const NoCount: Story   = { args: { label: 'All', count: undefined } }

/* ── Full worktime tab bar ────────────────────────────────────── */

export const WorktimeTabBar: Story = {
  name: 'Worktime — Full tab bar',
  render: () => (
    <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: 'rgba(255,255,255,.3)', borderRadius: 12 }}>
      <PillTab label="All" count={24} active />
      <PillTab variant="open"         count={8} />
      <PillTab variant="needs-review" count={5} />
      <PillTab variant="approved"     count={6} />
      <PillTab variant="locked"       count={5} />
    </div>
  ),
}
