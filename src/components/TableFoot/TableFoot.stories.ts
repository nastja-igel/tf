import type { Meta, StoryObj } from '@storybook/react'
import { TableFoot } from './TableFoot'

const meta: Meta<typeof TableFoot> = {
  title: 'Table/TableFoot',
  component: TableFoot,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof meta>

export const First: Story = {
  args: { page: 1, totalPages: 4, totalItems: 24, pageSize: 12 },
}
export const Middle: Story = {
  args: { page: 3, totalPages: 8, totalItems: 96, pageSize: 12 },
}
export const Last: Story = {
  args: { page: 8, totalPages: 8, totalItems: 96, pageSize: 12 },
}
export const SinglePage: Story = {
  args: { page: 1, totalPages: 1, totalItems: 7 },
}
