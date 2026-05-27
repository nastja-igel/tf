import type { Meta, StoryObj } from '@storybook/react'
import { WorktimeApprovals } from './WorktimeApprovals'

const meta: Meta<typeof WorktimeApprovals> = {
  title: 'Pages/WorktimeApprovals',
  component: WorktimeApprovals,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
