import type { Meta, StoryObj } from '@storybook/react'
import { IconBtn } from './IconBtn'

const meta: Meta<typeof IconBtn> = {
  title: 'Worktime/IconBtn',
  component: IconBtn,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story    = {}
export const WithBadge: Story  = { args: { badge: 5 } }
