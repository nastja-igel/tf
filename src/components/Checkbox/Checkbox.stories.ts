import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Foundations/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Standard checkbox with an accessible label. Supports both controlled (\`checked\` + \`onChange\`) and uncontrolled (\`defaultChecked\`) usage. IDs are auto-generated with \`useId\` if not provided.

Use in filter panels, bulk-selection lists, settings forms, and any binary opt-in/opt-out choice.
Don't use for binary on/off preferences in compact toolbars — use **\`Toggle\`** instead.
      `,
      },
    },
  },
  args: { label: 'Remember me' },
}

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = { args: { defaultChecked: false } }
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
