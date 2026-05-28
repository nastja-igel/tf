import type { Meta, StoryObj } from '@storybook/react'
import { PillTab } from './PillTab'

const meta: Meta<typeof PillTab> = {
  title: 'Navigation/PillTab',
  component: PillTab,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
  },
  argTypes: {
    active:   { control: 'boolean' },
    dot:      { control: 'boolean' },
    dotColor: { control: 'color' },
    label:    { control: 'text' },
    count:    { control: 'number' },
  },
  args: { label: 'All', count: 24 },
}
export default meta
type Story = StoryObj<typeof meta>

/* ── Base states ─────────────────────────────────────────────── */

export const Default: Story = {}
export const Active: Story  = { args: { active: true } }

/* ── Worktime status presets ─────────────────────────────────── */

export const AllTab: Story = {
  name: 'Status — All',
  args: { label: 'All', count: 24, active: true },
}

export const OpenTab: Story = {
  name: 'Status — Open',
  args: { label: 'Open', count: 8, dot: true, dotColor: 'var(--accent)' },
}

export const NeedsReviewTab: Story = {
  name: 'Status — Needs Review',
  args: { label: 'Needs Review', count: 5, dot: true, dotColor: 'var(--warn)' },
}

export const ApprovedTab: Story = {
  name: 'Status — Approved',
  args: { label: 'Approved', count: 6, dot: true, dotColor: 'var(--good)' },
}

export const LockedTab: Story = {
  name: 'Status — Locked',
  args: { label: 'Locked', count: 5, dot: true, dotColor: 'var(--locked)' },
}

/* ── Dot colour variants ──────────────────────────────────────── */

export const WithDot: Story      = { args: { dot: true } }
export const ActiveDot: Story    = { args: { active: true, dot: true } }
export const NoCount: Story      = { args: { label: 'All', count: undefined } }

/* ── Full worktime tab bar ────────────────────────────────────── */

export const WorktimeTabBar: Story = {
  name: 'Worktime — Full tab bar',
  render: () => (
    <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: 'rgba(255,255,255,.3)', borderRadius: 12 }}>
      <PillTab label="All"          count={24} active />
      <PillTab label="Open"         count={8}  dot dotColor="var(--accent)" />
      <PillTab label="Needs Review" count={5}  dot dotColor="var(--warn)" />
      <PillTab label="Approved"     count={6}  dot dotColor="var(--good)" />
      <PillTab label="Locked"       count={5}  dot dotColor="var(--locked)" />
    </div>
  ),
}
