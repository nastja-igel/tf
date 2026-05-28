import type { Meta, StoryObj } from '@storybook/react'
import { CalendarDay } from './CalendarDay'

const meta: Meta<typeof CalendarDay> = {
  title: 'Data Display/CalendarDay',
  component: CalendarDay,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 44px)', gap: 4 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'glass' },
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

export const Normal:  Story = { args: { day: 5,    state: 'normal'  } }
export const Weekend: Story = { args: { day: 7,    state: 'weekend' } }
export const Work:    Story = { args: { day: 14,   state: 'work'    } }
export const Over:    Story = { args: { day: 21,   state: 'over'    } }
export const Absent:  Story = { args: { day: 12,   state: 'absent'  } }
export const Today:   Story = { args: { day: 27,   state: 'today'   } }
