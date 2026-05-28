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

### Accessibility
- The \`<label>\` wraps both the visual box and the hidden \`<input type="checkbox">\` — clicking the label text activates the checkbox.
- The custom visual box is \`aria-hidden="true"\`; the native input remains in the tab order and carries the checked state.
- IDs are auto-generated via \`useId\` — \`htmlFor\`/\`id\` pairing is always guaranteed even with multiple instances on one page.
- \`disabled\` uses the native HTML attribute — AT announces the field as unavailable.
- Always provide a \`label\` — a checkbox without a visible or programmatic label has no accessible name.
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
