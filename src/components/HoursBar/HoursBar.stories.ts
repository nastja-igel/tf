import type { Meta, StoryObj } from '@storybook/react'
import { HoursBar } from './HoursBar'

const meta: Meta<typeof HoursBar> = {
  title: 'Worktime/HoursBar',
  component: HoursBar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = { args: { state: 'normal', hours: '140:00' } }
export const Warn: Story   = { args: { state: 'warn',   hours: '103:00' } }
export const Good: Story   = { args: { state: 'good',   hours: '183:00' } }
export const Empty: Story  = { args: { state: 'empty',  hours: '00:00'  } }
