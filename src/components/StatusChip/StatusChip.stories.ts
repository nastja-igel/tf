import type { Meta, StoryObj } from '@storybook/react'
import { StatusChip } from './StatusChip'

const meta: Meta<typeof StatusChip> = {
  title: 'Worktime/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['icon', 'text'] },
    status:  { control: 'radio', options: ['Open', 'Locked', 'Alert', 'Approved'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

// ── Icon variant (32×32) ─────────────────────────────────────────
export const Open: Story     = { args: { status: 'Open',     variant: 'icon' } }
export const Locked: Story   = { args: { status: 'Locked',   variant: 'icon' } }
export const Alert: Story    = { args: { status: 'Alert',    variant: 'icon' } }
export const Approved: Story = { args: { status: 'Approved', variant: 'icon' } }

// ── Text variant (pill) ──────────────────────────────────────────
export const OpenText: Story     = { args: { status: 'Open',     variant: 'text' } }
export const LockedText: Story   = { args: { status: 'Locked',   variant: 'text' } }
export const AlertText: Story    = { args: { status: 'Alert',    variant: 'text' } }
export const ApprovedText: Story = { args: { status: 'Approved', variant: 'text' } }
