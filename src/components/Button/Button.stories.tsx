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
    docs: {
      description: {
        component: `
The primary interactive element for triggering actions. Use \`Button\` for any user-initiated operation — submitting forms, confirming dialogs, navigating to the next step.

### Variants

| Variant | When to use |
|---|---|
| **primary** | The single most important action on a screen — "Save", "Submit", "Continue". Use once per view. |
| **secondary** | Supporting actions that sit alongside a primary — "Cancel", "Back", "Export". Glassmorphic surface, lower visual weight. |
| **ghost** | Tertiary or inline actions where a full button would feel heavy — "Edit", "View details", links inside cards. Transparent background. |

### Sizes

| Size | Height | Use case |
|---|---|---|
| \`sm\` | 36 px | Compact toolbars, table rows, dense UIs |
| \`md\` | 46 px | Standard forms and dialogs *(default)* |
| \`lg\` | 54 px | Hero CTAs, onboarding flows, prominent single-action screens |

### States
- **loading** — disables interaction and shows a spinner; keep the label visible to preserve button width.
- **disabled** — 40 % opacity; use only when the reason is visible on screen (e.g. a required field is empty).
- **fullWidth** — stretches to fill its container; useful for mobile layouts or full-width form footers.

### Do / Don't
- ✅ One **primary** button per surface — it signals the recommended next action.
- ✅ Pair **primary + secondary** (e.g. "Save" + "Cancel") for confirmation flows.
- ❌ Don't use **primary** for destructive actions — pair a **ghost** "Delete" with a separate confirmation.
- ❌ Don't disable a button without explaining why nearby.
        `,
      },
    },
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
  decorators: [
    (Story) => (
      <div style={{ width: '100%', padding: '0 24px' }}>
        <Story />
      </div>
    ),
  ],
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

/* ── Icon usage ──────────────────────────────────────────────── */

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

export const WithIconLeft: Story = {
  name: 'Icon — Left',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary"><PlusIcon /> New entry</Button>
      <Button variant="secondary"><PlusIcon /> New entry</Button>
      <Button variant="ghost"><PlusIcon /> New entry</Button>
    </div>
  ),
}

export const WithIconRight: Story = {
  name: 'Icon — Right',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary">Continue <CheckIcon /></Button>
      <Button variant="secondary">Continue <CheckIcon /></Button>
      <Button variant="ghost">Continue <CheckIcon /></Button>
    </div>
  ),
}

/* ── Compact sm — replaces old Btn component ─────────────────── */

export const CompactActions: Story = {
  name: 'Compact (sm) — Drawer / Toolbar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="ghost" size="sm">Send Back</Button>
        <Button variant="ghost" size="sm">Lock</Button>
        <Button variant="primary" size="sm">Approve &amp; Lock</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="ghost" size="sm">Export</Button>
        <Button variant="primary" size="sm">Approve All (5)</Button>
      </div>
    </div>
  ),
}
