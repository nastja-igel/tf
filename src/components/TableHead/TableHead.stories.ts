import type { Meta, StoryObj } from '@storybook/react'
import { TableHead } from './TableHead'

const COLS = [
  { key: 'status',   label: '',  srLabel: 'Status'  },
  { key: 'user',     label: 'Employee', sortable: true },
  { key: 'period',   label: 'Period'   },
  { key: 'vacations',label: 'Vac',     align: 'right' as const },
  { key: 'holidays', label: 'Hol',     align: 'right' as const },
  { key: 'sick',     label: 'Sick',    align: 'right' as const },
  { key: 'hours',    label: 'Hours',   sortable: true },
  { key: 'actions',  label: '',  srLabel: 'Actions' },
]

const meta: Meta<typeof TableHead> = {
  title: 'Table/TableHead',
  component: TableHead,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Column header row for the worktime data table. Renders column labels with optional sort indicators.

- Pass \`sortable: true\` on a column definition to enable click-to-sort.
- \`onSort(key)\` fires when a sortable header is clicked — toggle \`sortDir\` in your state.
- Active sort column shows a filled triangle; inactive sortable columns show a dimmed triangle.
- Use together with **\`TableRow\`** (body) and **\`TableFoot\`** (pagination) to build the full table.
      `,
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { columns: COLS, sortKey: 'user', sortDir: 'asc' },
}
export const SortDesc: Story = {
  args: { columns: COLS, sortKey: 'hours', sortDir: 'desc' },
}
