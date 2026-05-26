import type { Meta, StoryObj } from '@storybook/react'
import { SocialButton } from './SocialButton'

const meta: Meta<typeof SocialButton> = {
  title: 'Components/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Google: Story = { args: { provider: 'google' } }
export const Microsoft: Story = { args: { provider: 'microsoft' } }
