import type { Meta, StoryObj } from '@storybook/react'
import { CalendarDay } from './CalendarDay'

const meta: Meta<typeof CalendarDay> = {
  title: 'Data Display/CalendarDay',
  component: CalendarDay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Single day cell for a monthly calendar grid. Null or 0 \`day\` renders as an empty spacer (used to pad the first week offset).

| State | Meaning |
|---|---|
| **normal** | Regular working day |
| **weekend** | Saturday / Sunday — muted style |
| **work** | Day has logged hours — accent dot |
| **over** | Overtime logged — warning style |
| **absent** | Absence recorded |
| **today** | Current calendar date — highlighted ring |

Used as a building block inside **\`CalendarGrid\`** and the **\`Drawer\`** weekly calendar section.

### Accessibility
- Non-empty cells have \`aria-label\` set to the day number — screen readers announce the date.
- Null / 0 cells render as empty spacers with no ARIA attributes — they are invisible to AT.
- State (work, absent, over…) is communicated by color and visual styling only. For full AT support, add a descriptive \`aria-label\` at the consuming component level (e.g. \`"14 — absent"\`).
- The cell is a \`<div>\`, not a button — it is not interactive by itself. Interactivity should be added at the CalendarGrid or Drawer level.
      `,
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['normal', 'weekend', 'work', 'over', 'absent', 'today'],
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

export const Normal:  Story = { args: { day: null,  state: 'normal'  } }
export const Weekend: Story = { args: { day: 7,    state: 'weekend' } }
export const Work:    Story = { args: { day: 14,   state: 'work'    } }
export const Over:    Story = { args: { day: 21,   state: 'over'    } }
export const Absent:  Story = { args: { day: 12,   state: 'absent'  } }
export const Today:   Story = { args: { day: 27,   state: 'today'   } }
