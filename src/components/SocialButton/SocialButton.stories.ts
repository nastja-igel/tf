import type { Meta, StoryObj } from '@storybook/react'
import { SocialButton } from './SocialButton'

const meta = {
  title: 'Components/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'sky' }, },
} satisfies Meta<typeof SocialButton>

export default meta
type Story = StoryObj<typeof meta>

export const Google: Story    = { args: { provider: 'google' } }
export const Microsoft: Story = { args: { provider: 'microsoft' } }
