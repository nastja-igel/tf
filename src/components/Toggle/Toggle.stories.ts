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

### Accessibility
- The \`<label>\` wraps both the track/thumb and the text — clicking anywhere (label text or track) activates the toggle.
- The underlying input is \`<input type="checkbox">\` hidden visually but present in the DOM and tab order.
- \`label\` is the accessible name for the switch — always required, always visible.
- For stricter ARIA semantics, a \`role="switch"\` with \`aria-checked\` would be more precise than the checkbox pattern. The current checkbox pattern is functionally equivalent and broadly supported.
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
