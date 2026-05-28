import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MonthPicker } from './MonthPicker'

const meta: Meta<typeof MonthPicker> = {
  title: 'Inputs/MonthPicker',
  component: MonthPicker,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Dropdown month selector with a calendar-icon trigger button. Clicking opens a 12-option month grid; clicking outside closes it.

- \`onMonthChange\` receives the **0-indexed** month number (Jan = 0, Dec = 11).
- \`label\` appears as a soft prefix before the selected month name (default: \`"Period"\`). Pass \`undefined\` to hide it.
- The trigger shows \`aria-haspopup="listbox"\` and \`aria-expanded\` for accessibility.
- Used inside **\`Filters\`** to select the approval period.

### Accessibility
- Trigger has \`aria-haspopup="listbox"\` and \`aria-expanded\` — AT announces that a list will open.
- Dropdown has \`role="listbox"\` with \`aria-label="Select month"\`; each option has \`role="option"\` and \`aria-selected\`.
- **Keyboard navigation inside the dropdown is not yet implemented** — consider adding arrow key support to move between month options.
- Click-outside closes the dropdown via a \`mousedown\` listener — keyboard users should also be able to close it with Escape.
      `,
      },
    },
  },
  argTypes: {
    month: { control: { type: 'number', min: 0, max: 11 } },
    year:  { control: { type: 'number' } },
    label: { control: 'text' },
  },
  args: { month: 4, year: 2026, label: 'Period' },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutLabel: Story = {
  args: { month: 0, year: 2025, label: undefined },
}

export const Controlled: Story = {
  render: () => {
    const [month, setMonth] = useState(4)
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <MonthPicker month={month} year={2026} label="Period" onMonthChange={setMonth} />
        <span style={{ fontSize: 12, color: '#666' }}>selected: {month}</span>
      </div>
    )
  },
}

export const AllMonths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {Array.from({ length: 12 }, (_, i) => (
        <MonthPicker key={i} month={i} year={2026} label="Period" />
      ))}
    </div>
  ),
}
