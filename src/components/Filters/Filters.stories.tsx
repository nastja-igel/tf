import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Filters } from './Filters'
import type { FiltersView } from './Filters'

const meta: Meta<typeof Filters> = {
  title: 'Patterns/Filters',
  component: Filters,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Full filter and action bar for the worktime approvals table. Composes five sub-components into one horizontal toolbar:

| Slot | Component | Purpose |
|---|---|---|
| Left | Toggle | "Opened only" quick filter |
| Left | MonthPicker | Period selector |
| Left | Segmented control | View mode: List / Calendar / Chart |
| Center | SearchInput | Employee / ID search |
| Right | Btn ghost | Export |
| Right | Btn primary | Approve All (disabled when 0 pending) |

Wire all \`on*\` callbacks to your data layer. The \`Default\` story uses local \`useState\` to demonstrate fully interactive behaviour.

### Accessibility
- The segmented view control has \`role="group"\` and \`aria-label="View mode"\`; each button uses \`aria-pressed\`.
- SearchInput uses its \`placeholder\` as \`aria-label\` — keep the placeholder text descriptive.
- "Approve All" is \`disabled\` via the HTML attribute (not just visually dimmed) when \`pendingCount\` is 0 — AT announces it as unavailable.
- Toggle, MonthPicker, and SearchInput each carry their own ARIA semantics — see their individual docs.
      `,
      },
    },
  },
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
