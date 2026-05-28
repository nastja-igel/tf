import type { Meta, StoryObj } from '@storybook/react'
import { CalendarGrid } from './CalendarGrid'

const meta: Meta<typeof CalendarGrid> = {
  title: 'Data Display/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    backgrounds: { default: 'glass' },
  },
  argTypes: {
    month: { control: { type: 'number', min: 0, max: 11 } },
    year:  { control: { type: 'number' } },
  },
}
export default meta

type Story = StoryObj<typeof CalendarGrid>

export const May2026: Story = {
  args: {
    month: 4,
    year: 2026,
    todayDate: 27,
    markedDays: [5, 6, 12, 13, 19, 20, 26, 27],
  },
}

export const WithMarkedWeekends: Story = {
  args: {
    month: 4,
    year: 2026,
    markedDays: [2, 3, 9, 10, 16, 17, 23, 24, 30, 31],
  },
}

export const NoHighlights: Story = {
  args: { month: 4, year: 2026 },
}
