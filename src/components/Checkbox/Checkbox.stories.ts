import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Foundations/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Remember me' },
}

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = { args: { defaultChecked: false } }
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
