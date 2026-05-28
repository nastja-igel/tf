import type { Meta, StoryObj } from '@storybook/react'
import { IconBtn } from './IconBtn'

const meta: Meta<typeof IconBtn> = {
  title: 'Actions/IconBtn',
  component: IconBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Bell notification button with an optional numeric badge. Used in the top navigation bar to open a notifications panel.

- \`badge\` counts above 9 display as \`"9+"\` to keep the chip compact.
- The badge value is included in the \`aria-label\` (e.g. \`"Notifications (5)"\`) for screen reader announcements.
- Pass \`onClick\` to open a notifications drawer or dropdown.
      `,
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story    = {}
export const WithBadge: Story  = { args: { badge: 5 } }
