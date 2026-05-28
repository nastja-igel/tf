import type { Meta, StoryObj } from '@storybook/react'
import { SummaryCard } from './SummaryCard'

const meta: Meta<typeof SummaryCard> = {
  title: 'Data Display/SummaryCard',
  component: SummaryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Minimal label + value tile used in the **\`Drawer\`** summary grid (worked hours, target, vacation days, sick days, overtime).

\`kind\` controls the accent color strip on the left edge, matching the employee's approval status color scheme.
Tiles are laid out in a 2-column grid inside the drawer body — do not use as standalone KPI cards; use **\`StatCard\`** for dashboard-level metrics instead.

### Accessibility
- Label and value are plain text — fully accessible by default.
- No interactive elements — purely presentational.
- The left-edge accent color strip is decorative (\`aria-hidden\` is implicit for CSS-only elements). Status meaning is also communicated by the visible label text.
      `,
      },
    },
  },
  argTypes: {
    kind: {
      control: 'select',
      options: ['pending', 'approved', 'locked', 'alerts', 'generic'],
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story  = { args: { label: 'WORKED',   value: '148h', kind: 'pending'  } }
export const Approved: Story = { args: { label: 'TARGET',   value: '168h', kind: 'approved' } }
export const Locked: Story   = { args: { label: 'VACATION', value: '3d',   kind: 'locked'   } }
export const Alerts: Story   = { args: { label: 'SICK',     value: '0d',   kind: 'alerts'   } }
export const Generic: Story  = { args: { label: 'OVERTIME', value: '+4h',  kind: 'generic'  } }
