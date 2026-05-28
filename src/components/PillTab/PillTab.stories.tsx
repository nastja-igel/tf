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
    dot:      { control: 'boolean', description: 'Override dot visibility (auto-set by variant)' },
    dotColor: { control: 'color',   description: 'Override dot colour (auto-set by variant)' },
    label:    { control: 'text',    description: 'Override label text (auto-set by variant)' },
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
