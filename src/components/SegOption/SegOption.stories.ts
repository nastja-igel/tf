import type { Meta, StoryObj } from '@storybook/react'
import { SegOption } from './SegOption'

const meta: Meta<typeof SegOption> = {
  title: 'Worktime/SegOption',
  component: SegOption,
  tags: ['autodocs'],
  args: { label: 'List' },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Active: Story  = { args: { active: true } }
