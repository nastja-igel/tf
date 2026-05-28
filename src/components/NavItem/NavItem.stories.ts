import type { Meta, StoryObj } from '@storybook/react'
import { NavItem } from './NavItem'

const meta: Meta<typeof NavItem> = {
  title: 'Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Sidebar navigation item with an icon, text label, and an optional count badge.

- \`active\` sets \`aria-current="page"\` — required for screen reader navigation landmarks.
- The default icon is a clock (Worktime section). Pass a custom \`icon\` ReactNode for other sections.
- \`count\` shows a numeric badge — use for pending-approval counts or unread notifications.
- Only one NavItem should be \`active\` at a time in a sidebar.
      `,
      },
    },
  },
  args: { label: 'Worktime' },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story      = {}
export const Active: Story       = { args: { active: true } }
export const WithCount: Story    = { args: { count: 12 } }
export const ActiveCount: Story  = { args: { active: true, count: 12 } }
