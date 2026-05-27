import type { Meta, StoryObj } from '@storybook/react'
import { PagerBtn } from './PagerBtn'

const meta: Meta<typeof PagerBtn> = {
  title: 'Worktime/PagerBtn',
  component: PagerBtn,
  tags: ['autodocs'],
  args: { page: 1 },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { active: false } }
export const Active: Story  = { args: { active: true } }
