import type { Meta, StoryObj } from '@storybook/react'
import { CalendarGrid } from './CalendarGrid'

const meta: Meta<typeof CalendarGrid> = {
  title: 'Data Display/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Full monthly calendar grid with Mon–Sun column headers and CalendarDay cells.

- \`markedDays\` — array of day numbers (1-based) to mark as worked (\`work\` state).
- \`todayDate\` — day number to highlight as today.
- Weekends are automatically styled as \`weekend\` state; all other days default to \`normal\`.
- Empty leading cells are padded automatically based on the first weekday of the month.

Used inside the **\`Drawer\`** calendar section to show a month overview of attendance.
      `,
      },
    },
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
