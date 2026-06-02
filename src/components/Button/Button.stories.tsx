import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button'
import { Icon, ALL_ICON_NAMES } from '../Icon/Icon'
import type { IconName } from '../Icon/Icon'

// ── Story arg type ─────────────────────────────────────────────────────────
// Extends ButtonProps with two story-level fields that drive icon rendering.
// These are NOT Button component props — the render function consumes them.

type StoryArgs = ButtonProps & {
  icon: IconName | 'none'
  iconPosition: 'left' | 'right'
}

// ── Meta ───────────────────────────────────────────────────────────────────

const meta: Meta<StoryArgs> = {
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

    // ── Icon story controls ──────────────────────────────────────────────
    icon: {
      control: 'select',
      options: ['none', ...ALL_ICON_NAMES.filter(n => n !== 'Google' && n !== 'Microsoft')],
      description: 'Icon shown alongside the label. **Story control only** — pass an `<Icon>` as part of `children` in production.',
      table: {
        defaultValue: { summary: 'none' },
        category: 'Icon',
      },
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Side of the label where the icon appears.',
      // only show this control when an icon is actually selected
      if: { arg: 'icon', neq: 'none' },
      table: {
        defaultValue: { summary: 'left' },
        category: 'Icon',
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    icon: 'none',
    iconPosition: 'left',
  },

  // Meta-level render: all stories that use args get the icon injection automatically.
  render: ({ icon, iconPosition, children, ...buttonProps }) => {
    const ico = icon !== 'none'
      ? <Icon name={icon} size="sm" />
      : null

    return (
      <Button {...buttonProps}>
        {iconPosition === 'left'  && ico}
        {children}
        {iconPosition === 'right' && ico}
      </Button>
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ─────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ── Variants ───────────────────────────────────────────────────────────────

export const Primary:   Story = { args: { variant: 'primary'   } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost:     Story = { args: { variant: 'ghost'     } }

// ── Sizes ──────────────────────────────────────────────────────────────────

export const Small:  Story = { args: { size: 'sm' } }
export const Medium: Story = { args: { size: 'md' } }
export const Large:  Story = { args: { size: 'lg' } }

// ── States ─────────────────────────────────────────────────────────────────

export const Loading:  Story = { args: { loading: true } }
export const Disabled: Story = { args: { disabled: true } }
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

// ── All variants row ────────────────────────────────────────────────────────

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

// ── Icon placement ──────────────────────────────────────────────────────────

export const IconLeft: Story = {
  name: 'Icon — Left',
  args: { icon: 'Plus', iconPosition: 'left', children: 'New entry' },
}

export const IconRight: Story = {
  name: 'Icon — Right',
  args: { icon: 'Check', iconPosition: 'right', children: 'Continue' },
}

export const AllVariantsWithIcon: Story = {
  name: 'Icon — All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary">
        <Icon name="Plus" size="sm" /> New entry
      </Button>
      <Button variant="secondary">
        <Icon name="Plus" size="sm" /> New entry
      </Button>
      <Button variant="ghost">
        <Icon name="Plus" size="sm" /> New entry
      </Button>
    </div>
  ),
}

// ── Compact sm ─────────────────────────────────────────────────────────────

export const CompactActions: Story = {
  name: 'Compact (sm) — Drawer / Toolbar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="ghost" size="sm">Send Back</Button>
        <Button variant="ghost" size="sm">
          <Icon name="Lock" size="sm" /> Lock
        </Button>
        <Button variant="primary" size="sm">
          <Icon name="Check" size="sm" /> Approve &amp; Lock
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="ghost" size="sm">
          <Icon name="Download" size="sm" /> Export
        </Button>
        <Button variant="primary" size="sm">Approve All (5)</Button>
      </div>
    </div>
  ),
}
