import type { Meta, StoryObj } from '@storybook/react'
import { TableRow } from './TableRow'

const meta: Meta<typeof TableRow> = {
  title: 'Worktime/TableRow',
  component: TableRow,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg-default,#e8f0f7)', padding: 0 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof meta>

const BASE = {
  id: 'AS02007',
  name: { full: 'Jordan Davis', initials: 'JD' },
  avatarBg: 'linear-gradient(135deg,oklch(68% 0.12 260),oklch(48% 0.14 305))',
  period: 'May 2026',
  department: 'Engineering',
  target: 168,
}

export const Open: Story = {
  args: { ...BASE, status: 'Open', hours: 140, vacations: 0, holidays: 1, sickDays: 0 },
}

export const Alert: Story = {
  args: { ...BASE, status: 'Alert', hours: 96, vacations: 1, holidays: 0, sickDays: 0 },
}

export const Approved: Story = {
  args: { ...BASE, status: 'Approved', hours: 168, vacations: 0, holidays: 1, sickDays: 0 },
}

export const Locked: Story = {
  args: { ...BASE, status: 'Locked', hours: 0 },
}

export const Selected: Story = {
  args: { ...BASE, status: 'Open', hours: 155, selected: true },
}

export const HighSick: Story = {
  args: { ...BASE, status: 'Alert', hours: 32, sickDays: 30, selected: false },
}
