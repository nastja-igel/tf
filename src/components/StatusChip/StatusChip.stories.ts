import type { Meta, StoryObj } from '@storybook/react'
import { StatusChip } from './StatusChip'

const meta: Meta<typeof StatusChip> = {
  title: 'Worktime/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Open: Story     = { args: { status: 'Open' } }
export const Locked: Story   = { args: { status: 'Locked' } }
export const Alert: Story    = { args: { status: 'Alert' } }
export const Approved: Story = { args: { status: 'Approved' } }
