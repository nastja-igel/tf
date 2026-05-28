import type { Meta, StoryObj } from '@storybook/react'
import { SocialButton } from './SocialButton'
import type { SocialProvider } from './SocialButton'

const meta: Meta<typeof SocialButton> = {
  title: 'Components/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'light' },
    layout: 'centered',
  },
  argTypes: {
    provider: {
      control: 'select',
      options: ['google', 'microsoft', 'github', 'apple', 'twitter', 'facebook', 'linkedin', 'discord'] satisfies SocialProvider[],
      description: 'OAuth provider to display',
    },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/* ── Individual providers ──────────────────────────────────────── */

export const Google: Story    = { args: { provider: 'google' } }
export const Microsoft: Story = { args: { provider: 'microsoft' } }
export const GitHub: Story    = { args: { provider: 'github' } }
export const Apple: Story     = { args: { provider: 'apple' } }
export const Twitter: Story   = { args: { provider: 'twitter' } }
export const Facebook: Story  = { args: { provider: 'facebook' } }
export const LinkedIn: Story  = { args: { provider: 'linkedin' } }
export const Discord: Story   = { args: { provider: 'discord' } }

/* ── States ────────────────────────────────────────────────────── */

export const Disabled: Story  = { args: { provider: 'google', disabled: true } }

/* ── All providers row ─────────────────────────────────────────── */

const ALL_PROVIDERS: SocialProvider[] = [
  'google', 'microsoft', 'github', 'apple', 'twitter', 'facebook', 'linkedin', 'discord',
]

export const AllProviders: Story = {
  name: 'All Providers',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {ALL_PROVIDERS.map(p => (
        <SocialButton key={p} provider={p} />
      ))}
    </div>
  ),
}

export const AllDisabled: Story = {
  name: 'All Providers — Disabled',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {ALL_PROVIDERS.map(p => (
        <SocialButton key={p} provider={p} disabled />
      ))}
    </div>
  ),
}

/* ── Login button row (common pattern) ─────────────────────────── */

export const LoginRow: Story = {
  name: 'Login Row (Google + Microsoft)',
  render: () => (
    <div style={{ display: 'flex', gap: 8, width: 320 }}>
      <SocialButton provider="google" style={{ flex: 1 }} />
      <SocialButton provider="microsoft" style={{ flex: 1 }} />
    </div>
  ),
}
