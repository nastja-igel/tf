import type { Meta, StoryObj } from '@storybook/react'
import { ActionBtn } from './ActionBtn'

const meta: Meta<typeof ActionBtn> = {
  title: 'Actions/ActionBtn',
  component: ActionBtn,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'glass' } },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'primary'] },
  },
}
export default meta
type Story = StoryObj<typeof meta>

// Inline icon helpers
const IcoEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const IcoDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const IcoLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

export const Default: Story = { args: { variant: 'default' } }
export const Primary: Story = { args: { variant: 'primary' } }

export const DefaultWithEye: Story = {
  args: { variant: 'default', 'aria-label': 'View', children: undefined },
  render: (args) => <ActionBtn {...args}><IcoEye /></ActionBtn>,
}

export const DefaultWithDownload: Story = {
  render: (args) => <ActionBtn {...args} aria-label="Download"><IcoDownload /></ActionBtn>,
}

export const DefaultWithLock: Story = {
  render: (args) => <ActionBtn {...args} aria-label="Lock"><IcoLock /></ActionBtn>,
}

export const PrimaryApprove: Story = {
  args: { variant: 'primary' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
}

export const TableRowActions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 6 }}>
      <ActionBtn variant="default" aria-label="View"><IcoEye /></ActionBtn>
      <ActionBtn variant="default" aria-label="Download"><IcoDownload /></ActionBtn>
      <ActionBtn variant="primary" aria-label="Approve" />
    </div>
  ),
}
