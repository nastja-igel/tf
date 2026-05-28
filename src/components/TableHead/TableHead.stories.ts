import type { Meta, StoryObj } from '@storybook/react'
import { TableHead } from './TableHead'

const COLS = [
  { key: 'status',   label: ''         },
  { key: 'user',     label: 'Employee', sortable: true },
  { key: 'period',   label: 'Period'   },
  { key: 'vacations',label: 'Vac',     align: 'right' as const },
  { key: 'holidays', label: 'Hol',     align: 'right' as const },
  { key: 'sick',     label: 'Sick',    align: 'right' as const },
  { key: 'hours',    label: 'Hours',   sortable: true },
  { key: 'actions',  label: ''         },
]

const meta: Meta<typeof TableHead> = {
  title: 'Table/TableHead',
  component: TableHead,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { columns: COLS, sortKey: 'user', sortDir: 'asc' },
}
export const SortDesc: Story = {
  args: { columns: COLS, sortKey: 'hours', sortDir: 'desc' },
}
