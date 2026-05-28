import type { Meta, StoryObj } from '@storybook/react'
import { StatusChip } from './StatusChip'

const meta: Meta<typeof StatusChip> = {
  title: 'Feedback/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Compact status badge for worktime approval states.

| Variant | Size | When to use |
|---|---|---|
| **icon** | 32×32 px square | Table rows — compact, icon-only |
| **text** | Pill with icon + label | Drawer headers, detail panels |

| Status | Color | Meaning |
|---|---|---|
| **Open** | Accent (indigo) | Submitted, pending review |
| **Alert** | Amber | Irregular hours, needs attention |
| **Approved** | Green | Manager approved |
| **Locked** | Gray | Period locked, no edits allowed |

### Accessibility
- The wrapper \`<div>\` has \`aria-label="Status: [status]"\` — screen readers announce the full status without relying on color or icon alone.
- Icon SVGs are \`aria-hidden="true"\`.
- Color is **not** the sole indicator — the icon shape (lock, triangle, checkmark) and, in \`text\` variant, the label also convey status.
- No interactive elements — read-only status display.
      `,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['icon', 'text'] },
    status:  { control: 'radio', options: ['Open', 'Locked', 'Alert', 'Approved'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

// â”€â”€ Icon variant (32Ã—32) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const Open: Story     = { args: { status: 'Open',     variant: 'icon' } }
export const Locked: Story   = { args: { status: 'Locked',   variant: 'icon' } }
export const Alert: Story    = { args: { status: 'Alert',    variant: 'icon' } }
export const Approved: Story = { args: { status: 'Approved', variant: 'icon' } }

// â”€â”€ Text variant (pill) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const OpenText: Story     = { args: { status: 'Open',     variant: 'text' } }
export const LockedText: Story   = { args: { status: 'Locked',   variant: 'text' } }
export const AlertText: Story    = { args: { status: 'Alert',    variant: 'text' } }
export const ApprovedText: Story = { args: { status: 'Approved', variant: 'text' } }
