import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Email', placeholder: 'you@example.com' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHelperText: Story = { args: { helperText: 'We'll never share your email.' } }
export const WithError: Story = { args: { error: 'Invalid email address.' } }
export const Disabled: Story = { args: { disabled: true, value: 'you@example.com' } }
export const Password: Story = { args: { label: 'Password', type: 'password', placeholder: '••••••••' } }
