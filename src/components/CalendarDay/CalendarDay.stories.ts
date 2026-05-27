import type { Meta, StoryObj } from '@storybook/react'
import { CalendarDay } from './CalendarDay'

const meta: Meta<typeof CalendarDay> = {
  title: 'Worktime/CalendarDay',
  component: CalendarDay,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['normal', 'weekend', 'work', 'over', 'absent', 'today'],
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Normal:  Story = { args: { day: null,  state: 'normal'  } }
export const Weekend: Story = { args: { day: 7,    state: 'weekend' } }
export const Work:    Story = { args: { day: 14,   state: 'work'    } }
export const Over:    Story = { args: { day: 21,   state: 'over'    } }
export const Absent:  Story = { args: { day: 12,   state: 'absent'  } }
export const Today:   Story = { args: { day: 27,   state: 'today'   } }
