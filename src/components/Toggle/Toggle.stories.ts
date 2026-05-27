import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Worktime/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'Opened only' },
}
export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = { args: { defaultChecked: false } }
export const On: Story  = { args: { defaultChecked: true } }
