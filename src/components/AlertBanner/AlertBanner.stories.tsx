import type { Meta, StoryObj } from '@storybook/react'
import { AlertBanner } from './AlertBanner'

const meta: Meta<typeof AlertBanner> = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  parameters: {
    backgrounds: { default: 'glass' },
  },
  argTypes: {
    variant: { control: 'radio', options: ['warn', 'info', 'error'] },
  },
}
export default meta

type Story = StoryObj<typeof AlertBanner>

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480 }}>
      <AlertBanner variant="warn"  message="Some hours are missing — please review before approving." onDismiss={() => {}} />
      <AlertBanner variant="info"  message="This period is still open. Hours can be edited until Friday." onDismiss={() => {}} />
      <AlertBanner variant="error" message="Approval failed. Please try again or contact your manager." onDismiss={() => {}} />
    </div>
  ),
}
