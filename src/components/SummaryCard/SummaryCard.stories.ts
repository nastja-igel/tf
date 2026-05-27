import type { Meta, StoryObj } from '@storybook/react'
import { SummaryCard } from './SummaryCard'

const meta: Meta<typeof SummaryCard> = {
  title: 'Worktime/SummaryCard',
  component: SummaryCard,
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: 'select',
      options: ['pending', 'approved', 'locked', 'alerts', 'generic'],
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story  = { args: { label: 'WORKED',   value: '148h', kind: 'pending'  } }
export const Approved: Story = { args: { label: 'TARGET',   value: '168h', kind: 'approved' } }
export const Locked: Story   = { args: { label: 'VACATION', value: '3d',   kind: 'locked'   } }
export const Alerts: Story   = { args: { label: 'SICK',     value: '0d',   kind: 'alerts'   } }
export const Generic: Story  = { args: { label: 'OVERTIME', value: '+4h',  kind: 'generic'  } }
