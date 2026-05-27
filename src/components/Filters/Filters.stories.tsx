import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Filters } from './Filters'
import type { FiltersView } from './Filters'

const meta: Meta<typeof Filters> = {
  title: 'Worktime/Filters',
  component: Filters,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ padding: '16px 24px', background: 'var(--color-bg-default,#e8f0f7)' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { month: 4, pendingCount: 6, view: 'list' },
  render: (args) => {
    const [openedOnly, setOpenedOnly] = useState(false)
    const [month, setMonth] = useState(args.month ?? 4)
    const [view, setView] = useState<FiltersView>(args.view ?? 'list')
    const [query, setQuery] = useState('')
    return (
      <Filters
        {...args}
        openedOnly={openedOnly}
        onOpenedOnlyChange={setOpenedOnly}
        month={month}
        onMonthChange={setMonth}
        view={view}
        onViewChange={setView}
        query={query}
        onQueryChange={setQuery}
      />
    )
  },
}

export const CalendarView: Story = {
  args: { month: 4, pendingCount: 3, view: 'calendar' },
}

export const NoPending: Story = {
  args: { month: 3, pendingCount: 0, view: 'list' },
}
