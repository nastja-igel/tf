import type { Meta, StoryObj } from '@storybook/react'
import { PillTab } from './PillTab'

const meta: Meta<typeof PillTab> = {
  title: 'Worktime/PillTab',
  component: PillTab,
  tags: ['autodocs'],
  args: { label: 'All', count: 24 },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story     = {}
export const Active: Story      = { args: { active: true } }
export const WithDot: Story     = { args: { dot: true } }
export const ActiveDot: Story   = { args: { active: true, dot: true } }
