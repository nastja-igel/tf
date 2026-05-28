import type { Meta, StoryObj } from '@storybook/react'
import { TimelineRow } from './TimelineRow'

const meta: Meta<typeof TimelineRow> = {
  title: 'Data Display/TimelineRow',
  component: TimelineRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Single entry in an employee's daily hour log: date number, weekday abbreviation, logged hours, and project name.

Rows are stacked vertically with a subtle dividing line between them.
Used inside the **\`Drawer\`** "Daily Breakdown" section to show a week's worth of time entries.
Long project names truncate with ellipsis — the full name is always available via tooltip or accessible text.
      `,
      },
    },
  },
  decorators: [
    (Story) => {
      const el = document.createElement('div')
      el.style.width = '416px'
      el.style.border = '1px solid rgba(20,40,70,.08)'
      el.style.borderRadius = '8px'
      el.style.overflow = 'hidden'
      return Story()
    },
  ],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { day: 27, dayName: 'Tue', hours: '8.0h', project: 'KLR-204 Worksite A' },
}
export const LongProject: Story = {
  args: { day: 26, dayName: 'Mon', hours: '7.5h', project: 'INT-118 Internal Research & Development' },
}
export const Short: Story = {
  args: { day: 25, dayName: 'Fri', hours: '4.0h', project: 'OPS-007 Maintenance' },
}
