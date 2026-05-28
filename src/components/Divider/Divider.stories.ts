import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Foundations/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Horizontal rule with a centered text label. Default label is \`"OR"\` — the most common use case is separating form-based login from social login in auth screens.

Pass a custom \`label\` for other divider contexts (e.g. \`"or continue with"\`, \`"advanced options"\`).
Renders with \`role="separator"\` and the label as \`aria-label\` for screen readers.
      `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Custom: Story = { args: { label: 'or continue with' } }
