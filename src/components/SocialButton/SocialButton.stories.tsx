import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from 'storybook/test'
import { SocialButton } from './SocialButton'
import type { SocialButtonProps } from './SocialButton'

type StateKey = 'default' | 'hover' | 'focused' | 'active' | 'disabled'
type StoryArgs = SocialButtonProps & { state: StateKey }

const meta: Meta<StoryArgs> = {
  title: 'Foundations/Buttons/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Icon-only OAuth provider button for Google and Microsoft sign-in. No visible text label — the provider name lives in \`aria-label\` and \`title\` for accessibility and tooltip.

Place below the primary auth form, separated by a **\`Divider\`** (\`"OR"\`). Both providers sit side by side in a \`gap: 8px\` flex row.

The **state** control drives interaction states via Storybook \`play()\` functions — hover, focus, active, disabled — without needing real CSS pseudo-class overrides.

### Do / Don't
- ✅ Always show both providers together — don't show Google without Microsoft (or vice versa) unless intentionally limited.
- ❌ Don't add a text label alongside the icon — it's not part of the design spec and breaks the compact layout.
      `,
      },
    },
  },
  argTypes: {
    provider: {
      control: 'radio',
      options: ['google', 'microsoft'],
      description: 'OAuth provider',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focused', 'active', 'disabled'] satisfies StateKey[],
      description: 'Interaction state',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: { table: { disable: true } }, // driven by state
  },
  args: { provider: 'google', state: 'default' },
  render: ({ state, ...args }) => (
    <SocialButton {...args} disabled={state === 'disabled'} />
  ),
  play: async ({ canvasElement, args }) => {
    const state = (args as StoryArgs).state
    if (!state || state === 'default' || state === 'disabled') return
    const btn = within(canvasElement).getByRole('button')
    if (state === 'hover')   await userEvent.hover(btn)
    if (state === 'focused') { btn.focus(); await expect(btn).toHaveFocus() }
    if (state === 'active')  await userEvent.pointer({ target: btn, keys: '[MouseLeft>]' })
  },
}

export default meta
type Story = StoryObj<typeof meta>

/* ── Base variants ─────────────────────────────────────────────── */

export const Default: Story = {}

export const Microsoft: Story = {
  args: { provider: 'microsoft' },
}

/* ── Interaction states ─────────────────────────────────────────── */

export const Hover: Story = {
  args: { state: 'hover' },
}

export const Focused: Story = {
  args: { state: 'focused' },
}

export const Active: Story = {
  args: { state: 'active' },
}

export const Disabled: Story = {
  args: { state: 'disabled' },
}

/* ── Both providers side by side ────────────────────────────────── */

export const BothProviders: Story = {
  name: 'Both Providers',
  play: undefined,
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <SocialButton provider="google" />
      <SocialButton provider="microsoft" />
    </div>
  ),
}

export const BothDisabled: Story = {
  name: 'Both Providers — Disabled',
  play: undefined,
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <SocialButton provider="google" disabled />
      <SocialButton provider="microsoft" disabled />
    </div>
  ),
}
