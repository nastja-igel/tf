import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'Data Display/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
KPI summary card with a colored dot, large numeric value, delta vs last month, and a 7-bar sparkline.

| Kind | Dot / bar color | Delta color |
|---|---|---|
| **Pending** | Accent (indigo) | Neutral |
| **Approved** | Green | Green |
| **Locked** | Gray | Neutral |
| **Alerts** | Amber | Red |

Pass \`deltaPositive\` to override the delta color signal (e.g. +3 Alerts is \`deltaPositive: false\`).
Used in dashboard header rows above the worktime approvals table.
      `,
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story  = { args: { kind: 'Pending',  value: 28, delta: '+3',  deltaPositive: true } }
export const Approved: Story = { args: { kind: 'Approved', value: 64, delta: '+12', deltaPositive: true } }
export const Locked: Story   = { args: { kind: 'Locked',   value: 12, delta: '+1',  deltaPositive: true } }
export const Alerts: Story   = { args: { kind: 'Alerts',   value: 5,  delta: '-1',  deltaPositive: false } }
