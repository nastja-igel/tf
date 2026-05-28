import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonVariant, ButtonSize } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Foundations/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'] satisfies ButtonVariant[],
      description: 'Visual style of the button',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies ButtonSize[],
      description: 'Height and padding preset',
      table: { defaultValue: { summary: 'md' } },
    },
    fullWidth:  { control: 'boolean' },
    loading:    { control: 'boolean' },
    disabled:   { control: 'boolean' },
    children:   { control: 'text', description: 'Button label' },
  },
  args: { children: 'Button', variant: 'primary', size: 'md' },
}

export default meta
type Story = StoryObj<typeof meta>

/* ── Playground ──────────────────────────────────────────────── */

export const Playground: Story = {}

/* ── Variants ────────────────────────────────────────────────── */

export const Primary: Story   = { args: { variant: 'primary'   } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story     = { args: { variant: 'ghost'     } }

/* ── Sizes ───────────────────────────────────────────────────── */

export const Small:  Story = { args: { size: 'sm' } }
export const Medium: Story = { args: { size: 'md' } }
export const Large:  Story = { args: { size: 'lg' } }

/* ── States ──────────────────────────────────────────────────── */

export const Loading:   Story = { args: { loading: true } }
export const Disabled:  Story = { args: { disabled: true } }
export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
}

/* ── All variants row ────────────────────────────────────────── */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
