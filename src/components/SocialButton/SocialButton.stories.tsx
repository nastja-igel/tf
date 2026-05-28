import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from 'storybook/test'
import { SocialButton } from './SocialButton'

const meta: Meta<typeof SocialButton> = {
  title: 'Foundations/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'light' },
    layout: 'centered',
  },
  argTypes: {
    provider: {
      control: 'radio',
      options: ['google', 'microsoft'],
    },
    disabled: { control: 'boolean' },
  },
  args: { provider: 'google' },
}

export default meta
type Story = StoryObj<typeof meta>

/* â”€â”€ Base variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const Default: Story = {}

export const Microsoft: Story = {
  args: { provider: 'microsoft' },
}

/* â”€â”€ Interaction states â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const Hover: Story = {
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button')
    await userEvent.hover(btn)
  },
}

export const Focused: Story = {
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button')
    btn.focus()
    await expect(btn).toHaveFocus()
  },
}

export const Active: Story = {
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button')
    await userEvent.pointer({ target: btn, keys: '[MouseLeft>]' })
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

/* â”€â”€ Both providers side by side â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export const BothProviders: Story = {
  name: 'Both Providers',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <SocialButton provider="google" />
      <SocialButton provider="microsoft" />
    </div>
  ),
}

export const BothDisabled: Story = {
  name: 'Both Providers â€” Disabled',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <SocialButton provider="google" disabled />
      <SocialButton provider="microsoft" disabled />
    </div>
  ),
}
