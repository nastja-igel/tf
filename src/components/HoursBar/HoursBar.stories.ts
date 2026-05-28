import type { Meta, StoryObj } from '@storybook/react'
import { HoursBar } from './HoursBar'

const meta: Meta<typeof HoursBar> = {
  title: 'Table/HoursBar',
  component: HoursBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Horizontal filled progress bar showing worked hours vs monthly target, with a numeric label.

| State | Color | Meaning |
|---|---|---|
| **normal** | Neutral | Standard progress — hours logged but below target |
| **warn** | Amber | Below target (< 85%) — needs attention |
| **good** | Green | At or near target (97–112%) |
| **empty** | Gray track only | No hours logged yet |

Pass a custom \`fill\` (0–1) to override the preset widths. Used inside **\`TableRow\`** and **\`Drawer\`** summary sections.
      `,
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = { args: { state: 'normal', hours: '140:00' } }
export const Warn: Story   = { args: { state: 'warn',   hours: '103:00' } }
export const Good: Story   = { args: { state: 'good',   hours: '183:00' } }
export const Empty: Story  = { args: { state: 'empty',  hours: '00:00'  } }
