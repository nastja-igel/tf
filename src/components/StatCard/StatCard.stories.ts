import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'Data Display/StatCard',
  component: StatCard,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story  = { args: { kind: 'Pending',  value: 28, delta: '+3',  deltaPositive: true } }
export const Approved: Story = { args: { kind: 'Approved', value: 64, delta: '+12', deltaPositive: true } }
export const Locked: Story   = { args: { kind: 'Locked',   value: 12, delta: '+1',  deltaPositive: true } }
export const Alerts: Story   = { args: { kind: 'Alerts',   value: 5,  delta: '-1',  deltaPositive: false } }
