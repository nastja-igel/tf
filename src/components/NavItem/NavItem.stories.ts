import type { Meta, StoryObj } from '@storybook/react'
import { NavItem } from './NavItem'

const meta: Meta<typeof NavItem> = {
  title: 'Worktime/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  args: { label: 'Worktime' },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story      = {}
export const Active: Story       = { args: { active: true } }
export const WithCount: Story    = { args: { count: 12 } }
export const ActiveCount: Story  = { args: { active: true, count: 12 } }
