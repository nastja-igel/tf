import type { Meta, StoryObj } from '@storybook/react'
import { CloseBtn } from './CloseBtn'

const meta: Meta<typeof CloseBtn> = {
  title: 'Components/CloseBtn',
  component: CloseBtn,
  parameters: {
    backgrounds: { default: 'glass' },
  },
}
export default meta

type Story = StoryObj<typeof CloseBtn>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}
