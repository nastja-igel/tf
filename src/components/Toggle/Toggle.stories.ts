import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Foundations/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Slide-switch for binary on/off preferences. Supports controlled (\`checked\` + \`onChange\`) and uncontrolled (\`defaultChecked\`) usage.

Always provide a \`label\` — it is the accessible name for the switch and is always visible next to it.
Use **\`Checkbox\`** instead when the choice is part of a multi-select list or form submission.
Used in **\`Filters\`** for the "Opened only" quick filter.
      `,
      },
    },
  },
  args: { label: 'Opened only' },
}
export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = { args: { defaultChecked: false } }
export const On: Story  = { args: { defaultChecked: true } }
