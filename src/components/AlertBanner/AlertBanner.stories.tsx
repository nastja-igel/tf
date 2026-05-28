import type { Meta, StoryObj } from '@storybook/react'
import { AlertBanner } from './AlertBanner'

const meta: Meta<typeof AlertBanner> = {
  title: 'Feedback/AlertBanner',
  component: AlertBanner,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Inline contextual feedback strip. Renders with \`role="alert"\` so it is announced immediately to screen readers.

| Variant | Color | When to use |
|---|---|---|
| **warn** | Amber | Missing data, overtime, needs review |
| **info** | Blue | Informational — period still open, deadlines |
| **error** | Red | Action failure, validation blocked |

Pass \`onDismiss\` to show a × button. Use above forms, inside drawer bodies, or at the top of data views.
Do **not** use for toast notifications — those are transient; use a \`Toast\` component instead.
        `,
      },
    },
  },
  argTypes: {
    variant:   { control: 'radio', options: ['warn', 'info', 'error'] },
    message:   { control: 'text' },
    onDismiss: { control: false },
  },
  args: {
    message: 'Some hours are missing — please review before approving.',
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Warn: Story = {
  args: {
    variant: 'warn',
    message: 'Some hours are missing — please review before approving.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    message: 'This period is still open. Hours can be edited until Friday.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'Approval failed. Please try again or contact your manager.',
  },
}

export const Dismissible: Story = {
  args: {
    variant: 'warn',
    message: 'Overtime detected — 12 h over the monthly limit.',
    onDismiss: () => {},
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 480 }}>
      <AlertBanner variant="warn"  message="Some hours are missing — please review before approving." onDismiss={() => {}} />
      <AlertBanner variant="info"  message="This period is still open. Hours can be edited until Friday." onDismiss={() => {}} />
      <AlertBanner variant="error" message="Approval failed. Please try again or contact your manager." onDismiss={() => {}} />
    </div>
  ),
}
