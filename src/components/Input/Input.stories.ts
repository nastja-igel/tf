import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Foundations/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Text, email, or password field with a label, optional helper text, and error state.

- **Password** type includes a show/hide eye-icon toggle.
- \`error\` takes priority over \`helperText\` — both use \`aria-describedby\` for screen readers.
- \`aria-invalid\` is set automatically when \`error\` is present.
- IDs are auto-generated with \`useId\` when not provided — safe for multiple instances.

### Do / Don't
- ✅ Always provide a \`label\` — placeholder alone is not an accessible substitute.
- ✅ Use \`helperText\` for format hints (e.g. "MM/DD/YYYY"); use \`error\` only after validation fails.
- ❌ Don't show \`error\` before the user has interacted with the field.
      `,
      },
    },
  },
  args: { label: 'Email', placeholder: 'you@example.com' },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHelperText: Story = { args: { helperText: "We'll never share your email." } }
export const WithError: Story = { args: { error: 'Invalid email address.' } }
export const Disabled: Story = { args: { disabled: true, value: 'you@example.com' } }
export const Password: Story = { args: { label: 'Password', type: 'password', placeholder: 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢' } }
