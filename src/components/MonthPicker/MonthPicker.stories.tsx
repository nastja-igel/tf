import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MonthPicker } from './MonthPicker'

const meta: Meta<typeof MonthPicker> = {
  title: 'Components/MonthPicker',
  component: MonthPicker,
  parameters: {
    backgrounds: { default: 'glass' },
  },
  argTypes: {
    month: { control: { type: 'number', min: 0, max: 11 } },
    year:  { control: { type: 'number' } },
  },
}
export default meta

type Story = StoryObj<typeof MonthPicker>

export const Default: Story = {
  args: { month: 4, year: 2026, label: 'Period' },
}

export const WithoutLabel: Story = {
  args: { month: 0, year: 2025 },
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
