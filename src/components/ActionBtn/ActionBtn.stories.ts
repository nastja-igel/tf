import type { Meta, StoryObj } from '@storybook/react'
import { ActionBtn } from './ActionBtn'

const meta: Meta<typeof ActionBtn> = {
  title: 'Worktime/ActionBtn',
  component: ActionBtn,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { variant: 'default' } }
export const Primary: Story = { args: { variant: 'primary' } }
