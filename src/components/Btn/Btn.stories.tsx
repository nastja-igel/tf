import type { Meta, StoryObj } from '@storybook/react'
import { Btn } from './Btn'

const meta: Meta<typeof Btn> = {
  title: 'Foundations/Buttons/Btn',
  component: Btn,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    docs: {
      description: {
        component:
          'Lightweight glass/ink button used **internally** by `Drawer` and `Filters`. ' +
          'It intentionally has a smaller API than `Button` (no `loading`, no `fullWidth`). ' +
          'For standalone use outside those two components, prefer `Button`.',
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['ghost', 'primary'] },
    size:    { control: 'radio', options: ['sm', 'md'] },
  },
}
export default meta

type Story = StoryObj<typeof Btn>

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel' },
}

export const Primary: Story = {
  args: { variant: 'primary', children: 'Save changes' },
}

export const Small: Story = {
  args: { variant: 'ghost', size: 'sm', children: 'Filter' },
}

export const PrimarySmall: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Apply' },
}

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Submit', disabled: true },
}

export const Pair: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Btn variant="ghost">Cancel</Btn>
      <Btn variant="primary">Save changes</Btn>
    </div>
  ),
}

export const DrawerFooter: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Btn variant="ghost">Reopen</Btn>
      <Btn variant="primary">Export Payroll</Btn>
    </div>
  ),
}
