import type { Meta, StoryObj } from '@storybook/react'
import { PillTab } from './PillTab'

const meta: Meta<typeof PillTab> = {
  title: 'Navigation/PillTab',
  component: PillTab,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'glass' } },
  argTypes: {
    active:   { control: 'boolean' },
    dot:      { control: 'boolean' },
    dotColor: { control: 'color' },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story   = { args: { label: 'All', count: 24 } }
export const Active: Story    = { args: { label: 'All', count: 24, active: true } }
export const WithDot: Story   = { args: { label: 'Alert', count: 3, dot: true } }
export const ActiveDot: Story = { args: { label: 'Alert', count: 3, active: true, dot: true } }
export const NoCount: Story   = { args: { label: 'All' } }
export const CustomDotColor: Story = {
  args: { label: 'Pending', count: 7, dot: true, dotColor: '#f59e0b' },
}

export const TabBar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 6, padding: '12px 16px', background: 'rgba(255,255,255,.3)', borderRadius: 12 }}>
      <PillTab label="All"      count={24} active />
      <PillTab label="Open"     count={8}  dot dotColor="var(--accent)" />
      <PillTab label="Alert"    count={3}  dot dotColor="var(--warn)" />
      <PillTab label="Locked"   count={7}  />
      <PillTab label="Approved" count={6}  />
    </div>
  ),
}
